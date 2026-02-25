"use client";

import { useCheckout } from "@/lib/hooks/useCheckout";

interface CheckoutButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  const { checkout, isLoading } = useCheckout();

  return (
    <button
      onClick={checkout}
      disabled={isLoading}
      className={className}
      style={{ cursor: isLoading ? "wait" : "pointer" }}
    >
      {children}
    </button>
  );
}
