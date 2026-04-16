"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "ac_cookie_consent";

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return false;
  try {
    const parsed = JSON.parse(stored);
    return parsed?.categories?.analytics === true;
  } catch {
    return false;
  }
}

function pushPageView(pathname: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: pathname,
    page_title: document.title,
  });
}

/**
 * Fires a page_view event to GTM/dataLayer on every SPA route change,
 * but only when analytics consent has been granted.
 * GTM's built-in "All Pages" trigger only fires on hard page loads —
 * this covers Next.js client-side navigation.
 */
export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    pushPageView(pathname);
  }, [pathname]);

  return null;
}
