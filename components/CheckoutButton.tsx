"use client";

import { useCheckout } from "@/lib/hooks/useCheckout";
import { type BillingPlan, type PlanKey, DEFAULT_PLAN, DEFAULT_TIER } from "@/lib/constants";

interface CheckoutButtonProps {
  children: React.ReactNode;
  className?: string;
  tier?: PlanKey;
  billing?: BillingPlan;
}

export function CheckoutButton({
  children,
  className,
  tier = DEFAULT_TIER,
  billing = DEFAULT_PLAN,
}: CheckoutButtonProps) {
  const { checkout, isLoading } = useCheckout();

  return (
    <button
      onClick={() => checkout({ tier, billing })}
      disabled={isLoading}
      className={className}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
    >
      {children}
    </button>
  );
}
