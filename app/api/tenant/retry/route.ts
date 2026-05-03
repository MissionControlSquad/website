import { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import { PROVISIONING_STATUS } from "@/lib/constants";

interface TokenPayload {
  userId?: string;
  workspaceId?: string | null;
  userRole?: string;
  email?: string;
}

interface InfraLookupResult {
  found: boolean;
  slug?: string;
  provisioningStatus?: string;
  provisioningAttempts?: number;
}

export async function POST(request: NextRequest) {
  const SYSTEM_SECRET = process.env.SYSTEM_SECRET;
  const INFRA_API_URL = process.env.INFRA_API_URL;
  const INFRA_API_KEY = process.env.INFRA_API_KEY;

  const authHeader = request.headers.get("Authorization") ?? "";
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

    if (data.provisioningStatus !== PROVISIONING_STATUS.FAILED) {
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
}
