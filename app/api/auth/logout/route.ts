const SESSION_COOKIE_NAME = "bb-session-id";

export async function POST() {
  // Clear the session cookie on the SAME scope it was set with (see token/route.ts). If AUTH_COOKIE_DOMAIN
  // is configured for cross-subdomain SSO, the deletion must carry the same Domain or the browser keeps the
  // parent-domain cookie and logout wouldn't propagate to the tenant dashboards.
  const cookieDomain = process.env.AUTH_COOKIE_DOMAIN || "";
  const domainFlag = cookieDomain ? `; Domain=${cookieDomain}` : "";
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax${domainFlag}; Max-Age=0`
  );

  return new Response(JSON.stringify({ success: true }), { headers });
}
