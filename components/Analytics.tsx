"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { updateConsentGranted } from "@/lib/analytics";
import { buildGtmInitSnippet, buildGtmNoscriptUrl, GTM_ID } from "@/lib/gtm";
import type { ConsentCategories } from "@/lib/analytics";

const CONSENT_KEY = "ac_cookie_consent";

const ENDORSELY_SITE_ID = "89c5a07e-69b4-47fe-b2a7-61d39e5d51f7";
const PLAUSIBLE_DOMAIN = "agentcenter.cloud";

function getStoredCategories(): ConsentCategories | null {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (parsed?.categories) return parsed.categories as ConsentCategories;
  } catch {
    // ignore
  }
  return null;
}

export function Analytics() {
  // Lazy initializers read localStorage once on mount (client-only, loaded via dynamic ssr:false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(() => {
    const cats = getStoredCategories();
    return cats?.analytics === true;
  });
  const [affiliateEnabled, setAffiliateEnabled] = useState<boolean>(() => {
    const cats = getStoredCategories();
    return cats?.affiliate === true;
  });

  useEffect(() => {
    // Fire the initial consent update to GTM (no setState here)
    const cats = getStoredCategories();
    if (cats?.analytics) updateConsentGranted(cats);

    function handleConsent(e: Event) {
      const detail = (e as CustomEvent).detail;
      const updated: ConsentCategories | null = detail?.categories ?? null;
      if (updated) {
        if (updated.analytics) {
          updateConsentGranted(updated);
          setAnalyticsEnabled(true);
        }
        if (updated.affiliate) setAffiliateEnabled(true);
      }
    }
    window.addEventListener("cookieConsentChange", handleConsent);
    return () => window.removeEventListener("cookieConsentChange", handleConsent);
  }, []);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {analyticsEnabled && GTM_ID && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {buildGtmInitSnippet(GTM_ID)}
          </Script>
          <noscript>
            <iframe
              src={buildGtmNoscriptUrl(GTM_ID)}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
      {analyticsEnabled && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
      )}
      {affiliateEnabled && (
        <Script
          src="https://assets.endorsely.com/endorsely.js"
          data-endorsely={ENDORSELY_SITE_ID}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
