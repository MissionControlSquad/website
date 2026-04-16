import { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG, AFFILIATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Affiliate & Advertising Disclosure",
  description:
    "Affiliate and advertising disclosure for AgentCenter. Learn about our affiliate programme, outbound links, advertising partnerships, and FTC compliance.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/legal/disclosure`,
  },
  openGraph: {
    title: "Affiliate & Advertising Disclosure | AgentCenter",
    description:
      "Affiliate and advertising disclosure for AgentCenter. Learn about our affiliate programme, outbound links, advertising partnerships, and FTC compliance.",
    type: "website",
    url: `${SITE_CONFIG.url}/legal/disclosure`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    images: [ogImage("legal-disclosure")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate & Advertising Disclosure | AgentCenter",
    description:
      "Affiliate and advertising disclosure for AgentCenter. Learn about our affiliate programme, outbound links, advertising partnerships, and FTC compliance.",
    images: [ogImage("legal-disclosure")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const commissionPct = `${(AFFILIATE.commissionRate * 100).toFixed(0)}%`;

export default function DisclosurePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          {
            name: "Affiliate & Advertising Disclosure",
            item: `${SITE_CONFIG.url}/legal/disclosure`,
          },
        ]}
      />
      <article>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Affiliate &amp; Advertising Disclosure
          </h1>
          <p className="text-neutral-400">
            <span className="font-medium">Last Updated:</span> April 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              Our Affiliate Programme (Endorsely)
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              AgentCenter (operated by <strong className="text-neutral-100">Jagodana LLC</strong>)
              runs its own affiliate programme via{" "}
              <strong className="text-neutral-100">Endorsely</strong>. Individuals who join our
              affiliate programme and refer customers to us earn a{" "}
              <strong className="text-neutral-100">{commissionPct} recurring commission</strong> on
              every subscription payment made by their referred customers, for as long as those
              customers remain subscribed.
            </p>
            <p className="text-neutral-300 leading-relaxed mt-3">
              If you arrived at this website via a link containing{" "}
              <code className="text-primary-400">?via=</code>, you were referred by one of our
              affiliates. We track referrals using an{" "}
              <code className="text-primary-400">endorsely_referral</code> cookie with a 90-day
              attribution window. This tracking does not affect the price you pay — our prices are
              the same regardless of referral source.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Outbound Affiliate Links</h2>
            <p className="text-neutral-300 leading-relaxed">
              Content on AgentCenter (including blog posts, documentation, and comparison pages) may
              contain affiliate links to third-party tools and products we recommend. When you click
              one of these links and make a purchase, we may receive a commission at no additional
              cost to you. We only recommend products and services that we genuinely believe add
              value to AI developers and teams. Our editorial opinions are not influenced by
              commission rates.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              Advertising and Remarketing
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              We run paid advertising campaigns on{" "}
              <strong className="text-neutral-100">Google Ads</strong>. This platform may serve you
              ads for AgentCenter after you visit our website (remarketing), based on cookies and
              pixels set on your device. This is standard practice in digital advertising.
            </p>
            <p className="text-neutral-300 leading-relaxed mt-3">
              We also use <strong className="text-neutral-100">Google Analytics</strong>,{" "}
              <strong className="text-neutral-100">Plausible</strong>, and{" "}
              <strong className="text-neutral-100">Hotjar</strong> to measure website performance
              and user behaviour. Hotjar records anonymised session replays and heatmaps — payment
              fields and passwords are never captured. We use{" "}
              <strong className="text-neutral-100">HubSpot</strong> to power our live chat widget
              and manage support contacts. See our{" "}
              <a
                href="/legal/cookies"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Cookie Policy
              </a>{" "}
              for full details on what is tracked and how to opt out.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">AI Tool Recommendations</h2>
            <p className="text-neutral-300 leading-relaxed">
              We may recommend specific AI tools and platforms within our documentation, blog posts,
              and comparison guides. Some links may be affiliate links. We will always indicate when
              this is the case. Our recommendations are based on genuine product quality and
              relevance to AI developers, not commission rates.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Earnings Disclaimer</h2>
            <p className="text-neutral-300 leading-relaxed">
              Any income or earnings examples shared on this website — including in our affiliate
              programme calculator — are estimates of potential earnings. They are for illustrative
              purposes only. There is no guarantee that you will achieve these results. Actual
              earnings depend on your audience, marketing efforts, referral activity, and other
              factors beyond our control.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">No Professional Advice</h2>
            <p className="text-neutral-300 leading-relaxed">
              Content on AgentCenter is for informational purposes only and does not constitute
              legal, financial, tax, or professional advice. Always consult qualified professionals
              for advice specific to your situation.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">FTC Compliance</h2>
            <p className="text-neutral-300 leading-relaxed">
              In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that:
              (1) we operate an affiliate programme and pay commissions to affiliates who refer
              customers to us; (2) we may include affiliate links in our content and earn
              commissions when you purchase through those links; and (3) we run paid advertising on
              Google. Where we review or recommend a product, any material connection is disclosed.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Testimonials</h2>
            <p className="text-neutral-300 leading-relaxed">
              Testimonials on this website are from real customers. Individual results may vary.
              Testimonials are not necessarily representative of what all customers will experience
              with our product.
            </p>
          </section>

          <hr className="border-neutral-800" />

          <section>
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed">
              If you have questions about this disclosure, please contact us at{" "}
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
            This disclosure is provided for informational purposes. We recommend consulting with a
            qualified attorney to ensure compliance with applicable laws including FTC guidelines.
          </p>
        </div>
      </article>
    </>
  );
}
