"use client";

import { useCheckout } from "@/lib/hooks/useCheckout";
import { type BillingPlan, DEFAULT_PLAN } from "@/lib/constants";

interface CheckoutButtonProps {
  children: React.ReactNode;
  className?: string;
  plan?: BillingPlan;
}

export function CheckoutButton({ children, className, plan = DEFAULT_PLAN }: CheckoutButtonProps) {
  const { checkout, isLoading } = useCheckout();

  return (
    <button
      onClick={() => checkout(plan)}
      disabled={isLoading}
      className={className}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
    >
      {children}
    </button>
  );
}
