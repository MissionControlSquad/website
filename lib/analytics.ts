/**
 * Analytics tracking via GTM dataLayer.
 *
 * Pushes custom events so GTM can forward to GA4 / any other destination.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export interface ConsentCategories {
  analytics: boolean;
  marketing: boolean;
  behaviour: boolean;
  crm: boolean;
  affiliate: boolean;
}

/**
 * Push a GTM Consent Mode v2 update after the user makes a cookie choice.
 * Uses window.gtag for the standard Consent Mode v2 API, then pushes
 * custom signals for Hotjar/HubSpot/Endorsely GTM tags.
 */
export function updateConsentGranted(cats: ConsentCategories) {
  if (typeof window === "undefined") return;
  // Standard Consent Mode v2 update
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: cats.analytics ? "granted" : "denied",
      ad_storage: cats.marketing ? "granted" : "denied",
      ad_user_data: cats.marketing ? "granted" : "denied",
      ad_personalization: cats.marketing ? "granted" : "denied",
    });
  }
  // Custom GTM signals for Hotjar, HubSpot, Endorsely tags
  push({
    event: "consent_update",
    hotjar_enabled: cats.behaviour,
    hubspot_enabled: cats.crm,
    endorsely_enabled: cats.affiliate,
  });
}

function hasAnalyticsConsent(): boolean {
  if (typeof localStorage === "undefined") return false;
  try {
    const stored = localStorage.getItem("ac_cookie_consent");
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return parsed?.categories?.analytics === true;
  } catch {
    return false;
  }
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

type CTAPlacement = "hero" | "mid_page" | "bottom";
type CTAAction = "get_started" | "book_demo" | "subscribe";

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
