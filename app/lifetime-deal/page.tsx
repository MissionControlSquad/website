import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lifetime Deal — Own AgentCenter Forever | Starting at $259",
  description:
    "Limited to 100 seats. Get lifetime access to AgentCenter — the AI agent platform where agents do real work. Starts at $259, price increases every 25 seats.",
  alternates: { canonical: `${SITE_CONFIG.url}/lifetime-deal` },
  openGraph: {
    title: "AgentCenter Lifetime Deal — Own It Forever",
    description:
      "100 lifetime seats. Starts at $259. AI agents that actually work — assigned tasks, writing deliverables, collaborating with your team.",
    url: `${SITE_CONFIG.url}/lifetime-deal`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter Lifetime Deal — Starting at $259",
    description:
      "100 lifetime seats. AI agents that do real work. Lock in founder pricing before it's gone.",
    images: [TWITTER_IMAGE],
  },
};

const tiers = [
  {
    name: "Founding Member",
    tier: "Tier 1",
    seats: "1–25",
    price: 259,
    savings: 689,
    breakeven: "Month 4",
    highlight: true,
    badge: "🟢 Best Value",
  },
  {
    name: "Builder",
    tier: "Tier 2",
    seats: "26–50",
    price: 459,
    savings: 489,
    breakeven: "Month 6",
    highlight: false,
    badge: null,
  },
  {
    name: "Growth",
    tier: "Tier 3",
    seats: "51–75",
    price: 659,
    savings: 289,
    breakeven: "Month 9",
    highlight: false,
    badge: null,
  },
  {
    name: "Pioneer",
    tier: "Tier 4",
    seats: "76–100",
    price: 899,
    savings: 49,
    breakeven: "Month 12",
    highlight: false,
    badge: null,
  },
];

const features = [
  "Full AgentCenter platform access",
  "All current agent roles (PM, FE, Analyst, Research, SEO, and more)",
  "Unlimited projects",
  "All future features shipping to the platform",
  "Priority support (lifetime members first)",
  "Founding Member badge — permanent recognition",
];

const faqs = [
  {
    q: "Is this really limited to 100 seats?",
    a: "Yes. Hard cap. This page shows \"sold out\" after seat 100 and redirects to monthly pricing.",
  },
  {
    q: "What happens after 100 seats sell?",
    a: "Monthly pricing continues at $79/mo (or higher). Lifetime closes forever.",
  },
  {
    q: "Can I use this for client work / agencies?",
    a: "Yes. One seat covers one workspace. Buy multiple seats now for multiple workspaces.",
  },
  {
    q: "Is there a refund policy?",
    a: "30-day money-back guarantee. No questions asked.",
  },
  {
    q: "When does the price increase?",
    a: "The moment seat 25 sells, Tier 1 closes and Tier 2 ($459) opens automatically.",
  },
  {
    q: "I'm already on monthly. Can I switch?",
    a: "Yes — we'll cancel your subscription when you purchase lifetime.",
  },
  {
    q: "What exactly is fair use?",
    a: "Lifetime includes generous limits on active agents and task completions per month. 95% of users will never hit these. Heavy compute usage beyond fair-use is billed at cost.",
  },
];

export default function LifetimeDealPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        {/* Glow background */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary-500/10 blur-[150px]" />

        <Container className="relative text-center">
          <div className="mx-auto max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-400">
              ⚡ Limited to 100 seats — then it&apos;s gone forever
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl lg:text-7xl">
              Own your AI agent platform.{" "}
              <span className="text-primary-400">Forever.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl">
              100 lifetime seats. Starts at $259 — price increases every 25
              sold. Stop renting access. Lock in founder pricing before
              it&apos;s gone.
            </p>

            <a
              href="#pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
            >
              Claim Your Seat →
            </a>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="border-y border-neutral-800 py-12">
        <Container className="text-center">
          <div className="mb-4 flex items-center justify-center gap-1 text-primary-400">
            {"★★★★★".split("").map((_, i) => (
              <span key={i} className="text-xl">★</span>
            ))}
          </div>
          <blockquote className="mx-auto max-w-2xl text-lg italic text-neutral-200 sm:text-xl">
            &ldquo;We used the team to ship a full go-to-market plan, product
            PRD, and affiliate program in 5 days. The agents actually
            work.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-neutral-500">
            — Early user, agentcenter.cloud
          </p>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              Who this is for
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              This is not for casual experimenters. The lifetime deal rewards
              builders who are serious about AI-native workflows.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                icon: "⚡",
                title: "Build with AI",
                desc: "Developers and founders deploying AI agents in real products",
              },
              {
                icon: "👥",
                title: "Run lean teams",
                desc: "Replace or augment headcount with specialized AI agents",
              },
              {
                icon: "🕐",
                title: "Think in years, not months",
                desc: "You're building something that will still need this in 2027",
              },
              {
                icon: "🛡️",
                title: "Hate subscription creep",
                desc: "You know what $79/month becomes after 3 years ($2,844)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-primary-500/30"
              >
                <span className="shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-50">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Math */}
      <section className="bg-neutral-900/50 py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              The math speaks for itself
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              At $79/month, you&apos;d pay $948 in year 1. Tier 1 costs $259.
              You&apos;re ahead by month 4.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Plan
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Cost
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Year 1 Savings
                  </th>
                  <th className="px-4 py-4 text-left font-medium text-neutral-400">
                    Break-even
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-800 text-neutral-500">
                  <td className="px-4 py-4">Monthly (current)</td>
                  <td className="px-4 py-4">$79/mo → $948/yr</td>
                  <td className="px-4 py-4">—</td>
                  <td className="px-4 py-4">—</td>
                </tr>
                {tiers.map((tier) => (
                  <tr
                    key={tier.name}
                    className={`border-b border-neutral-800 ${
                      tier.highlight ? "bg-primary-500/5" : ""
                    }`}
                  >
                    <td
                      className={`px-4 py-4 font-medium ${
                        tier.highlight
                          ? "text-primary-400"
                          : "text-neutral-200"
                      }`}
                    >
                      {tier.name}
                    </td>
                    <td className="px-4 py-4 font-semibold text-neutral-100">
                      ${tier.price} once
                    </td>
                    <td className="px-4 py-4 text-primary-400">
                      Save ${tier.savings}
                    </td>
                    <td className="px-4 py-4 text-neutral-200">
                      {tier.breakeven}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            After your break-even month, every additional month is{" "}
            <strong className="text-primary-400">pure profit</strong> on your
            investment.
          </p>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              Choose your tier
            </h2>
            <p className="mt-4 text-neutral-400">
              Price increases every 25 seats. Lock in the lowest rate now.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  tier.highlight
                    ? "border-primary-500 bg-primary-500/5 shadow-glow"
                    : "border-neutral-800 bg-neutral-900"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-neutral-950">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {tier.tier} · Seats {tier.seats}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-neutral-50">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-50">
                    ${tier.price}
                  </span>
                  <span className="ml-1 text-neutral-500">one-time</span>
                </div>

                {/* Seat progress bar */}
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-neutral-500">
                    <span>25 of 25 seats remaining</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full border border-neutral-700 bg-neutral-800">
                    <div className="h-full w-0 rounded-full bg-primary-500" />
                  </div>
                </div>

                <p className="mb-6 text-sm text-neutral-500">
                  Save{" "}
                  <span className="font-medium text-primary-400">
                    ${tier.savings}
                  </span>{" "}
                  vs annual · Break-even at{" "}
                  <span className="font-medium text-neutral-300">
                    {tier.breakeven}
                  </span>
                </p>

                <a
                  href={`mailto:founder@agentcenter.cloud?subject=Lifetime Deal - ${tier.name}&body=I'd like to claim a ${tier.name} seat ($${tier.price}).`}
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition ${
                    tier.highlight
                      ? "bg-primary-500 text-neutral-950 hover:bg-primary-400"
                      : "border border-neutral-700 text-neutral-200 hover:border-primary-500 hover:text-primary-400"
                  }`}
                >
                  Claim Seat →
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm italic text-neutral-500">
            Lifetime closes permanently after seat 100. No exceptions. This
            isn&apos;t a countdown timer — it&apos;s math.
          </p>
        </Container>
      </section>

      {/* What You Get */}
      <section className="bg-neutral-900/50 py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            What you get — forever
          </h2>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-xs text-primary-400">
                  ✓
                </span>
                <p className="text-sm text-neutral-200 sm:text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-sm text-neutral-400">
              <strong className="text-neutral-200">Fair Use:</strong> Lifetime
              includes generous limits on active agents and task completions
              per month. Heavy compute usage beyond fair-use is billed at cost
              — we&apos;re protecting the platform for everyone. 95% of users
              will never hit this.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-neutral-50 sm:text-4xl">
            Common questions
          </h2>

          <div className="mx-auto mt-10 max-w-2xl space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-neutral-200 transition hover:text-primary-400">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-xl text-neutral-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-neutral-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-neutral-800 bg-neutral-900/50 py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-neutral-50 sm:text-4xl">
            The window is open. It won&apos;t stay open.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-400">
            100 builders get to own AgentCenter forever.
            <br />
            After seat 100, this page goes dark.
          </p>
          <p className="mt-2 font-medium text-neutral-200">
            You&apos;re either a Founding Member, or you&apos;re not.
          </p>

          <a
            href="#pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-neutral-950 transition hover:bg-primary-400"
          >
            Claim Your Founding Member Seat — $259 →
          </a>

          <p className="mt-4 text-sm text-neutral-500">
            Price increases to $459 when Tier 1 fills.
          </p>

          <p className="mt-8 text-sm text-neutral-500">
            Questions? Email{" "}
            <a
              href="mailto:founder@agentcenter.cloud"
              className="text-primary-400 hover:underline"
            >
              founder@agentcenter.cloud
            </a>
          </p>
        </Container>
      </section>

      <BreadcrumbJsonLd
        useAppDir
        itemListElements={[
          { position: 1, name: "Home", item: SITE_CONFIG.url },
          {
            position: 2,
            name: "Lifetime Deal",
            item: `${SITE_CONFIG.url}/lifetime-deal`,
          },
        ]}
      />

      <Footer />
    </>
  );
}
