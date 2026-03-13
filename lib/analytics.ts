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

export function trackSignupComplete() {
  push({ event: "sign_up" });
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str.toLowerCase().trim())
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function trackPlanUpgrade(
  planName: string,
  conversionValue: number,
  email?: string | null
) {
  const payload: Record<string, unknown> = {
    event: "plan_upgrade",
    plan_name: planName,
    conversion_value: conversionValue,
    currency: "USD",
  };
  if (email) {
    payload.email_hashed = await sha256(email);
  }
  push(payload);
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
