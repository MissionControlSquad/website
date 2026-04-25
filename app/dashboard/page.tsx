"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  useSaaSAuth,
  WorkspaceSwitcher,
  WhenSubscription,
  WhenNoSubscription,
} from "@buildbase/sdk/react";

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-neutral-400">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}

function AuthedDashboard() {
  const { user, signOut, openWorkspaceSettings } = useSaaSAuth();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const openedRef = useRef(false);

  useEffect(() => {
    if (plan && !openedRef.current) {
      openedRef.current = true;
      openWorkspaceSettings("subscription");
    }
  }, [plan, openWorkspaceSettings]);

  const firstName = user?.name?.split(" ")[0] ?? null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top bar */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg tracking-tight">AgentCenter</span>
          <WorkspaceSwitcher
            trigger={(isLoading, currentWorkspace) => {
              if (isLoading) {
                return <div className="h-8 w-40 bg-neutral-800 animate-pulse rounded-lg" />;
              }
              return (
                <div className="flex items-center gap-2 border border-neutral-700 rounded-lg px-3 py-1.5 hover:border-neutral-600 cursor-pointer text-sm transition-colors">
                  <span className="text-neutral-200">
                    {currentWorkspace?.name ?? "Choose workspace"}
                  </span>
                  <svg
                    className="w-3 h-3 text-neutral-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              );
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="text-sm text-neutral-500 hidden sm:block">{user.email}</span>
          )}
          <button
            onClick={() => openWorkspaceSettings("general")}
            className="text-sm px-3 py-1.5 border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
          >
            Settings
          </button>
          <button
            onClick={() => signOut()}
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-3">
          {firstName ? `Welcome back, ${firstName}!` : "Welcome back!"}
        </h1>
        <p className="text-neutral-400 mb-10">Your AgentCenter workspace is ready.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <WhenNoSubscription>
            <div className="col-span-2 rounded-xl border border-primary-500/30 bg-primary-500/5 p-6">
              <p className="text-neutral-300 mb-4 text-sm">
                You don&apos;t have an active plan yet. Subscribe to unlock the full AgentCenter
                dashboard.
              </p>
              <button
                onClick={() => openWorkspaceSettings("subscription")}
                className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Choose a plan
              </button>
            </div>
          </WhenNoSubscription>

          <WhenSubscription>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left">
              <h2 className="font-semibold text-neutral-100 mb-1">Subscription</h2>
              <p className="text-sm text-neutral-400 mb-4">Manage your plan and billing details.</p>
              <button
                onClick={() => openWorkspaceSettings("subscription")}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                Manage subscription →
              </button>
            </div>
          </WhenSubscription>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left">
            <h2 className="font-semibold text-neutral-100 mb-1">Workspace</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Configure name, members, and permissions.
            </p>
            <button
              onClick={() => openWorkspaceSettings("general")}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Open settings →
            </button>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left">
            <h2 className="font-semibold text-neutral-100 mb-1">Team</h2>
            <p className="text-sm text-neutral-400 mb-4">Invite teammates and manage roles.</p>
            <button
              onClick={() => openWorkspaceSettings("users")}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Manage team →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardPage() {
  const { isAuthenticated, isLoading, signIn } = useSaaSAuth();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing");

  if (isLoading) {
    return <LoadingSpinner label="Loading…" />;
  }

  if (!isAuthenticated) {
    const planLabel = plan
      ? `${plan.charAt(0).toUpperCase() + plan.slice(1)}${billing ? ` (${billing})` : ""}`
      : null;

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-4 max-w-sm">
          <h1 className="text-2xl font-bold text-neutral-100">Sign in to continue</h1>
          {planLabel ? (
            <p className="text-neutral-400">
              Sign in to subscribe to the{" "}
              <span className="text-primary-400 font-medium">{planLabel}</span> plan.
            </p>
          ) : (
            <p className="text-neutral-400">
              You need to be signed in to access the AgentCenter dashboard.
            </p>
          )}
          <button
            onClick={() => signIn(window.location.href)}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return <AuthedDashboard />;
}

function DashboardShell() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingSpinner label="Loading…" />;
  }

  return <DashboardPage />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading…" />}>
      <DashboardShell />
    </Suspense>
  );
}
