"use client";

import Script from "next/script";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GAD_ID = process.env.NEXT_PUBLIC_GAD_ID;

/**
 * Google Analytics 4 + Google Ads gtag.js
 * Loads alongside GTM for direct conversion tracking.
 * Set NEXT_PUBLIC_GA4_ID and NEXT_PUBLIC_GAD_ID env vars.
 */
export function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
          ${GAD_ID ? `gtag('config', '${GAD_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
