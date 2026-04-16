"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@/components/Analytics").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);
const PageTracker = dynamic(
  () => import("@/components/PageTracker").then((m) => ({ default: m.PageTracker })),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent })),
  { ssr: false }
);

export function ClientProviders() {
  return (
    <>
      <Analytics />
      <PageTracker />
      <CookieConsent />
    </>
  );
}
