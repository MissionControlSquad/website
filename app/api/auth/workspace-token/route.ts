import { NextRequest } from "next/server";
import { createJWT, verifyJWT } from "@/lib/jwt";
import { readSessionId, getSessionUser, resolveWorkspaceAccess } from "@/lib/buildbase-server";

export async function POST(request: NextRequest) {
  const SYSTEM_SECRET = process.env.SYSTEM_SECRET;

  if (!SYSTEM_SECRET) {
    return Response.json({ success: false, message: "Server misconfigured" }, { status: 500 });
  }

  const authHeader = request.headers.get("Authorization") ?? "";
  const existingToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const bearerClaims = existingToken ? await verifyJWT(existingToken, SYSTEM_SECRET) : null;

  let body: { userId?: string; workspaceId?: string; userRole?: string; email?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const workspaceId = body.workspaceId ?? "";
  if (!workspaceId) {
    return Response.json({ success: false, message: "workspaceId is required" }, { status: 400 });
  }

  let userId: string;
  let userRole: string;
  let email: string;

  if (bearerClaims) {
    // Warm path: a valid app JWT (minted at the OAuth code exchange) already proves the session, so a
    // workspace switch just re-mints scoped to the new workspace.
    userId = body.userId ?? String(bearerClaims.userId ?? "");
    userRole = body.userRole ?? "member";
    email = body.email ?? String(bearerClaims.email ?? "");
  } else {
    // Bootstrap path: a RETURNING user carries a live bb-session-id cookie but has no app JWT yet (it's
    // otherwise only minted during the OAuth code exchange, which they don't re-run). Authenticate off
    // the session cookie instead of a prior token — deriving identity from buildbase (never the body) and
    // verifying membership of the requested workspace before minting. Fail-closed.
    const sessionId = readSessionId(request.headers.get("Cookie"));
    const sessionUser = sessionId ? await getSessionUser(sessionId) : null;
    if (!sessionUser) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const access = await resolveWorkspaceAccess(sessionId, workspaceId, sessionUser.id);
    if (!access.isMember) {
      return Response.json(
        { success: false, message: "Not a member of this workspace" },
        { status: 403 }
      );
    }
    userId = sessionUser.id;
    userRole = access.role;
    email = sessionUser.email;
  }

  if (!userId) {
    return Response.json({ success: false, message: "userId is required" }, { status: 400 });
  }

  const token = await createJWT({ userId, workspaceId, userRole, email }, SYSTEM_SECRET);

  return Response.json({ success: true, token });
}
