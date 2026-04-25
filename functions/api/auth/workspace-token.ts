import { createJWT } from "../../lib/jwt";

interface Env {
  SYSTEM_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { SYSTEM_SECRET } = context.env;

  let userId: string, workspaceId: string, userRole: string;
  try {
    const body = (await context.request.json()) as {
      userId?: string;
      workspaceId?: string;
      userRole?: string;
    };
    userId = body.userId ?? "";
    workspaceId = body.workspaceId ?? "";
    userRole = body.userRole ?? "member";
  } catch {
    return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  if (!userId || !workspaceId) {
    return Response.json(
      { success: false, message: "userId and workspaceId are required" },
      { status: 400 }
    );
  }

  const token = await createJWT(
    { userId, workspaceId, userRole },
    SYSTEM_SECRET || "dev-secret-change-in-production"
  );

  return Response.json({ success: true, token });
};
