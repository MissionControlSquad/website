import { verifyJWT } from "../../lib/jwt";

interface Env {
  SYSTEM_SECRET: string;
  INFRA_API_URL: string;
  INFRA_API_KEY: string;
}

interface TokenPayload {
  userId?: string;
  workspaceId?: string | null;
  userRole?: string;
  email?: string;
}

interface InfraLookupResult {
  found: boolean;
  slug?: string;
  url?: string;
  name?: string;
  type?: string;
  status?: string | null;
  provisioningStatus?: "provisioning" | "active" | "failed";
  provisioningAttempts?: number;
  createdAt?: string;
}

interface InfraClient {
  slug: string;
  url: string;
  status: string | null;
  name: string;
  createdAt: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { SYSTEM_SECRET, INFRA_API_URL, INFRA_API_KEY } = context.env;

  const authHeader = context.request.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return Response.json({ ready: false, error: "Unauthorized" }, { status: 401 });
  }

  const secret = SYSTEM_SECRET || "dev-secret-change-in-production";
  const payload = (await verifyJWT(token, secret)) as TokenPayload | null;
  if (!payload) {
    return Response.json({ ready: false, error: "Invalid token" }, { status: 401 });
  }

  const { email, workspaceId } = payload;
  const infraBase = (INFRA_API_URL || "").replace(/\/$/, "");
  const headers: Record<string, string> = {
    "X-API-Key": INFRA_API_KEY || "",
    "Content-Type": "application/json",
  };

  // ── 1. Email-based lookup (fast path) ──────────────────────────────────────
  if (email) {
    try {
      const lookupRes = await fetch(
        `${infraBase}/api/clients/lookup?email=${encodeURIComponent(email)}`,
        { headers }
      );
      if (lookupRes.ok) {
        const data = (await lookupRes.json()) as InfraLookupResult;
        if (data.found && data.url) {
          // Self-hosted clients manage their own uptime — always active.
          // Hosted clients with no provisioningStatus field are legacy entries that
          // predate tracking and should be treated as active.
          // New entries use provisioningStatus explicitly set by the creation flow.
          const isActive =
            data.type === "self-hosted" ||
            data.provisioningStatus === "active" ||
            data.provisioningStatus === undefined;

          if (isActive) {
            return Response.json({
              ready: true,
              url: data.url,
              slug: data.slug,
              status: data.status,
              name: data.name,
              createdAt: data.createdAt,
            });
          }

          // Entry exists but provisioning failed — admin must intervene
          if (data.provisioningStatus === "failed") {
            return Response.json({
              ready: false,
              reason: "provisioning_failed",
              attempts: data.provisioningAttempts ?? 1,
              slug: data.slug,
            });
          }

          // Container not up yet — tell the client to keep waiting
          return Response.json({
            ready: false,
            reason: "provisioning",
            url: data.url,
            slug: data.slug,
          });
        }
      }
    } catch {
      // network error — fall through to workspaceId path
    }
  }

  // ── 2. WorkspaceId lookup / provision (fallback) ───────────────────────────
  if (!workspaceId) {
    return Response.json({ ready: false, reason: "no_workspace" });
  }

  // Check legacy workspace-ID-based slug first so existing tenants keep working
  const legacySlug = `w${workspaceId}`;
  try {
    const legacyRes = await fetch(`${infraBase}/api/clients/${legacySlug}`, { headers });
    if (legacyRes.ok) {
      const client = (await legacyRes.json()) as InfraClient;
      return Response.json({
        ready: true,
        url: client.url,
        slug: client.slug,
        status: client.status,
        name: client.name,
        createdAt: client.createdAt,
      });
    }
  } catch {
    // network error — fall through to provision
  }

  // Derive slug from email local-part. Append a 4-char suffix only if the clean
  // slug is already taken by another tenant.
  // e.g. "jagodana.dharmendra@gmail.com" → "jagodanadharmendra" (or "jagodanadharmendra-a3f9")
  let slug = legacySlug;
  if (email) {
    const local = email
      .split("@")[0]
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .slice(0, 18);
    const base = /^[a-z]/.test(local) ? local : `t${local}` || "tenant";
    try {
      const checkRes = await fetch(`${infraBase}/api/clients/${base}`, { headers });
      const suffix = Math.random().toString(36).slice(2, 6);
      slug = checkRes.ok ? `${base}-${suffix}` : base;
    } catch {
      slug = base;
    }
  }

  // Provision a new tenant
  try {
    const createRes = await fetch(`${infraBase}/api/clients`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        slug,
        name: slug,
        version: "latest",
        type: "hosted",
        ...(email ? { email } : {}),
      }),
    });

    if (createRes.ok) {
      return Response.json({
        ready: false,
        reason: "provisioning",
        url: `https://${slug}.app.agentcenter.cloud`,
        slug,
      });
    }

    // 409 means the email is already registered (creation in progress) — wait
    if (createRes.status === 409) {
      const body = (await createRes.json()) as { slug?: string };
      const existingSlug = body.slug ?? slug;
      return Response.json({
        ready: false,
        reason: "provisioning",
        url: `https://${existingSlug}.app.agentcenter.cloud`,
        slug: existingSlug,
      });
    }

    return Response.json({ ready: false, reason: "creation_failed" });
  } catch {
    return Response.json({ ready: false, reason: "network_error" });
  }
};
