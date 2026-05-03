const SESSION_COOKIE_NAME = "bb-session-id";

export async function POST() {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.set("Set-Cookie", `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);

  return new Response(JSON.stringify({ success: true }), { headers });
}
