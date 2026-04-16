import { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancellation Policy for AgentCenter — cancel your subscription any time, no fees, no penalties.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/legal/refund`,
  },
  openGraph: {
    title: "Cancellation Policy | AgentCenter",
    description:
      "Cancellation Policy for AgentCenter — cancel your subscription any time, no fees, no penalties.",
    type: "website",
    url: `${SITE_CONFIG.url}/legal/refund`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    images: [ogImage("legal-refund")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation Policy | AgentCenter",
    description:
      "Cancellation Policy for AgentCenter — cancel your subscription any time, no fees, no penalties.",
    images: [ogImage("legal-refund")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CancellationPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Cancellation Policy", item: `${SITE_CONFIG.url}/legal/refund` },
        ]}
      />
      <article>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Cancellation Policy
          </h1>
          <p className="text-neutral-400">
            <span className="font-medium">Last Updated:</span> April 2026
          </p>
        </header>

        {/* Highlight box */}
        <div className="mb-12 p-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <div>
              <h2 className="text-neutral-100 font-bold text-lg mb-1">Cancel Any Time</h2>
              <p className="text-neutral-400 text-sm">
                Your subscription is month-to-month (or year-to-year). You can cancel at any time
                from your account dashboard — no fees, no penalties.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none space-y-8">
          {[
            {
              title: "No Refunds",
              content:
                "All subscription payments are non-refundable. Because our product is digital and delivered immediately upon subscription, we do not offer refunds for any charges already processed. If you believe there has been an error in billing, please contact us and we will work it out.",
            },
            {
              title: "How to Cancel",
              content:
                "You can cancel your subscription at any time from your account settings. Your access will continue until the end of the current billing period, at which point your subscription will not renew.",
            },
            {
              title: "What Happens After Cancellation",
              content:
                "Once your current billing period ends, your access to AgentCenter will be deactivated and your workspace will be suspended. Your data is retained for 30 days after cancellation to allow export, then deleted.",
            },
            {
              title: "Free Trial Cancellation",
              content:
                "Monthly plans include a 7-day free trial. You can cancel during the trial period without being charged. If you do not cancel before the trial ends, your payment method will be billed for the first month.",
            },
            {
              title: "Reactivation",
              content:
                "You may resubscribe at any time. Reactivation will start a new billing cycle at the current subscription price.",
            },
            {
              title: "Questions",
              content: `If you have any questions about your subscription or cancellation, please contact us at ${CONTACT_EMAIL}.`,
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-neutral-100 mb-4">{section.title}</h2>
              <p className="text-neutral-300 leading-relaxed">{section.content}</p>
            </section>
          ))}

          <hr className="border-neutral-800" />

          <p className="text-neutral-500 text-sm italic">
            This Cancellation Policy is provided for informational purposes. We recommend consulting
            with a qualified attorney to ensure compliance with applicable laws.
          </p>
        </div>
      </article>
    </>
  );
}
