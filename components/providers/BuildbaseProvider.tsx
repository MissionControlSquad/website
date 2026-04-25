"use client";

import { SaaSOSProvider, useSaaSAuth } from "@buildbase/sdk/react";
import { ApiVersion, consumeAuthIntent, type EventType, type EventData } from "@buildbase/sdk";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    endorsely_referral?: string;
  }
}

const SERVER_URL = process.env.NEXT_PUBLIC_SAAS_SERVER_URL ?? "";
const ORG_ID = process.env.NEXT_PUBLIC_SAAS_ORG_ID ?? "";
const CLIENT_ID = process.env.NEXT_PUBLIC_SAAS_CLIENT_ID ?? "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

function storeAuthToken(token: string) {
  localStorage.setItem("auth_token", token);
}

function storeUserEmail(email: string) {
  if (email) localStorage.setItem("user_email", email);
}

function clearAuthToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_email");
}

async function updateAuthToken(userId: string, workspaceId: string, userRole: string) {
  // Preserve the email across token refreshes — it was stored during initial sign-in
  const email = localStorage.getItem("user_email") ?? "";
  try {
    const response = await fetch("/api/auth/workspace-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, workspaceId, userRole, email }),
    });
    const data = (await response.json()) as { success?: boolean; token?: string };
    if (data.success && data.token) {
      storeAuthToken(data.token);
      return data.token;
    }
  } catch (error) {
    console.error("Failed to update auth token:", error);
  }
  return null;
}

const ENDORSELY_KEY = "endorsely_referral";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

function getEndorselyReferral(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const referral =
    readCookie(ENDORSELY_KEY) ||
    window.endorsely_referral ||
    localStorage.getItem(ENDORSELY_KEY) ||
    undefined;

  if (referral && UUID_RE.test(referral)) {
    localStorage.setItem(ENDORSELY_KEY, referral);
    return referral;
  }
  return undefined;
}

// Redirects to the saved auth intent URL after sign-in completes.
// Lives inside SaaSOSProvider so it can read useSaaSAuth.
function PostAuthRedirector() {
  const { isAuthenticated, isLoading } = useSaaSAuth();
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (prevAuthRef.current === false && isAuthenticated) {
      const intentUrl = consumeAuthIntent();
      window.location.href = intentUrl ?? "/dashboard";
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, isLoading]);

  return null;
}

export function BuildbaseProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Don't render SaaSOSProvider during SSR/prerendering — orgId would be empty
  // and the SDK throws. Also guard against empty ORG_ID at build time.
  if (!mounted || !ORG_ID) {
    return <>{children}</>;
  }

  return (
    <SaaSOSProvider
      serverUrl={SERVER_URL}
      version={ApiVersion.V1}
      orgId={ORG_ID}
      auth={{
        clientId: CLIENT_ID,
        redirectUrl: APP_URL,
        callbacks: {
          // Restore session from httpOnly cookie on page refresh
          getSession: async () => {
            const res = await fetch("/api/auth/session");
            const data = (await res.json()) as { sessionId?: string | null };
            return data.sessionId ?? null;
          },

          handleAuthentication: async (code: string) => {
            const response = await fetch("/api/auth/token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
            });
            const data = (await response.json()) as {
              success?: boolean;
              sessionId?: string;
              token?: string;
              user?: { email?: string };
            };
            if (data.success && data.token) {
              storeAuthToken(data.token);
            }
            // Persist email so workspace token refreshes can carry it forward
            if (data.user?.email) {
              storeUserEmail(data.user.email);
            }
            return { sessionId: data.sessionId ?? "" };
          },

          onSignOut: async () => {
            clearAuthToken();
            await fetch("/api/auth/logout", { method: "POST" });
          },

          handleEvent: async (eventType: EventType, data: EventData) => {
            try {
              await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventType, data }),
              });

              if (eventType === "workspace:changed") {
                const eventData = data as unknown as {
                  workspace: { _id: string };
                  user: { _id: string; id?: string };
                  userRole?: string;
                };
                if (eventData.workspace && eventData.user) {
                  const userId = eventData.user.id || eventData.user._id;
                  await updateAuthToken(
                    userId,
                    eventData.workspace._id,
                    eventData.userRole || "member"
                  );
                }
              }

              if (eventType === "workspace:user-added") {
                const eventData = data as unknown as {
                  userId: string;
                  workspace: { _id: string };
                  role: string;
                };
                await updateAuthToken(eventData.userId, eventData.workspace._id, eventData.role);
              }
            } catch (error) {
              console.error("Failed to handle event:", error);
            }
          },

          onWorkspaceChange: async (params) => {
            const { user, workspace, role: userRole } = params;
            if (!user?.id || !workspace?._id) return;
            // Use email from params if available, otherwise fall back to localStorage
            const email =
              (user as unknown as { email?: string }).email ??
              localStorage.getItem("user_email") ??
              "";
            if (email) storeUserEmail(email);
            try {
              const response = await fetch("/api/auth/workspace-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: user.id,
                  workspaceId: workspace._id,
                  userRole,
                  email,
                }),
              });
              const data = (await response.json()) as { success?: boolean; token?: string };
              if (data.success && data.token) {
                storeAuthToken(data.token);
              }
            } catch (error) {
              console.error("Failed to update auth token on workspace change:", error);
            }
          },
        },
      }}
      getCheckoutStripeParams={() => {
        const referral = getEndorselyReferral();
        if (!referral) return;
        return {
          clientReferenceId: referral,
          metadata: { endorsely_referral: referral },
        };
      }}
    >
      <PostAuthRedirector />
      {children}
    </SaaSOSProvider>
  );
}
