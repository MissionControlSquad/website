import { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import {
  SELF_HOST_PLAN_NAME,
  HOSTED_APP_DOMAIN,
  CLIENT_TYPE,
  PROVISIONING_STATUS,
  type ProvisioningStatus,
} from "@/lib/constants";

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
  type?: string;
  createdAt: string;
  provisioningStatus?: ProvisioningStatus;
}

export async function GET(request: NextRequest) {
  const SYSTEM_SECRET = process.env.SYSTEM_SECRET;
  const INFRA_API_URL = process.env.INFRA_API_URL;
  const INFRA_API_KEY = process.env.INFRA_API_KEY;

  const authHeader = request.headers.get("Authorization") ?? "";
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
  const url = new URL(request.url);
  const rawPlanName = url.searchParams.get("planName");
  const planName = rawPlanName === SELF_HOST_PLAN_NAME ? SELF_HOST_PLAN_NAME : undefined;
  const isSelfHostedPlan = planName === SELF_HOST_PLAN_NAME;

  const infraBase = (INFRA_API_URL || "").replace(/\/$/, "");
  const headers: Record<string, string> = {
    "X-API-Key": INFRA_API_KEY || "",
    "Content-Type": "application/json",
  };

  if (email) {
    try {
      const lookupUrl = new URL(`${infraBase}/api/clients/lookup`);
      lookupUrl.searchParams.set("email", email);
      if (planName) lookupUrl.searchParams.set("planName", planName);

      const lookupRes = await fetch(lookupUrl.toString(), { headers });
      if (lookupRes.ok) {
        const data = (await lookupRes.json()) as InfraLookupResult;
        if (data.found) {
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

          if (data.provisioningStatus === PROVISIONING_STATUS.FAILED) {
            return Response.json({
              ready: false,
              reason: "provisioning_failed",
              attempts: data.provisioningAttempts ?? 1,
              slug: data.slug,
            });
          }

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

  if (!workspaceId) {
    return Response.json({ ready: false, reason: "no_workspace" });
  }

  // Derive base slug and deterministic slug once — reused for fallback lookup and creation.
  let base = "tenant";
  if (email) {
    const local = email
      .split("@")[0]
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .slice(0, 18);
    base = /^[a-z]/.test(local) ? local : `t${local}` || "tenant";
  }
  const deterministicSlug = `${base}-${workspaceId.slice(-4)}`;

  // Fallback: check by deterministic slug then base slug directly.
  // Catches existing clients whose registry entry pre-dates email tracking
  // so the email lookup above returned found:false even though the client exists.
  for (const candidate of [deterministicSlug, base]) {
    try {
      const res = await fetch(`${infraBase}/api/clients/${candidate}`, { headers });
      if (!res.ok) continue;
      const client = (await res.json()) as InfraClient;
      const ps = client.provisioningStatus;
      if (ps === PROVISIONING_STATUS.FAILED) {
        return Response.json({ ready: false, reason: "provisioning_failed", slug: candidate });
      }
      const isActive =
        client.type === CLIENT_TYPE.SELF_HOSTED ||
        ps === PROVISIONING_STATUS.ACTIVE ||
        ps === undefined;

      // Backfill email on the registry entry so future calls use the faster
      // email lookup instead of falling through to this slug-based check.
      if (email) {
        fetch(`${infraBase}/api/clients/${candidate}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ email }),
        }).catch(() => {});
      }

      return Response.json({
        ready: isActive,
        url: client.url,
        slug: client.slug,
        status: client.status,
        type: client.type ?? CLIENT_TYPE.HOSTED,
        name: client.name,
        createdAt: client.createdAt,
        ...(isActive ? {} : { reason: PROVISIONING_STATUS.PROVISIONING }),
      });
    } catch {
      // network error — continue to next candidate
    }
  }

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
        type: CLIENT_TYPE.HOSTED,
        name: client.name,
        createdAt: client.createdAt,
      });
    }
  } catch {
    // network error — fall through to provision
  }

  let slug = legacySlug;
  if (email) {
    try {
      const checkRes = await fetch(`${infraBase}/api/clients/${base}`, { headers });
      slug = checkRes.ok ? deterministicSlug : base;
    } catch {
      slug = base;
    }
  }

  try {
    const createRes = await fetch(`${infraBase}/api/clients`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        slug,
        name: slug,
        version: "latest",
        ...(isSelfHostedPlan ? {} : { type: CLIENT_TYPE.HOSTED }),
        ...(planName ? { planName } : {}),
        ...(email ? { email } : {}),
      }),
    });

    if (createRes.ok) {
      const body = (await createRes.json()) as InfraCreateResult;

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

    if (createRes.status === 409) {
      const body = (await createRes.json()) as {
        slug?: string;
        provisioningStatus?: ProvisioningStatus;
      };
      const existingSlug = body.slug ?? slug;
      const ps = body.provisioningStatus;

      if (ps === PROVISIONING_STATUS.FAILED) {
        return Response.json({
          ready: false,
          reason: "provisioning_failed",
          slug: existingSlug,
        });
      }

      // "active" or legacy entries with no provisioningStatus are ready
      if (ps === PROVISIONING_STATUS.ACTIVE || ps === undefined) {
        return Response.json({
          ready: true,
          url: `https://${existingSlug}.${HOSTED_APP_DOMAIN}`,
          slug: existingSlug,
          type: CLIENT_TYPE.HOSTED,
          status: null,
        });
      }

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
}
