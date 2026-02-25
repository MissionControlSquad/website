/**
 * Conversion tracking helpers for Google Ads and Meta Pixel.
 *
 * Environment variables:
 * - NEXT_PUBLIC_GAD_ID: Google Ads account ID (e.g., AW-XXXXXXXXXX)
 * - NEXT_PUBLIC_GAD_SIGNUP_LABEL: Google Ads conversion label for signup
 * - NEXT_PUBLIC_GAD_PURCHASE_LABEL: Google Ads conversion label for purchase
 * - NEXT_PUBLIC_META_PIXEL_ID: Meta Pixel ID (presence enables fbq calls)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire Google Ads signup conversion + Meta Lead event */
export function trackSignupConversion() {
  const gadId = process.env.NEXT_PUBLIC_GAD_ID;
  const signupLabel = process.env.NEXT_PUBLIC_GAD_SIGNUP_LABEL;

  if (typeof window !== "undefined") {
    // Google Ads conversion
    if (window.gtag && gadId && signupLabel) {
      window.gtag("event", "conversion", {
        send_to: `${gadId}/${signupLabel}`,
      });
    }

    // Meta Pixel: Lead event
    if (window.fbq) {
      window.fbq("track", "Lead");
    }
  }
}

/** Fire Google Ads purchase conversion + Meta Purchase event */
export function trackPurchaseConversion(options?: {
  value?: number;
  currency?: string;
  transactionId?: string;
}) {
  const gadId = process.env.NEXT_PUBLIC_GAD_ID;
  const purchaseLabel = process.env.NEXT_PUBLIC_GAD_PURCHASE_LABEL;
  const value = options?.value ?? 79.0;
  const currency = options?.currency ?? "USD";

  if (typeof window !== "undefined") {
    // Google Ads conversion
    if (window.gtag && gadId && purchaseLabel) {
      window.gtag("event", "conversion", {
        send_to: `${gadId}/${purchaseLabel}`,
        value,
        currency,
        transaction_id: options?.transactionId || "",
      });
    }

    // Meta Pixel: Purchase event
    if (window.fbq) {
      window.fbq("track", "Purchase", { value, currency });
    }
  }
}
