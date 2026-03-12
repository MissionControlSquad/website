interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  LIFETIME_DEAL_TOKEN: string;
}

const COOKIE_NAME = "ld_access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const token = env.LIFETIME_DEAL_TOKEN;
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref");

  // Check existing cookie
  const cookies = parseCookies(request.headers.get("Cookie") ?? "");
  if (cookies[COOKIE_NAME] === token) return context.next();

  // Valid ?ref token in URL — set cookie and redirect to clean URL
  if (ref === token) {
    url.searchParams.delete("ref");
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
        "Set-Cookie": `${COOKIE_NAME}=${token}; Path=/lifetime-deal; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax`,
      },
    });
  }

  // No valid token or cookie — redirect home
  return Response.redirect(new URL("/", request.url).toString(), 302);
};

function parseCookies(header: string): Record<string, string> {
  return Object.fromEntries(
    header
      .split(";")
      .filter(Boolean)
      .map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k.trim(), v.join("=")];
      })
  );
}
