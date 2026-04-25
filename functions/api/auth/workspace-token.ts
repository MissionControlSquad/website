import { createJWT, verifyJWT } from "../../lib/jwt";

interface Env {
  SYSTEM_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { SYSTEM_SECRET } = context.env;

  if (!SYSTEM_SECRET) {
    return Response.json({ success: false, message: "Server misconfigured" }, { status: 500 });
  }

  // Require a valid token from /api/auth/token to prove the caller authenticated
  const authHeader = context.request.headers.get("Authorization") ?? "";
  const existingToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!existingToken || !(await verifyJWT(existingToken, SYSTEM_SECRET))) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let userId: string, workspaceId: string, userRole: string, email: string;
  try {
    const body = (await context.request.json()) as {
      userId?: string;
      workspaceId?: string;
      userRole?: string;
      email?: string;
    };
    userId = body.userId ?? "";
    workspaceId = body.workspaceId ?? "";
    userRole = body.userRole ?? "member";
    email = body.email ?? "";
  } catch {
    return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  if (!userId || !workspaceId) {
    return Response.json(
      { success: false, message: "userId and workspaceId are required" },
      { status: 400 }
    );
  }

  const token = await createJWT({ userId, workspaceId, userRole, email }, SYSTEM_SECRET);

  return Response.json({ success: true, token });
};
