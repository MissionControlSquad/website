interface Env {
  SAAS_CLIENT_SECRET: string;
  SAAS_SERVER_URL: string;
  SAAS_ORG_ID: string;
  SAAS_CLIENT_ID: string;
  SYSTEM_SECRET: string;
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const response = await context.next();
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
};
