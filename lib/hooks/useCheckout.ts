"use client";

import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    endorsely_referral?: string;
  }
}

const STORAGE_KEY = "endorsely_referral";

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
 * Reads the Endorsely referral from multiple sources (cookie, window, localStorage)
 * and persists it to localStorage so it survives page reloads and Safari ITP.
 */
function readReferral(): string | null {
  const fromCookie = getCookie("endorsely_referral");
  const fromWindow = typeof window !== "undefined" ? window.endorsely_referral : undefined;
  const fromStorage =
    typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

  const referral = fromCookie || fromWindow || fromStorage || null;

  // Persist to localStorage so it survives cookie expiry / ITP
  if (referral && typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, referral);
  }

  return referral;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [referral, setReferral] = useState<string | null>(null);

  // Load Endorsely script
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scriptUrl = "https://assets.endorsely.com/endorsely.js";
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.dataset.endorsely = "89c5a07e-69b4-47fe-b2a7-61d39e5d51f7";
    document.head.appendChild(script);
  }, []);

  // Poll for Endorsely referral from cookie / window / localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      const id = readReferral();
      if (id) {
        setReferral(id);
        return true;
      }
      return false;
    };

    if (check()) return;

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (check() || attempts >= 10) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const checkout = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referral: referral || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setIsLoading(false);
    }
  }, [isLoading, referral]);

  return { checkout, isLoading };
}
