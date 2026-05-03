interface Env {
  SAAS_CLIENT_SECRET: string;
  SAAS_SERVER_URL: string;
  SAAS_ORG_ID: string;
  SAAS_CLIENT_ID: string;
  SYSTEM_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;
}

const ALLOWED_ORIGINS = ["https://agentcenter.cloud", "https://www.agentcenter.cloud"];

function getCorsHeaders(origin: string | null, appUrl: string): Record<string, string> {
  // Determine if we're running in local dev by inspecting the configured app URL.
  // localhost is NEVER trusted in production — only when the server itself is local.
  const serverIsLocal =
    appUrl.startsWith("http://localhost") || appUrl.startsWith("http://127.0.0.1");
  const originIsLocal =
    origin?.startsWith("http://localhost") || origin?.startsWith("http://127.0.0.1");
  const isAllowed =
    (serverIsLocal && originIsLocal) || (origin !== null && ALLOWED_ORIGINS.includes(origin));

  return {
    "Access-Control-Allow-Origin": isAllowed && origin ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin");
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin, context.env.NEXT_PUBLIC_APP_URL ?? ""),
  });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin");
  const response = await context.next();
  const corsHeaders = getCorsHeaders(origin, context.env.NEXT_PUBLIC_APP_URL ?? "");
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
};
