import { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { resolveWorkspaceAccess, readSessionId } from "@/lib/buildbase-server";
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

/** Public tenant host — workspace-id-based URL (not email-based). */
function tenantHost(workspaceId: string): string {
  return `${workspaceId}.${HOSTED_APP_DOMAIN}`;
}

/**
 * Internal, opaque tenant slug derived from a workspaceId. Infra requires a slug matching
 * `^[a-z][a-z0-9-]*$`; a raw workspaceId (24-hex Mongo id) can start with a digit, so we prefix `w`.
 * The PUBLIC url stays `<workspaceId>.app…` (a Traefik Host alias added by the infra set-workspace route).
 */
function tenantSlug(workspaceId: string): string {
  return `w${workspaceId}`.toLowerCase().replace(/[^a-z0-9-]/g, "");
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

  const email = payload.email;
  const url = new URL(request.url);
  // workspaceId is the tenant key. The launcher may ask for ANY of the user's workspaces via the query
  // param; otherwise fall back to the JWT's current workspace.
  const workspaceId = (url.searchParams.get("workspaceId") || payload.workspaceId || "").trim();
  const rawPlanName = url.searchParams.get("planName");
  const planName = rawPlanName === SELF_HOST_PLAN_NAME ? SELF_HOST_PLAN_NAME : undefined;
  const isSelfHostedPlan = planName === SELF_HOST_PLAN_NAME;

  if (!workspaceId) {
    return Response.json({ ready: false, reason: "no_workspace" });
  }

  const infraBase = (INFRA_API_URL || "").replace(/\/$/, "");
  const headers: Record<string, string> = {
    "X-API-Key": INFRA_API_KEY || "",
    "Content-Type": "application/json",
  };

  // AUTHZ (Phase 3): the workspaceId may come from the query param (launcher), so verify server-side
  // that the session user is actually a MEMBER of it before touching infra. Read-only status is allowed
  // for any member; CREATE is gated on owner + active subscription below. Fail-closed.
  const access = await resolveWorkspaceAccess(
    readSessionId(request.headers.get("Cookie")),
    workspaceId,
    payload.userId ?? ""
  );
  if (!access.isMember) {
    return Response.json({ ready: false, reason: "not_a_member" }, { status: 403 });
  }

  // 1. Resolve the tenant by workspaceId.
  try {
    const lookupUrl = new URL(`${infraBase}/api/clients/lookup`);
    lookupUrl.searchParams.set("workspaceId", workspaceId);
    if (planName) lookupUrl.searchParams.set("planName", planName);
    const lookupRes = await fetch(lookupUrl.toString(), { headers });
    if (lookupRes.ok) {
      const data = (await lookupRes.json()) as InfraLookupResult;
      if (data.found) {
        const isHosted = (data.type ?? CLIENT_TYPE.HOSTED) === CLIENT_TYPE.HOSTED;
        const ps = data.provisioningStatus;
        if (ps === PROVISIONING_STATUS.FAILED) {
          return Response.json({
            ready: false,
            reason: "provisioning_failed",
            attempts: data.provisioningAttempts ?? 1,
            slug: data.slug,
          });
        }
        const isActive =
          data.type === CLIENT_TYPE.SELF_HOSTED ||
          ps === PROVISIONING_STATUS.ACTIVE ||
          ps === undefined;
        return Response.json({
          ready: isActive,
          // Hosted tenants are served at the workspace-id host; self-hosted use their own domain (data.url).
          url: isHosted ? `https://${tenantHost(workspaceId)}` : (data.url ?? null),
          slug: data.slug,
          ...(data.licenseKey ? { licenseKey: data.licenseKey } : {}),
          status: data.status,
          type: data.type ?? CLIENT_TYPE.HOSTED,
          name: data.name,
          createdAt: data.createdAt,
          ...(isActive ? {} : { reason: PROVISIONING_STATUS.PROVISIONING }),
        });
      }
    }
  } catch {
    // network error — fall through to create
  }

  // 2. Not found → provision — but ONLY the workspace owner with an active subscription may create a
  // tenant. Members/viewers (and owners without a live subscription) get a non-provisioned status and no
  // tenant is created on their behalf.
  if (!access.isOwner) {
    return Response.json({ ready: false, reason: "not_owner" });
  }
  if (!access.subscriptionActive) {
    return Response.json({ ready: false, reason: "no_subscription" });
  }

  const slug = tenantSlug(workspaceId);
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
        workspaceId, // infra dedups on this + injects TENANT_WORKSPACE_ID
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
      // Hosted: attach the <workspaceId>.app… Host alias (idempotent) so the tenant is reachable at the
      // workspace-id URL, same as migrated tenants. Best-effort — provisioning proceeds regardless.
      await fetch(`${infraBase}/api/clients/${slug}/set-workspace`, {
        method: "POST",
        headers,
        body: JSON.stringify({ workspaceId }),
      }).catch(() => {});
      return Response.json({
        ready: false,
        reason: PROVISIONING_STATUS.PROVISIONING,
        url: `https://${tenantHost(workspaceId)}`,
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
        return Response.json({ ready: false, reason: "provisioning_failed", slug: existingSlug });
      }
      const ready = ps === PROVISIONING_STATUS.ACTIVE || ps === undefined;
      return Response.json({
        ready,
        url: `https://${tenantHost(workspaceId)}`,
        slug: existingSlug,
        type: CLIENT_TYPE.HOSTED,
        status: null,
        ...(ready ? {} : { reason: PROVISIONING_STATUS.PROVISIONING }),
      });
    }

    return Response.json({ ready: false, reason: "creation_failed" });
  } catch {
    return Response.json({ ready: false, reason: "network_error" });
  }
}
