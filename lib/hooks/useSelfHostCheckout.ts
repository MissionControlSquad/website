"use client";

import { useState, useCallback } from "react";

export type SelfHostPlan = "monthly" | "yearly";

export function useSelfHostCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const checkout = useCallback(
    async (plan: SelfHostPlan = "monthly") => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const res = await fetch("/api/create-selfhost-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to create checkout session");
        }

        const { url } = await res.json();
        if (url) {
          window.location.href = url;
          return;
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Self-host checkout error:", err);
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return { checkout, isLoading };
}
