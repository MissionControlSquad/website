"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSaaSAuth, WorkspaceSwitcher } from "@buildbase/sdk/react";
import { useWorkspaceSubscription } from "@/lib/hooks/useWorkspaceSubscription";
import {
  CONTACT_EMAIL,
  SELF_HOSTING_SETUP_URL,
  AUTH_TOKEN_KEY,
  TENANT_MAX_RETRY_ATTEMPTS,
  CLIENT_TYPE,
  PROVISIONING_STATUS,
} from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TenantStatus {
  ready: boolean;
  url?: string;
  slug?: string;
  licenseKey?: string;
  status?: string | null;
  type?: string;
  reason?: string;
  error?: string;
  attempts?: number;
}

// ─── Skeleton primitives ──────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-800 ${className ?? ""}`} />;
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-2.5">
      <Skeleton className="w-7 h-7 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-32 h-2.5" />
      </div>
    </div>
  );
}

function SubscriptionSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col gap-4 h-full">
      <Skeleton className="w-24 h-3" />
      <div className="flex items-center gap-2 mt-1">
        <Skeleton className="w-2.5 h-2.5 rounded-full flex-shrink-0" />
        <Skeleton className="w-36 h-4" />
      </div>
      <Skeleton className="w-48 h-3 mt-1" />
      <Skeleton className="w-28 h-9 rounded-lg mt-auto" />
    </div>
  );
}

function TenantSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col items-center justify-center gap-4 h-full">
      <div className="flex items-center gap-2">
        <Skeleton className="w-2.5 h-2.5 rounded-full flex-shrink-0" />
        <Skeleton className="w-36 h-4" />
      </div>
      <Skeleton className="w-52 h-3" />
      <Skeleton className="w-40 h-10 rounded-lg mt-2" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-80 h-9" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SubscriptionSkeleton />
        <TenantSkeleton />
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-4 h-4 border-[1.5px]" : "w-6 h-6 border-2";
  return (
    <div className={`${cls} border-neutral-700 border-t-primary-500 rounded-full animate-spin`} />
  );
}

// ─── SelfHostedCard ───────────────────────────────────────────────────────────

function SelfHostedCard({ tenant }: { tenant: TenantStatus }) {
  const [copied, setCopied] = useState(false);
  const licenseKey = tenant.licenseKey ?? "";

  function copyKey() {
    if (!licenseKey) return;
    void navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl border border-neutral-700/50 bg-neutral-900/60 h-full">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary-400 flex-shrink-0" />
        <span className="font-semibold text-neutral-100 text-base">Self-Hosted</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          License Key
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs font-mono bg-neutral-800 text-neutral-200 px-3 py-2 rounded-lg truncate">
            {licenseKey || "—"}
          </code>
          <button
            onClick={copyKey}
            disabled={!licenseKey}
            className="px-3 py-2 text-xs font-medium border border-neutral-700 hover:border-neutral-600 text-neutral-400 hover:text-neutral-200 rounded-lg transition-colors flex-shrink-0 disabled:opacity-40"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Enter this key when the app prompts you on first launch.
        </p>
      </div>

      <a
        href={SELF_HOSTING_SETUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-neutral-200 text-sm font-medium rounded-lg transition-colors self-start"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Setup Guide
      </a>
    </div>
  );
}

// ─── TenantCard ───────────────────────────────────────────────────────────────

function TenantCard({ planName }: { planName?: string | null }) {
  const [tenant, setTenant] = useState<TenantStatus | null>(null);
  const [checking, setChecking] = useState(true);

  async function check() {
    setChecking(true);
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setTenant({ ready: false, reason: "no_token" });
        return;
      }
      const statusUrl = new URL("/api/tenant/status", window.location.href);
      if (planName) statusUrl.searchParams.set("planName", planName);
      const res = await fetch(statusUrl.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as TenantStatus;
      setTenant(data);
    } catch {
      setTenant({ ready: false, reason: "network_error" });
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    void check();
    // planName is stable after subscription loads — only need to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return <TenantSkeleton />;
  }

  if (tenant?.ready && tenant.type === CLIENT_TYPE.SELF_HOSTED) {
    return <SelfHostedCard tenant={tenant} />;
  }

  if (tenant?.ready && tenant.url) {
    // Show container-down warning for hosted tenants in production.
    // In local dev Docker is unavailable so status is always "not found" — skip the warning.
    const isLocalDev =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const containerDown =
      !isLocalDev && tenant.type !== CLIENT_TYPE.SELF_HOSTED && tenant.status !== "running";

    if (containerDown) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-warning-500/20 bg-warning-500/5 h-full">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warning-500 flex-shrink-0" />
            <span className="font-semibold text-warning-500">Workspace unavailable</span>
          </div>
          <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
            Your workspace is provisioned but the container is currently not running. Please contact
            support.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-neutral-200 text-sm font-medium rounded-lg transition-colors"
          >
            Contact support
          </a>
        </div>
      );
    }

    return (
      <a
        href={tenant.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-primary-500/30 bg-primary-500/5 hover:bg-primary-500/10 hover:border-primary-500/60 transition-all cursor-pointer h-full"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-agent-online)] animate-pulse flex-shrink-0" />
          <span className="font-semibold text-primary-300 text-base">Workspace Ready</span>
        </div>
        <span className="text-xs text-neutral-500 font-mono truncate max-w-full px-2 text-center">
          {tenant.url}
        </span>
        <span className="mt-2 inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary-500 group-hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors">
          Open AgentCenter →
        </span>
      </a>
    );
  }

  if (tenant?.reason === PROVISIONING_STATUS.PROVISIONING) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-warning-500/20 bg-warning-500/5 h-full">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-warning-500 animate-pulse flex-shrink-0" />
          <span className="font-semibold text-warning-500">Setting up workspace…</span>
        </div>
        <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
          Your infrastructure is being provisioned. This usually takes 1–5 minutes.
        </p>
        <button
          onClick={() => void check()}
          className="text-sm text-primary-400 hover:text-primary-300 transition-colors mt-1 flex items-center gap-2"
        >
          <Spinner size="sm" />
          Check again
        </button>
      </div>
    );
  }

  if (tenant?.reason === "provisioning_failed") {
    const attempts = tenant.attempts ?? 1;
    const canRetry = attempts < TENANT_MAX_RETRY_ATTEMPTS;

    async function retryProvisioning() {
      setChecking(true);
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
          setChecking(false);
          return;
        }
        await fetch("/api/tenant/retry", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* ignore */
      } finally {
        await check();
      }
    }

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-error-500/20 bg-error-500/5 h-full">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-error-500 flex-shrink-0" />
          <span className="font-semibold text-error-400">Workspace setup failed</span>
        </div>
        {canRetry ? (
          <>
            <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
              Something went wrong during provisioning. You can try checking again — it may have
              recovered.
            </p>
            <button
              onClick={() => void retryProvisioning()}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors mt-1 flex items-center gap-2"
            >
              <Spinner size="sm" />
              Retry (attempt {attempts} of {TENANT_MAX_RETRY_ATTEMPTS})
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
              Workspace could not be provisioned after multiple attempts. Our team needs to take a
              look.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-neutral-200 text-sm font-medium rounded-lg transition-colors"
            >
              Contact support
            </a>
          </>
        )}
      </div>
    );
  }

  if (tenant?.reason === "no_token") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-neutral-700/50 bg-neutral-900/60 h-full">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 flex-shrink-0" />
          <span className="font-medium text-neutral-300">Session missing</span>
        </div>
        <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
          Your session could not be found. Please sign out and sign in again.
        </p>
      </div>
    );
  }

  if (tenant?.reason === "no_workspace") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-neutral-700/50 bg-neutral-900/60 h-full">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 flex-shrink-0" />
          <span className="font-medium text-neutral-300">Workspace not found</span>
        </div>
        <p className="text-sm text-neutral-500 text-center leading-relaxed max-w-xs">
          Your account has no workspace configured. Please contact support.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-neutral-200 text-sm font-medium rounded-lg transition-colors"
        >
          Contact support
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-error-500/20 bg-error-500/5 h-full">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-error-500 flex-shrink-0" />
        <span className="font-medium text-neutral-300">Could not reach workspace</span>
      </div>
      <p className="text-sm text-neutral-500 text-center">
        {tenant?.reason === "network_error"
          ? "Network error — check your connection."
          : "Something went wrong contacting your workspace."}
      </p>
      <button
        onClick={() => void check()}
        className="text-sm text-primary-400 hover:text-primary-300 transition-colors mt-1"
      >
        Retry
      </button>
    </div>
  );
}

// ─── DashboardContent ─────────────────────────────────────────────────────────
// Handles subscription + workspace layout in one place. Uses a 2-col grid when
// subscription is active; collapses to a single card otherwise.

interface AuthUser {
  name?: string;
  email?: string;
}

function DashboardContent({ user }: { user: AuthUser | null }) {
  const { openWorkspaceSettings } = useSaaSAuth();

  const sub = useWorkspaceSubscription();
  const {
    loading,
    hasWorkspace,
    hasSubscription,
    isActive,
    statusResolved,
    isTrialing,
    daysRemaining,
    planName,
    inactiveMessage,
  } = sub;

  const firstName = user?.name?.split(" ")[0] ?? null;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h1>
      </div>

      {/* Cards */}
      {loading || !hasWorkspace || (hasSubscription && !statusResolved) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SubscriptionSkeleton />
          <TenantSkeleton />
        </div>
      ) : !hasSubscription ? (
        <div className="max-w-sm">
          <div className="flex flex-col gap-5 p-6 rounded-2xl border border-neutral-700/50 bg-neutral-900/60">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Subscription
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 flex-shrink-0" />
                <span className="font-medium text-neutral-300">No subscription</span>
              </div>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                Subscribe to a plan to get your AgentCenter workspace provisioned automatically.
              </p>
            </div>
            <button
              onClick={() => openWorkspaceSettings("subscription")}
              className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors self-start"
            >
              Choose a plan
            </button>
          </div>
        </div>
      ) : !isActive ? (
        <div className="max-w-sm">
          <div className="flex flex-col gap-5 p-6 rounded-2xl border border-warning-500/20 bg-warning-500/5">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Subscription
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-warning-500 flex-shrink-0" />
                <span className="font-medium text-neutral-200">Subscription not active</span>
              </div>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{inactiveMessage}</p>
            </div>
            <button
              onClick={() => openWorkspaceSettings("subscription")}
              className="px-4 py-2.5 border border-primary-500/40 hover:border-primary-500/70 text-primary-400 hover:text-primary-300 text-sm font-medium rounded-lg transition-colors self-start"
            >
              Manage subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Subscription card */}
          <div className="flex flex-col gap-5 p-6 rounded-2xl border border-success-500/20 bg-success-500/5">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Subscription
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success-500 flex-shrink-0" />
              <span className="font-semibold text-neutral-100 text-base">
                {isTrialing
                  ? `${planName ?? "Trial"} — ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} left`
                  : `${planName ?? "Active"} · Active`}
              </span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isTrialing
                ? "You're on a free trial. Upgrade any time to keep access after it ends."
                : "Your subscription is active. All features are available."}
            </p>
            <button
              onClick={() => openWorkspaceSettings("subscription")}
              className="px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-neutral-200 text-sm font-medium rounded-lg transition-colors self-start mt-auto"
            >
              Manage plan
            </button>
          </div>

          {/* Workspace card */}
          <TenantCard planName={planName} />
        </div>
      )}
    </div>
  );
}

// ─── DashboardPage ────────────────────────────────────────────────────────────

function DashboardPage() {
  const { isAuthenticated, isLoading, signIn, signOut, user, openWorkspaceSettings } =
    useSaaSAuth();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const openedRef = useRef(false);

  useEffect(() => {
    if (plan && isAuthenticated && !openedRef.current) {
      openedRef.current = true;
      openWorkspaceSettings("subscription");
    }
  }, [plan, isAuthenticated, openWorkspaceSettings]);

  const headerRight = (
    <>
      {isLoading && <HeaderSkeleton />}

      {!isLoading && isAuthenticated && (
        <WorkspaceSwitcher
          trigger={(wsLoading, currentWorkspace) => {
            if (wsLoading) return <HeaderSkeleton />;
            return (
              <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
                {currentWorkspace?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentWorkspace.image}
                    alt={currentWorkspace.name}
                    className="w-7 h-7 rounded-full flex-shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary-500/20 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-400">
                      {(user?.name ?? currentWorkspace?.name ?? "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Hide text on small screens to keep header compact */}
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-xs font-medium text-neutral-200 max-w-[160px] truncate">
                    {user?.name ?? currentWorkspace?.name ?? ""}
                  </span>
                  <span className="text-[11px] text-neutral-500 max-w-[160px] truncate">
                    {user?.email ?? ""}
                  </span>
                </div>
              </div>
            );
          }}
        />
      )}

      {!isLoading && !isAuthenticated && (
        <button
          onClick={() => signIn(window.location.href)}
          className="text-sm px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          Sign in
        </button>
      )}
      {!isLoading && isAuthenticated && (
        <button
          onClick={() => signOut()}
          className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          Sign out
        </button>
      )}
    </>
  );

  const mainContent = (
    <>
      {isLoading && <DashboardSkeleton />}

      {!isLoading && !isAuthenticated && (
        <div className="flex flex-col gap-6 max-w-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Sign in to continue</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Access your AgentCenter workspace and manage your AI infrastructure.
            </p>
          </div>
          <button
            onClick={() => signIn(window.location.href)}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors self-start"
          >
            Sign in
          </button>
        </div>
      )}

      {!isLoading && isAuthenticated && <DashboardContent user={user ?? null} />}
    </>
  );

  return <DashboardFrame headerRight={headerRight} mainContent={mainContent} />;
}

// ─── DashboardFrame ───────────────────────────────────────────────────────────

function DashboardFrame({
  headerRight,
  mainContent,
}: {
  headerRight: React.ReactNode;
  mainContent: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center">
        <div className="flex items-center gap-2.5 flex-1">
          <Image
            src="/favicon-32x32.png"
            alt="AgentCenter"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="font-bold text-lg tracking-tight">AgentCenter</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">{headerRight}</div>
      </header>
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">{mainContent}</div>
      </main>
    </div>
  );
}

function LoadingFrame() {
  return <DashboardFrame headerRight={<HeaderSkeleton />} mainContent={<DashboardSkeleton />} />;
}

// ─── SSR shell ────────────────────────────────────────────────────────────────

function DashboardShell() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingFrame />;

  return <DashboardPage />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFrame />}>
      <DashboardShell />
    </Suspense>
  );
}
