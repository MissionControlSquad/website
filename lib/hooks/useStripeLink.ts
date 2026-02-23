"use client";

import { useState, useEffect } from "react";
import { STRIPE_LINK } from "@/lib/constants";

declare global {
  interface Window {
    endorsely_referral?: string;
  }
}

/**
 * Returns the Stripe buy link with Endorsely referral tracking appended.
 * Polls for `window.endorsely_referral` (set by the Endorsely external script)
 * and appends it as `client_reference_id` to the Stripe URL.
 */
export function useStripeLink(): string {
  const [link, setLink] = useState(STRIPE_LINK);

  useEffect(() => {
    function updateLink() {
      const referralId = window.endorsely_referral;
      if (referralId && !STRIPE_LINK.includes("client_reference_id")) {
        const separator = STRIPE_LINK.includes("?") ? "&" : "?";
        setLink(`${STRIPE_LINK}${separator}client_reference_id=${encodeURIComponent(referralId)}`);
        return true;
      }
      return false;
    }

    // Check immediately
    if (updateLink()) return;

    // Poll every 500ms for up to 5 seconds (Endorsely script may load async)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (updateLink() || attempts >= 10) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return link;
}
