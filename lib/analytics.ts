/**
 * Analytics tracking via GTM dataLayer.
 *
 * Pushes custom events so GTM can forward to GA4 / any other destination.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push(payload);
}

type CTAPlacement = "hero" | "mid_page" | "bottom";
type CTAAction = "start_trial" | "book_demo" | "subscribe";

export function trackCTA(placement: CTAPlacement, action: CTAAction) {
  push({ event: "cta_click", cta_placement: placement, cta_action: action });
}

export function trackSignUp() {
  push({ event: "sign_up" });
}

export function trackBeginCheckout(itemName: string, plan: string, price: number) {
  push({
    event: "begin_checkout",
    ecommerce: {
      items: [{ item_name: itemName, item_variant: plan, price }],
    },
  });
}

export function trackAffiliateClick() {
  push({ event: "affiliate_click" });
}

export function trackBlogView(slug: string, title: string) {
  push({ event: "blog_view", blog_slug: slug, blog_title: title });
}
