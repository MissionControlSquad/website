const SESSION_COOKIE_NAME = "bb-session-id";

export const onRequestGet: PagesFunction = async (context) => {
  const cookieHeader = context.request.headers.get("Cookie") ?? "";

  const sessionCookie = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${SESSION_COOKIE_NAME}=`));

  const sessionId = sessionCookie ? sessionCookie.slice(`${SESSION_COOKIE_NAME}=`.length) : null;

  return Response.json({ sessionId: sessionId || null });
};
