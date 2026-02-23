"use client";

import { useState, useEffect } from "react";
import { STRIPE_LINK } from "@/lib/constants";

declare global {
  interface Window {
    endorsely_referral?: string;
  }
}

/**
 * Helper function to get a cookie value by name
 */
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

/**
 * Returns the Stripe buy link with Endorsely referral tracking appended.
 * Polls for `endorsely_referral` cookie (set by the Endorsely script)
 * and appends it as `client_reference_id` to the Stripe URL.
 */
export function useStripeLink(): string {
  const [link, setLink] = useState(STRIPE_LINK);

  function updateLink() {
    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }

    const referralId = getCookie("endorsely_referral");
    // Check STRIPE_LINK (not link) to avoid checking already-modified link
    if (referralId && !STRIPE_LINK.includes("client_reference_id")) {
      const separator = STRIPE_LINK.includes("?") ? "&" : "?";
      setLink(`${STRIPE_LINK}${separator}client_reference_id=${encodeURIComponent(referralId)}`);
      return true;
    }
    return false;
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scrirptUrl = "https://assets.endorsely.com/endorsely.js";
    // Check if script already exists to avoid duplicates
    const existingScript = document.querySelector(`script[src="${scrirptUrl}"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = scrirptUrl;
    script.async = true;
    script.dataset.endorsely = "89c5a07e-69b4-47fe-b2a7-61d39e5d51f7";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

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
