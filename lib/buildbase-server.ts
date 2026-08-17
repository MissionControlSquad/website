import BuildBase from "@buildbase/sdk";

/**
 * Server-side buildbase access resolution for tenant provisioning authz (Phase 3).
 *
 * The tenant-status/retry routes let a signed-in user query/provision the tenant for an arbitrary
 * `workspaceId` (the launcher). Before acting we MUST verify — server-side, against buildbase — that
 * the session user is actually a MEMBER of that workspace (authz), their role there, and whether the
 * workspace has an ACTIVE subscription (owner + active-sub gates CREATE). Reuses the SDK server factory
 * (`withSession`) so we don't hand-roll buildbase REST. Fail-closed: any error ⇒ denied/inactive.
 */

const SERVER_URL =
  process.env.SAAS_SERVER_URL ||
  process.env.NEXT_PUBLIC_SAAS_SERVER_URL ||
  "https://api.console.buildbase.app";
const ORG_ID = process.env.SAAS_ORG_ID || process.env.NEXT_PUBLIC_SAAS_ORG_ID || "";

let _factory: ReturnType<typeof BuildBase> | null = null;
function factory(): ReturnType<typeof BuildBase> | null {
  if (!ORG_ID) return null;
  if (!_factory) _factory = BuildBase({ serverUrl: SERVER_URL, orgId: ORG_ID });
  return _factory;
}

export type WorkspaceRoleName = "owner" | "admin" | "member" | "viewer";

export interface WorkspaceAccess {
  isMember: boolean;
  isOwner: boolean;
  role: WorkspaceRoleName;
  subscriptionActive: boolean;
}

const DENY: WorkspaceAccess = {
  isMember: false,
  isOwner: false,
  role: "member",
  subscriptionActive: false,
};

function normalizeRole(raw: unknown): WorkspaceRoleName {
  const r = typeof raw === "string" ? raw.toLowerCase() : "";
  return r === "owner" || r === "admin" || r === "viewer" ? (r as WorkspaceRoleName) : "member";
}

interface WorkspaceLike {
  _id?: string;
  workspaceId?: string;
  createdBy?: string | { _id?: string };
  users?: Array<{ _id?: string; id?: string }>;
  roles?: string[];
}

/**
 * Resolve the session user's access to a workspace: membership + role (from the workspace's presence in
 * their `workspace.list()`, matching the tenant bridge's semantics) and whether it has an active
 * subscription. Fail-closed.
 */
export async function resolveWorkspaceAccess(
  sessionId: string,
  workspaceId: string,
  userId: string
): Promise<WorkspaceAccess> {
  const bb = factory();
  if (!bb || !sessionId || !workspaceId) return DENY;
  const scoped = bb.withSession(sessionId);

  let ws: WorkspaceLike | undefined;
  try {
    const list = (await scoped.workspace.list()) as WorkspaceLike[];
    ws = (list ?? []).find((w) => w?._id === workspaceId || w?.workspaceId === workspaceId);
  } catch {
    return DENY; // buildbase refused / network — treat as not-a-member
  }
  if (!ws) return DENY; // not a member of this workspace

  const createdBy = typeof ws.createdBy === "string" ? ws.createdBy : ws.createdBy?._id;
  const isOwner = Boolean(userId) && createdBy === userId;
  const users = Array.isArray(ws.users) ? ws.users : [];
  const roles = Array.isArray(ws.roles) ? ws.roles : [];
  const idx = users.findIndex((u) => (u?._id ?? u?.id) === userId);
  const role: WorkspaceRoleName = isOwner
    ? "owner"
    : normalizeRole(idx >= 0 ? roles[idx] : undefined);

  let subscriptionActive = false;
  try {
    const res = (await scoped.subscription.get(workspaceId)) as {
      subscription?: { subscriptionStatus?: string } | null;
      subscriptionStatus?: string;
    };
    const status = res?.subscription?.subscriptionStatus ?? res?.subscriptionStatus;
    subscriptionActive = status === "active" || status === "trialing";
  } catch {
    subscriptionActive = false;
  }

  return { isMember: true, isOwner, role, subscriptionActive };
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Resolve the buildbase user behind a session id, server-side (identity from buildbase, never from the
 * client). Used to bootstrap the app JWT for a RETURNING user who carries a live bb-session-id but has
 * no app token yet (the token is otherwise only minted during the OAuth code exchange). Fail-closed:
 * returns null on any error / no session.
 */
export async function getSessionUser(sessionId: string): Promise<SessionUser | null> {
  const bb = factory();
  if (!bb || !sessionId) return null;
  try {
    const u = (await bb.withSession(sessionId).users.getProfile()) as {
      _id?: string;
      id?: string;
      email?: string;
      name?: string;
    };
    const id = u?._id || u?.id || "";
    if (!id) return null;
    return { id, email: u?.email ?? "", name: u?.name ?? "" };
  } catch {
    return null;
  }
}

/** Read the buildbase session id from a request Cookie header. */
export function readSessionId(cookieHeader: string | null): string {
  if (!cookieHeader) return "";
  const c = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith("bb-session-id="));
  return c ? c.slice("bb-session-id=".length) : "";
}
