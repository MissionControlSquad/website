import { createJWT } from "../../lib/jwt";

const SESSION_COOKIE_NAME = "bb-session-id";

interface Env {
  SAAS_CLIENT_SECRET: string;
  SAAS_SERVER_URL: string;
  SAAS_ORG_ID: string;
  SAAS_CLIENT_ID: string;
  SYSTEM_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { SAAS_CLIENT_SECRET, SAAS_SERVER_URL, SAAS_ORG_ID, SAAS_CLIENT_ID, SYSTEM_SECRET } =
    context.env;

  let code: string;
  try {
    const body = (await context.request.json()) as { code?: string };
    code = body.code ?? "";
  } catch {
    return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  if (!code || code.length < 10 || code.length > 256) {
    return Response.json({ success: false, message: "Invalid code" }, { status: 400 });
  }

  const serverUrl = SAAS_SERVER_URL || "https://api.console.buildbase.app";

  const tokenRes = await fetch(`${serverUrl}/api/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      clientId: SAAS_CLIENT_ID,
      clientSecret: SAAS_CLIENT_SECRET,
      orgId: SAAS_ORG_ID,
    }),
  });

  if (!tokenRes.ok) {
    return Response.json({ success: false, message: "Token exchange failed" }, { status: 401 });
  }

  const raw = (await tokenRes.json()) as { data?: unknown };
  const result = (raw.data ?? raw) as {
    sessionId?: string;
    user?: { id?: string; _id?: string; email?: string; name?: string; role?: string };
  };
  const sessionId = result.sessionId;
  const user = result.user;

  if (!sessionId) {
    return Response.json({ success: false, message: "No session returned" }, { status: 401 });
  }

  const userId = user?.id || user?._id || "";
  const token = await createJWT(
    { userId, workspaceId: null, userRole: user?.role || "user", email: user?.email || "" },
    SYSTEM_SECRET || "dev-secret-change-in-production"
  );

  const isSecure = new URL(context.request.url).protocol === "https:";
  const cookieFlags = `HttpOnly; Path=/; SameSite=Lax${isSecure ? "; Secure" : ""}; Max-Age=604800`;

  const headers = new Headers({ "Content-Type": "application/json" });
  headers.set("Set-Cookie", `${SESSION_COOKIE_NAME}=${sessionId}; ${cookieFlags}`);

  return new Response(JSON.stringify({ success: true, sessionId, token, user }), { headers });
};
