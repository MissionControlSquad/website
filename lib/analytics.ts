/**
 * CTA click tracking via GTM dataLayer.
 *
 * Pushes a custom event so GTM can forward to GA4 / any other destination.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type CTAPlacement = "hero" | "mid_page" | "bottom";
type CTAAction = "start_trial" | "book_demo" | "subscribe";

export function trackCTA(placement: CTAPlacement, action: CTAAction) {
  if (typeof window === "undefined" || !window.dataLayer) return;

  window.dataLayer.push({
    event: "cta_click",
    cta_placement: placement,
    cta_action: action,
  });
}
