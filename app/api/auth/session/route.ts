import { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "bb-session-id";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("Cookie") ?? "";

  const sessionCookie = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${SESSION_COOKIE_NAME}=`));

  const sessionId = sessionCookie ? sessionCookie.slice(`${SESSION_COOKIE_NAME}=`.length) : null;

  return Response.json({ sessionId: sessionId || null });
}
