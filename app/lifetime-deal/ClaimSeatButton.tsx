"use client";

import { useState } from "react";
import { trackBeginCheckout } from "@/lib/analytics";

interface ClaimSeatButtonProps {
  tierName: string;
  highlight: boolean;
  active: boolean;
}

export default function ClaimSeatButton({ tierName, highlight, active }: ClaimSeatButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (isLoading || !active) return;
    setIsLoading(true);
    trackBeginCheckout("AgentCenter Lifetime Deal", tierName, 0);

    try {
      const res = await fetch("/api/create-lifetime-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierName }),
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
      console.error("Checkout error:", err);
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !active}
      className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition disabled:opacity-60 ${
        highlight
          ? "bg-primary-500 text-neutral-950 hover:bg-primary-400"
          : "border border-neutral-700 text-neutral-200 hover:border-primary-500 hover:text-primary-400"
      }`}
    >
      {isLoading ? "Redirecting..." : "Claim Seat →"}
    </button>
  );
}
