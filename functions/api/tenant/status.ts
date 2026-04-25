import { verifyJWT } from "../../lib/jwt";
import {
  SELF_HOST_PLAN_NAME,
  HOSTED_APP_DOMAIN,
  CLIENT_TYPE,
  PROVISIONING_STATUS,
  type ProvisioningStatus,
} from "../../../lib/constants";

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
  url?: string | null;
  name?: string;
  type?: string;
  status?: string | null;
  licenseKey?: string;
  provisioningStatus?: ProvisioningStatus;
  provisioningAttempts?: number;
  createdAt?: string;
}

interface InfraCreateResult {
  ok: boolean;
  type?: string;
  licenseKey?: string;
  slug?: string;
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

  if (!SYSTEM_SECRET) {
    return Response.json({ ready: false, error: "Server misconfigured" }, { status: 500 });
  }
  const payload = (await verifyJWT(token, SYSTEM_SECRET)) as TokenPayload | null;
  if (!payload) {
    return Response.json({ ready: false, error: "Invalid token" }, { status: 401 });
  }

  const { email, workspaceId } = payload;
  const url = new URL(context.request.url);
  const planName = url.searchParams.get("planName") ?? undefined;
  const isSelfHostedPlan = planName === SELF_HOST_PLAN_NAME;

  const infraBase = (INFRA_API_URL || "").replace(/\/$/, "");
  const headers: Record<string, string> = {
    "X-API-Key": INFRA_API_KEY || "",
    "Content-Type": "application/json",
  };

  // ── 1. Email-based lookup (fast path) ──────────────────────────────────────
  if (email) {
    try {
      const lookupUrl = new URL(`${infraBase}/api/clients/lookup`);
      lookupUrl.searchParams.set("email", email);
      if (planName) lookupUrl.searchParams.set("planName", planName);

      const lookupRes = await fetch(lookupUrl.toString(), { headers });
      if (lookupRes.ok) {
        const data = (await lookupRes.json()) as InfraLookupResult;
        if (data.found) {
          // Self-hosted clients manage their own uptime — always active.
          // Hosted clients with no provisioningStatus field are legacy entries that
          // predate tracking and should be treated as active.
          // New entries use provisioningStatus explicitly set by the creation flow.
          const isActive =
            data.type === CLIENT_TYPE.SELF_HOSTED ||
            data.provisioningStatus === PROVISIONING_STATUS.ACTIVE ||
            data.provisioningStatus === undefined;

          if (isActive) {
            return Response.json({
              ready: true,
              url: data.url ?? null,
              slug: data.slug,
              ...(data.licenseKey ? { licenseKey: data.licenseKey } : {}),
              status: data.status,
              type: data.type ?? CLIENT_TYPE.HOSTED,
              name: data.name,
              createdAt: data.createdAt,
            });
          }

          // Entry exists but provisioning failed — admin must intervene
          if (data.provisioningStatus === PROVISIONING_STATUS.FAILED) {
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
            reason: PROVISIONING_STATUS.PROVISIONING,
            url: data.url ?? null,
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
        // Let the infra determine type from planName; pass explicit type only for hosted
        ...(isSelfHostedPlan ? {} : { type: CLIENT_TYPE.HOSTED }),
        ...(planName ? { planName } : {}),
        ...(email ? { email } : {}),
      }),
    });

    if (createRes.ok) {
      const body = (await createRes.json()) as InfraCreateResult;

      // Self-hosted: infra registered + issued license immediately — ready now
      if (body.type === CLIENT_TYPE.SELF_HOSTED && body.licenseKey) {
        return Response.json({
          ready: true,
          url: null,
          slug,
          type: CLIENT_TYPE.SELF_HOSTED,
          licenseKey: body.licenseKey,
          status: null,
        });
      }

      return Response.json({
        ready: false,
        reason: PROVISIONING_STATUS.PROVISIONING,
        url: `https://${slug}.${HOSTED_APP_DOMAIN}`,
        slug,
      });
    }

    // 409 means the email is already registered (creation in progress) — wait
    if (createRes.status === 409) {
      const body = (await createRes.json()) as { slug?: string };
      const existingSlug = body.slug ?? slug;
      return Response.json({
        ready: false,
        reason: PROVISIONING_STATUS.PROVISIONING,
        url: `https://${existingSlug}.${HOSTED_APP_DOMAIN}`,
        slug: existingSlug,
      });
    }

    return Response.json({ ready: false, reason: "creation_failed" });
  } catch {
    return Response.json({ ready: false, reason: "network_error" });
  }
};
