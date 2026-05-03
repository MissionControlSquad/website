"use client";

import { useEffect, useRef } from "react";
import { useSaaSWorkspaces, useSubscriptionContext, useTrialStatus } from "@buildbase/sdk/react";
import { SubscriptionStatus } from "@buildbase/sdk";
import type { SubscriptionStatusType } from "@buildbase/sdk";

// ─── Status messages for each non-active state ───────────────────────────────

const INACTIVE_STATUS_MESSAGES: Partial<Record<SubscriptionStatusType, string>> = {
  [SubscriptionStatus.Canceled]:
    "Your subscription has been canceled. Resubscribe to restore access.",
  [SubscriptionStatus.PastDue]: "Your payment is past due. Update your billing to restore access.",
  [SubscriptionStatus.Paused]: "Your subscription is paused. Resume it to restore access.",
  [SubscriptionStatus.Incomplete]:
    "Your subscription setup is incomplete. Please check your billing.",
  [SubscriptionStatus.Unpaid]:
    "Your subscription has an unpaid invoice. Update your billing to restore access.",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface WorkspaceSubscriptionState {
  /** True while workspace OR subscription data is still loading */
  loading: boolean;
  /** The workspace object from the SDK (null if not yet loaded) */
  currentWorkspaceId: string | null;
  /** Whether a workspace has been resolved */
  hasWorkspace: boolean;
  /** Whether the workspace has any subscription record */
  hasSubscription: boolean;
  /** Whether the subscription is active (active or trialing) */
  isActive: boolean;
  /** False if subscription exists but status field hasn't resolved yet */
  statusResolved: boolean;
  /** The raw subscription status from the SDK enum */
  subscriptionStatus: SubscriptionStatusType | null;
  /** Plan name for display — null if plan data hasn't loaded yet */
  planName: string | null;
  /** Trial info */
  isTrialing: boolean;
  daysRemaining: number;
  trialEndsAt: Date | null;
  isTrialEnding: boolean;
  /** Human-readable reason for an inactive subscription; null when active or no subscription */
  inactiveMessage: string | null;
  /** Fetch error from the subscription context, if any */
  error: string | null;
  /** Manually refetch subscription — call this after returning from Stripe checkout */
  refetch: () => Promise<void>;
}

/**
 * Combines workspace + subscription + trial state into a single object.
 *
 * - Automatically waits for workspace to load before reading subscription
 * - Refetches subscription when the tab regains focus (prevents stale data
 *   after the user returns from Stripe checkout or a long background tab)
 * - Watches for workspace switches and triggers a refetch via the SDK context
 */
export function useWorkspaceSubscription(): WorkspaceSubscriptionState {
  const { currentWorkspace, loading: wsLoading } = useSaaSWorkspaces();
  const { response, loading: subLoading, error, refetch } = useSubscriptionContext();
  const { isTrialing, daysRemaining, trialEndsAt, isTrialEnding } = useTrialStatus();

  // ── Keep a stable ref to refetch so effects don't need it as a dep ─────────
  const refetchRef = useRef(refetch);
  useEffect(() => {
    refetchRef.current = refetch;
  });

  // ── Refetch on page focus (user returns from Stripe / background tab) ──────
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refetchRef.current();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // ── Refetch when the workspace switches ───────────────────────────────────
  // useSubscriptionContext already does this internally, but an explicit refetch
  // ensures the data is fresh immediately after onWorkspaceChange fires.
  const prevWorkspaceId = useRef<string | null>(null);
  useEffect(() => {
    const id = currentWorkspace?._id ?? null;
    if (id && id !== prevWorkspaceId.current) {
      prevWorkspaceId.current = id;
      void refetchRef.current();
    }
  }, [currentWorkspace?._id]);

  // ── Derived state ─────────────────────────────────────────────────────────
  const loading = wsLoading || subLoading;
  const sub = response?.subscription ?? null;
  const plan = response?.plan ?? null;
  // plan → planVersion.name → plan.slug — avoids a hardcoded fallback
  const planName = plan?.name ?? response?.planVersion?.name ?? plan?.slug ?? null;
  const subscriptionStatus = sub?.subscriptionStatus ?? null;

  // If subscription exists but status field is missing, treat as still loading
  // (guards against a shape mismatch between SDK types and actual runtime data)
  const statusResolved = !!sub && subscriptionStatus !== null;

  const isActive =
    subscriptionStatus === SubscriptionStatus.Active ||
    subscriptionStatus === SubscriptionStatus.Trialing;

  const inactiveMessage =
    statusResolved && !isActive
      ? (INACTIVE_STATUS_MESSAGES[subscriptionStatus!] ??
        `Your subscription status is "${subscriptionStatus}". Please check your billing.`)
      : null;

  return {
    loading,
    currentWorkspaceId: currentWorkspace?._id ?? null,
    hasWorkspace: !!currentWorkspace,
    hasSubscription: !!sub,
    isActive,
    statusResolved,
    subscriptionStatus,
    planName,
    isTrialing,
    daysRemaining,
    trialEndsAt,
    isTrialEnding,
    inactiveMessage,
    error,
    refetch,
  };
}
