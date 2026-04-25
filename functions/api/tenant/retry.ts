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
  provisioningStatus?: "provisioning" | "active" | "failed";
  provisioningAttempts?: number;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { SYSTEM_SECRET, INFRA_API_URL, INFRA_API_KEY } = context.env;

  const authHeader = context.request.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (!SYSTEM_SECRET) return Response.json({ error: "Server misconfigured" }, { status: 500 });
  const payload = (await verifyJWT(token, SYSTEM_SECRET)) as TokenPayload | null;
  if (!payload) return Response.json({ error: "Invalid token" }, { status: 401 });

  const { email } = payload;
  if (!email) return Response.json({ error: "No email in token" }, { status: 400 });

  const infraBase = (INFRA_API_URL || "").replace(/\/$/, "");
  const headers: Record<string, string> = {
    "X-API-Key": INFRA_API_KEY || "",
    "Content-Type": "application/json",
  };

  // Find the slug for this email
  try {
    const lookupRes = await fetch(
      `${infraBase}/api/clients/lookup?email=${encodeURIComponent(email)}`,
      { headers }
    );
    if (!lookupRes.ok) {
      return Response.json({ error: "Tenant not found" }, { status: 404 });
    }
    const data = (await lookupRes.json()) as InfraLookupResult;
    if (!data.found || !data.slug) {
      return Response.json({ error: "Tenant not found" }, { status: 404 });
    }

    // Only allow retry when provisioning explicitly failed — not for active or
    // in-progress tenants. Prevents misuse by users calling this endpoint manually.
    if (data.provisioningStatus !== "failed") {
      return Response.json({ error: "Tenant is not in a failed state" }, { status: 409 });
    }

    const reprRes = await fetch(`${infraBase}/api/clients/${data.slug}/reprovision`, {
      method: "POST",
      headers,
    });

    if (reprRes.status === 429) {
      return Response.json({ error: "max_attempts_reached" }, { status: 429 });
    }
    if (!reprRes.ok) {
      return Response.json({ error: "Retry failed" }, { status: 500 });
    }

    const result = (await reprRes.json()) as { attempts: number };
    return Response.json({ ok: true, attempts: result.attempts });
  } catch {
    return Response.json({ error: "network_error" }, { status: 500 });
  }
};
