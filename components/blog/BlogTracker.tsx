"use client";

import { useEffect } from "react";
import { trackBlogView } from "@/lib/analytics";

const CONSENT_KEY = "ac_cookie_consent";

function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return parsed?.categories?.analytics === true;
  } catch {
    return false;
  }
}

interface BlogTrackerProps {
  slug: string;
  title: string;
}

export default function BlogTracker({ slug, title }: BlogTrackerProps) {
  useEffect(() => {
    // Fire immediately if consent already granted
    if (hasAnalyticsConsent()) {
      trackBlogView(slug, title);
      return;
    }

    // Otherwise wait for consent to be granted on this page load
    function handleConsent(e: Event) {
      const cats = (e as CustomEvent).detail?.categories;
      if (cats?.analytics) {
        trackBlogView(slug, title);
      }
    }
    window.addEventListener("cookieConsentChange", handleConsent);
    return () => window.removeEventListener("cookieConsentChange", handleConsent);
  }, [slug, title]);

  return null;
}
