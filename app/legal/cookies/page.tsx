import { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for AgentCenter. Learn about the cookies and tracking technologies we use, their purpose, and how to manage your preferences.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/legal/cookies`,
  },
  openGraph: {
    title: "Cookie Policy | AgentCenter",
    description:
      "Cookie Policy for AgentCenter. Learn about the cookies and tracking technologies we use, their purpose, and how to manage your preferences.",
    type: "website",
    url: `${SITE_CONFIG.url}/legal/cookies`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    images: [ogImage("legal-cookies")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | AgentCenter",
    description:
      "Cookie Policy for AgentCenter. Learn about the cookies and tracking technologies we use, their purpose, and how to manage your preferences.",
    images: [ogImage("legal-cookies")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const cookies = [
  // Essential
  {
    category: "Essential",
    name: "session, auth",
    provider: "AgentCenter",
    purpose:
      "Maintains your authenticated session and keeps you logged in as you navigate the dashboard.",
    type: "Cookie",
    expiry: "Session / 30 days",
    canDisable: false,
  },
  // Analytics
  {
    category: "Analytics",
    name: "_ga, _ga_*",
    provider: "Google Analytics (GA4)",
    purpose:
      "Distinguishes unique users and sessions. Used to compile aggregate traffic and behavioural reports.",
    type: "Cookie",
    expiry: "2 years",
    canDisable: true,
  },
  {
    category: "Analytics",
    name: "dataLayer events",
    provider: "Google Tag Manager",
    purpose:
      "Passes event data (page views, CTA clicks) to Google Analytics and other connected tags.",
    type: "JS variable",
    expiry: "Session",
    canDisable: true,
  },
  {
    category: "Analytics",
    name: "plausible.io",
    provider: "Plausible Analytics",
    purpose:
      "Cookieless, privacy-first analytics. Counts page views and referrers without storing personal data or setting cookies.",
    type: "No cookie",
    expiry: "N/A",
    canDisable: false,
  },
  // Behaviour / UX
  {
    category: "Behaviour / UX",
    name: "_hjSessionUser_*, _hjSession_*, _hjid",
    provider: "Hotjar",
    purpose:
      "Records anonymised session replays, heatmaps, and scroll maps to help us understand how users interact with pages. Payment fields and passwords are never recorded.",
    type: "Cookie",
    expiry: "1 year (_hjid) / 30 min (_hjSession_*)",
    canDisable: true,
  },
  // CRM / Chat
  {
    category: "CRM / Chat",
    name: "__hstc, hubspotutk, __hssc, __hssrc",
    provider: "HubSpot",
    purpose:
      "Powers the live chat widget and tracks contact interactions. Links chat sessions and form submissions to HubSpot CRM records for support follow-up.",
    type: "Cookie",
    expiry: "13 months (__hstc) / Session (__hssc, __hssrc)",
    canDisable: true,
  },
  // Marketing
  {
    category: "Marketing",
    name: "_gcl_aw, _gcl_dc, _gcl_gb",
    provider: "Google Ads",
    purpose:
      "Tracks ad click data for conversion measurement and links clicks to subsequent actions on the site. Used for remarketing audience creation.",
    type: "Cookie",
    expiry: "90 days",
    canDisable: true,
  },
  // Affiliate
  {
    category: "Affiliate",
    name: "endorsely_referral",
    provider: "Endorsely",
    purpose:
      "Stores an affiliate referral ID when you arrive via an affiliate link (e.g. a URL containing ?via=). Used to attribute purchases to the referring affiliate and calculate commission.",
    type: "Cookie + localStorage",
    expiry: "90 days",
    canDisable: true,
  },
  // Payment
  {
    category: "Payment",
    name: "__stripe_mid, __stripe_sid",
    provider: "Stripe",
    purpose: "Fraud prevention and secure payment processing. Set during checkout sessions only.",
    type: "Cookie",
    expiry: "1 year (__stripe_mid) / Session (__stripe_sid)",
    canDisable: false,
  },
];

const categoryOrder = [
  "Essential",
  "Analytics",
  "Behaviour / UX",
  "CRM / Chat",
  "Marketing",
  "Affiliate",
  "Payment",
];

const categoryColors: Record<string, string> = {
  Essential: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  Analytics: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  "Behaviour / UX": "bg-pink-500/10 border-pink-500/30 text-pink-400",
  "CRM / Chat": "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  Marketing: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  Affiliate: "bg-green-500/10 border-green-500/30 text-green-400",
  Payment: "bg-primary-500/10 border-primary-500/30 text-primary-400",
};

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Cookie Policy", item: `${SITE_CONFIG.url}/legal/cookies` },
        ]}
      />
      <article>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Cookie Policy</h1>
          <p className="text-neutral-400">
            <span className="font-medium">Last Updated:</span> April 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">1. What Are Cookies</h2>
            <p className="text-neutral-300 leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. We also
              use related technologies including localStorage and tracking pixels. Together these
              allow us to operate the website, measure performance, run advertising, and track
              affiliate referrals.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">2. How We Use Cookies</h2>
            <p className="text-neutral-300 leading-relaxed">
              We use cookies and similar technologies for five purposes: keeping your session active
              (essential), measuring site usage (analytics), running and measuring advertising
              campaigns (marketing), attributing affiliate referrals for commission payments
              (affiliate), and securing checkout (payment).
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">3. Cookie Categories</h2>
            <div className="space-y-3">
              {[
                {
                  name: "Essential",
                  desc: "Required for core website and dashboard functionality (authentication, session management). Cannot be disabled.",
                },
                {
                  name: "Analytics",
                  desc: "Help us understand how visitors interact with the site. Used to improve content and performance. Can be disabled.",
                },
                {
                  name: "Behaviour / UX",
                  desc: "Set by Hotjar to record anonymised session replays and heatmaps. Payment fields and passwords are never recorded. Can be disabled.",
                },
                {
                  name: "CRM / Chat",
                  desc: "Set by HubSpot to power the live chat widget and track contact interactions for support follow-up. Can be disabled.",
                },
                {
                  name: "Marketing",
                  desc: "Set by advertising platforms (Google Ads) to track conversions and enable remarketing. Can be disabled.",
                },
                {
                  name: "Affiliate",
                  desc: "Set by Endorsely to store a referral ID when you arrive via an affiliate link. Retained for 90 days for commission attribution. Can be disabled.",
                },
                {
                  name: "Payment",
                  desc: "Set by Stripe for fraud prevention during checkout. Required for secure payment processing.",
                },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold ${
                        categoryColors[cat.name] ??
                        "bg-neutral-800 border-neutral-700 text-neutral-400"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-sm">{cat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">4. Cookie Reference Table</h2>
            <p className="text-neutral-400 text-sm mb-4">
              A full list of all cookies and tracking technologies we use:
            </p>
            <div className="space-y-3">
              {categoryOrder.map((cat) => {
                const catCookies = cookies.filter((c) => c.category === cat);
                return (
                  <div key={cat}>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${
                        categoryColors[cat] ?? "bg-neutral-800 border-neutral-700 text-neutral-400"
                      }`}
                    >
                      {cat}
                    </div>
                    <div className="space-y-2">
                      {catCookies.map((c) => (
                        <div
                          key={c.name}
                          className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-sm"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <code className="text-primary-400 font-mono text-xs">{c.name}</code>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                              <span>{c.type}</span>
                              <span>·</span>
                              <span>{c.expiry}</span>
                              <span>·</span>
                              <span
                                className={c.canDisable ? "text-yellow-400" : "text-neutral-500"}
                              >
                                {c.canDisable ? "Optional" : "Required"}
                              </span>
                            </div>
                          </div>
                          <div className="text-neutral-500 text-xs mb-1">{c.provider}</div>
                          <p className="text-neutral-400">{c.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              5. Managing and Disabling Cookies
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You can control or disable optional cookies through several methods:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Browser Settings",
                  desc: "Most browsers allow you to block or delete cookies. Note that blocking essential or payment cookies may break authentication and checkout functionality.",
                },
                {
                  title: "Google Ads Opt-Out",
                  desc: "Opt out of personalised Google advertising at adssettings.google.com or install the Google Analytics Opt-out Browser Add-on.",
                },
                {
                  title: "Hotjar Opt-Out",
                  desc: "Disable Hotjar session recording at hotjar.com/legal/compliance/opt-out. This stops session replays and heatmap recording on your device.",
                },
                {
                  title: "HubSpot Opt-Out",
                  desc: "Opt out of HubSpot tracking at legal.hubspot.com/privacy-policy. Note that disabling HubSpot cookies will deactivate the live chat widget.",
                },
                {
                  title: "Endorsely Affiliate Cookie",
                  desc: "The endorsely_referral cookie is only set if you arrive via an affiliate referral link. You can delete it via your browser settings or clear localStorage at any time.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800"
                >
                  <h3 className="text-neutral-100 font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-neutral-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">6. Future Services</h2>
            <p className="text-neutral-300 leading-relaxed">
              We may add or remove third-party services over time. When we do, we will update this
              Cookie Policy and the &quot;Last Updated&quot; date above. We recommend checking this
              page periodically for changes.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">7. Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed">
              If you have questions about our use of cookies, please contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <hr className="border-neutral-800" />

          <p className="text-neutral-500 text-sm italic">
            This Cookie Policy is provided for informational purposes. We recommend consulting with
            a qualified attorney to ensure compliance with applicable laws.
          </p>
        </div>
      </article>
    </>
  );
}
