interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID_MONTHLY: string;
  STRIPE_PRICE_ID_YEARLY: string;
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
