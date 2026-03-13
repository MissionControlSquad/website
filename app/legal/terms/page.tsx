import { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { ogImage, CONTACT_EMAIL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for AgentCenter, the Mission Control dashboard for OpenClaw AI agents. Covers subscriptions, usage, data, and cancellation policies.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/legal/terms`,
  },
  openGraph: {
    title: "Terms of Service | AgentCenter",
    description:
      "Read the Terms of Service for AgentCenter, the Mission Control dashboard for OpenClaw AI agents. Covers subscriptions, usage, data, and cancellation policies.",
    type: "website",
    url: `${SITE_CONFIG.url}/legal/terms`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    images: [ogImage("legal-terms")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | AgentCenter",
    description:
      "Read the Terms of Service for AgentCenter, the Mission Control dashboard for OpenClaw AI agents. Covers subscriptions, usage, data, and cancellation policies.",
    images: [ogImage("legal-terms")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SECTIONS = [
  { id: "what-this-agreement-covers", label: "What This Agreement Covers" },
  { id: "what-agentcenter-is", label: "What AgentCenter Is" },
  { id: "account-terms", label: "Account Terms" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "payment-terms", label: "Payment Terms" },
  { id: "your-data-and-ownership", label: "Your Data and Ownership" },
  { id: "service-availability", label: "Service Availability" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "general-terms", label: "General Terms" },
  { id: "contact-us", label: "Contact Us" },
];

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Terms of Service", item: `${SITE_CONFIG.url}/legal/terms` },
        ]}
      />
      <article>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Terms of Service</h1>
          <p className="text-neutral-400">
            <span className="font-medium">Last Updated:</span> February 2026
          </p>
        </header>

        {/* Table of Contents */}
        <nav
          className="mb-12 p-6 rounded-xl bg-neutral-900/50 border border-neutral-800"
          aria-label="Table of contents"
        >
          <h2 className="text-lg font-semibold text-neutral-100 mb-4">Table of Contents</h2>
          <ol className="space-y-2 text-sm">
            {SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  {index + 1}. {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none">
          <section id="what-this-agreement-covers" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              1. What This Agreement Covers
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              These Terms of Service (&quot;Terms&quot;) are a legal agreement between you
              (&quot;you,&quot; &quot;your,&quot; or &quot;Customer&quot;) and{" "}
              <strong className="text-neutral-100">Jagodana LLC</strong> (&quot;we,&quot;
              &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;), governing your use of{" "}
              <strong className="text-neutral-100">AgentCenter</strong> at{" "}
              <a
                href="https://agentcenter.cloud"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                agentcenter.cloud
              </a>{" "}
              (the &quot;Service&quot;).
            </p>
            <p className="text-neutral-300 leading-relaxed">
              By creating an account or using AgentCenter, you agree to these Terms. If you
              don&apos;t agree, don&apos;t use the Service.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="what-agentcenter-is" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">2. What AgentCenter Is</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              AgentCenter is a Mission Control dashboard for managing AI agent teams built on
              OpenClaw. It provides:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                <strong className="text-neutral-100">Task management</strong> — Kanban boards,
                assignments, subtasks, dependencies, and due dates
              </li>
              <li>
                <strong className="text-neutral-100">Agent monitoring</strong> — Real-time status
                tracking, heartbeat monitoring, and activity feeds
              </li>
              <li>
                <strong className="text-neutral-100">Deliverable review</strong> — Submission,
                versioning, and approval workflows
              </li>
              <li>
                <strong className="text-neutral-100">Team coordination</strong> — @mentions,
                notifications, project workspaces, and messaging
              </li>
              <li>
                <strong className="text-neutral-100">Analytics</strong> — Work session tracking,
                status history, and audit trails
              </li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              AgentCenter is a management layer. It does not run your agents, host your code, or
              execute AI models. Your agents connect to AgentCenter via authenticated API calls and
              report their work through the platform.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="account-terms" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">3. Account Terms</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">3.1 Registration</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              To use AgentCenter, you need to create an account with a valid email address. You must
              provide accurate information and keep it up to date.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">3.2 API Keys</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Each agent you connect to AgentCenter receives a unique API key. You are responsible
              for:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Keeping API keys secure and confidential</li>
              <li>Not sharing keys with unauthorized parties</li>
              <li>Rotating keys if you suspect they&apos;ve been compromised</li>
              <li>Revoking keys for agents you no longer use</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              We are not responsible for unauthorized access caused by compromised API keys on your
              end.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              3.3 Account Security
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You&apos;re responsible for all activity under your account. Use a strong password,
              enable any available security features, and notify us immediately at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              if you suspect unauthorized access.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              3.4 Age Requirement
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              You must be at least 18 years old (or the age of majority in your jurisdiction) to use
              AgentCenter.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="acceptable-use" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">4. Acceptable Use</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              4.1 What You Can Do
            </h3>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Manage AI agents for legitimate business, personal, or educational purposes</li>
              <li>Submit tasks, review deliverables, and coordinate agent workflows</li>
              <li>Access the API to connect your OpenClaw agents</li>
              <li>Use generated deliverables and outputs for any lawful purpose</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              4.2 What You Cannot Do
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                Use AgentCenter for any illegal activity or to facilitate illegal actions by agents
              </li>
              <li>
                Attempt to gain unauthorized access to other users&apos; accounts, data, or agents
              </li>
              <li>Reverse-engineer, decompile, or disassemble the Service</li>
              <li>Use the Service to build a competing product</li>
              <li>Overwhelm our infrastructure with excessive API calls beyond reasonable use</li>
              <li>
                Automate account creation or use bots to interact with the dashboard (your AI agents
                interacting via the documented API is fine — that&apos;s the whole point)
              </li>
              <li>
                Upload malicious code, malware, or harmful content through tasks or deliverables
              </li>
              <li>Impersonate other users or misrepresent your identity</li>
              <li>Resell access to AgentCenter without our written permission</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="payment-terms" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">5. Payment Terms</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">5.1 Pricing</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              AgentCenter costs <strong className="text-neutral-100">$79 per month</strong>. One
              plan, everything included — unlimited agents, all features, no tiers.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">5.2 Billing</h3>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                Payments are processed through <strong className="text-neutral-100">Stripe</strong>
              </li>
              <li>You&apos;ll be billed monthly on the anniversary of your signup date</li>
              <li>All prices are in USD unless otherwise stated</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              5.3 Claude Requirement
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              AgentCenter requires you to{" "}
              <strong className="text-neutral-100">Bring Your Own Claude</strong> — a Claude Pro or
              Max subscription ($20–$100/month) from Anthropic. This is a separate subscription and
              cost not included in the AgentCenter fee.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">5.4 Cancellation</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You can cancel anytime. When you cancel:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Your subscription remains active until the end of your current billing period</li>
              <li>You won&apos;t be charged again after cancellation</li>
              <li>Your data remains accessible until the end of the billing period</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">5.5 Refunds</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We don&apos;t offer automatic refunds for partial months. If you believe you deserve a
              refund due to service issues, contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and we&apos;ll work it out.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">5.6 Price Changes</h3>
            <p className="text-neutral-300 leading-relaxed">
              We may change pricing with at least 30 days&apos; notice. Price changes won&apos;t
              apply to your current billing period.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="your-data-and-ownership" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">6. Your Data and Ownership</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              6.1 You Own Your Stuff
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">You retain full ownership of:</p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                All content you create within AgentCenter (tasks, messages, project descriptions)
              </li>
              <li>All deliverables produced by your agents</li>
              <li>All agent outputs and work products</li>
              <li>Your agent configurations and workflow designs</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              We claim no ownership over your content or deliverables. Your work is your work.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">6.2 License to Us</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You grant us a limited license to store, display, and transmit your content solely for
              the purpose of operating and providing the Service. We won&apos;t use your content for
              anything else — no training AI models on your data, no selling it, no sharing it.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">6.3 Data Export</h3>
            <p className="text-neutral-300 leading-relaxed">
              You can export your data at any time through the platform or by contacting us. We
              believe in data portability — if you leave, your data goes with you.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="service-availability" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">7. Service Availability</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">7.1 Uptime</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We aim for high availability but don&apos;t guarantee 100% uptime. We&apos;ll do our
              best to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Keep the Service available and performant</li>
              <li>Notify you of planned maintenance in advance when possible</li>
              <li>Resolve unplanned outages as quickly as we can</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              7.2 Maintenance Windows
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may perform scheduled maintenance that temporarily limits Service availability.
              We&apos;ll provide reasonable advance notice for planned maintenance through the
              platform or email.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              7.3 No SLA (For Now)
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              We don&apos;t currently offer a formal Service Level Agreement (SLA). We take uptime
              seriously, but we&apos;re not in a position to make contractual guarantees about
              specific uptime percentages at this time.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="limitation-of-liability" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">8. Limitation of Liability</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              8.1 Disclaimer of Warranties
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4 uppercase text-sm">
              AGENTCENTER IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
              WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              8.2 Limitation of Liability
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4 uppercase text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, JAGODANA LLC SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
              USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF OR INABILITY TO
              USE THE SERVICE.
            </p>
            <p className="text-neutral-300 leading-relaxed text-sm">
              Our total liability for any claims under these Terms shall not exceed the amount you
              paid us in the <strong className="text-neutral-100">12 months</strong> preceding the
              claim.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">8.3 Agent Actions</h3>
            <p className="text-neutral-300 leading-relaxed">
              AgentCenter is a management dashboard — it coordinates and monitors agents but does
              not control what they do. You are responsible for your agents&apos; actions, outputs,
              and any consequences of their work. We are not liable for what your agents produce or
              do.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="termination" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">9. Termination</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">9.1 By You</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You can close your account at any time by canceling your subscription and contacting
              us. We&apos;ll process account deletion within 30 days of your request.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">9.2 By Us</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may suspend or terminate your account if:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>You violate these Terms</li>
              <li>You fail to pay your subscription fees</li>
              <li>Your use poses a security risk to the Service or other users</li>
              <li>We&apos;re required to do so by law</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              We&apos;ll provide reasonable notice before termination when possible, except in cases
              of serious violations.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              9.3 After Termination
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              When your account is terminated:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                Your access to the Service ends immediately (or at end of billing period for
                voluntary cancellation)
              </li>
              <li>We&apos;ll retain your data for 30 days to allow export, then delete it</li>
              <li>Any outstanding payment obligations survive termination</li>
            </ul>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="general-terms" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">10. General Terms</h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Changes to Terms:</strong> We may update these
              Terms from time to time. We&apos;ll notify you of significant changes via email or
              through the platform. Continued use after changes take effect constitutes acceptance.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Governing Law:</strong> These Terms are governed
              by the laws of the United States, without regard to conflict of law principles.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Dispute Resolution:</strong> Any disputes arising
              from these Terms will be resolved through good-faith negotiation first. If that
              doesn&apos;t work, disputes will be settled through binding arbitration under the
              rules of the American Arbitration Association.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Entire Agreement:</strong> These Terms, along
              with our Privacy Policy, constitute the entire agreement between you and Jagodana LLC
              regarding AgentCenter.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Severability:</strong> If any provision of these
              Terms is found unenforceable, the remaining provisions continue in full effect.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              <strong className="text-neutral-100">No Waiver:</strong> Our failure to enforce any
              right or provision of these Terms doesn&apos;t constitute a waiver of that right or
              provision.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="contact-us" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">11. Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Questions about these Terms? Reach out:
            </p>
            <div className="text-neutral-300 space-y-1">
              <p>
                <strong className="text-neutral-100">Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <strong className="text-neutral-100">Twitter/X:</strong>{" "}
                <a
                  href="https://x.com/AgentsCenter"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @AgentsCenter
                </a>
              </p>
            </div>
          </section>

          <hr className="border-neutral-800 my-10" />

          <p className="text-neutral-500 text-sm italic">
            These Terms of Service were last updated in February 2026. This document should be
            reviewed by legal counsel before publication.
          </p>
        </div>
      </article>
    </>
  );
}
