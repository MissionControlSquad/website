import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://agentcenter.cloud",
  "https://www.agentcenter.cloud",
  "https://agentcentercloud.vercel.app",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
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

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(origin);
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
