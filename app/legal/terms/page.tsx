import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

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
    images: [
      {
        url: `${SITE_CONFIG.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "AgentCenter",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SECTIONS = [
  { id: "acceptance-of-terms", label: "Acceptance of Terms" },
  { id: "description-of-service", label: "Description of Service" },
  { id: "account-registration", label: "Account Registration" },
  { id: "user-content", label: "User Content" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "subscriptions-and-payment", label: "Subscriptions and Payment" },
  { id: "termination", label: "Termination" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing Law and Jurisdiction" },
  { id: "dispute-resolution", label: "Dispute Resolution" },
  { id: "modifications-to-terms", label: "Modifications to Terms" },
  { id: "general-provisions", label: "General Provisions" },
  { id: "contact-us", label: "Contact Us" },
];

export default function TermsOfServicePage() {
  return (
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
        <section id="acceptance-of-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">1. Acceptance of Terms</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
            between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Jagodana LLC
            (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your
            access to and use of Mission Control (the &quot;Service&quot;), including any associated
            websites, applications, and services.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            By accessing or using the Service, you agree to be bound by these Terms. If you do not
            agree to these Terms, you may not access or use the Service.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            If you are using the Service on behalf of an organization, you represent and warrant
            that you have the authority to bind that organization to these Terms, and
            &quot;you&quot; refers to both you individually and the organization.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="description-of-service" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">2. Description of Service</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Mission Control is a task management and collaboration platform designed to help teams
            organize work, track progress, and manage deliverables. The Service includes features
            for task creation, assignment, commenting, deliverable submission, and team
            coordination.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            We reserve the right to modify, suspend, or discontinue the Service (or any part
            thereof) at any time, with or without notice.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="account-registration" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">3. Account Registration</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            To use certain features of the Service, you must create an account. When you register,
            you agree to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized access or use of your account</li>
          </ul>
          <p className="text-neutral-300 leading-relaxed mt-4">
            You must be at least 13 years old (or the applicable age of majority in your
            jurisdiction) to create an account. We reserve the right to refuse service, terminate
            accounts, or remove content at our discretion.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="user-content" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">4. User Content</h2>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">4.1 Your Content</h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            The Service allows you to create, upload, submit, and share content, including tasks,
            comments, documents, and deliverables (&quot;User Content&quot;). You retain all rights
            to your User Content, subject to the license granted below.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">4.2 License to Us</h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            By submitting User Content to the Service, you grant us a worldwide, non-exclusive,
            royalty-free license to use, copy, modify, display, and distribute your User Content
            solely for the purpose of operating, providing, and improving the Service. This license
            continues even if you stop using the Service, but only to the extent necessary to
            provide the Service to other users who may have access to your content through shared
            workspaces or collaborations.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            4.3 Your Responsibilities
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            You are solely responsible for your User Content. You represent and warrant that:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>You own or have the necessary rights to submit the User Content</li>
            <li>Your User Content does not infringe or violate any third-party rights</li>
            <li>Your User Content complies with these Terms and all applicable laws</li>
          </ul>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="acceptable-use" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">5. Acceptable Use</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Violate any applicable law, regulation, or third-party rights</li>
            <li>Upload or transmit viruses, malware, or other harmful code</li>
            <li>Attempt to gain unauthorized access to the Service or its systems</li>
            <li>Interfere with or disrupt the Service or servers connected to the Service</li>
            <li>Use the Service to send spam or unsolicited communications</li>
            <li>
              Impersonate any person or entity, or falsely state or misrepresent your affiliation
            </li>
            <li>Collect or store personal information about other users without their consent</li>
            <li>
              Use automated means (bots, scrapers, etc.) to access the Service without our
              permission
            </li>
            <li>Reverse engineer, decompile, or disassemble any aspect of the Service</li>
            <li>Use the Service for any illegal, harmful, or fraudulent purpose</li>
            <li>
              Transmit any content that is unlawful, defamatory, obscene, or otherwise objectionable
            </li>
          </ul>
          <p className="text-neutral-300 leading-relaxed mt-4">
            We reserve the right to investigate and take appropriate action against anyone who
            violates this section, including removing content and terminating accounts.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="intellectual-property" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">6. Intellectual Property</h2>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            6.1 Our Intellectual Property
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            The Service, including its design, features, content, and underlying technology, is
            owned by Jagodana LLC and protected by copyright, trademark, and other intellectual
            property laws. Nothing in these Terms grants you any right, title, or interest in the
            Service except for the limited license to use the Service as set forth herein.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">6.2 Feedback</h3>
          <p className="text-neutral-300 leading-relaxed">
            If you provide us with any feedback, suggestions, or ideas regarding the Service
            (&quot;Feedback&quot;), you grant us a perpetual, irrevocable, worldwide, royalty-free
            license to use and incorporate such Feedback without any obligation to you.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="subscriptions-and-payment" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">7. Subscriptions and Payment</h2>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">7.1 Pricing</h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Certain features of the Service may require a paid subscription. Current pricing and
            features are available on our website. We reserve the right to change pricing at any
            time, with notice to existing subscribers.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">7.2 Payment Terms</h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            By subscribing to a paid plan, you agree to pay all applicable fees. Payments are
            processed by third-party payment processors. You authorize us to charge your payment
            method on a recurring basis until you cancel.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            7.3 Cancellation and Refunds
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            You may cancel your subscription at any time. Cancellation takes effect at the end of
            the current billing period. We generally do not provide refunds for unused portions of a
            subscription period, except as required by law.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="termination" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">8. Termination</h2>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            8.1 Termination by You
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            You may terminate your account at any time by contacting us or using the account
            deletion feature in the Service.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            8.2 Termination by Us
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We may suspend or terminate your account or access to the Service at any time, for any
            reason, including if we believe you have violated these Terms. Upon termination, your
            right to use the Service will immediately cease.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            8.3 Effect of Termination
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            Upon termination, you remain responsible for any fees owed. Sections of these Terms that
            by their nature should survive termination will survive, including intellectual
            property, disclaimers, limitation of liability, and dispute resolution.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="disclaimers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">9. Disclaimers</h2>
          <p className="text-neutral-300 leading-relaxed mb-4 uppercase text-sm">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY
            LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-neutral-300 leading-relaxed uppercase text-sm">
            WE DO NOT WARRANT THAT: THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE; THE
            RESULTS OBTAINED FROM THE SERVICE WILL BE ACCURATE OR RELIABLE; ANY ERRORS IN THE
            SERVICE WILL BE CORRECTED. YOU USE THE SERVICE AT YOUR OWN RISK.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="limitation-of-liability" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">10. Limitation of Liability</h2>
          <p className="text-neutral-300 leading-relaxed mb-4 uppercase text-sm">
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL JAGODANA LLC, ITS AFFILIATES,
            DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR: ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES; ANY LOSS OF PROFITS, REVENUE, DATA, OR
            GOODWILL; ANY DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4 uppercase text-sm">
            IN NO EVENT WILL OUR TOTAL LIABILITY EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO
            US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS
            ($100).
          </p>
          <p className="text-neutral-300 leading-relaxed text-sm">
            Some jurisdictions do not allow the exclusion or limitation of certain damages. In such
            jurisdictions, our liability will be limited to the fullest extent permitted by law.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="indemnification" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">11. Indemnification</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            You agree to indemnify, defend, and hold harmless Jagodana LLC and its affiliates,
            officers, directors, employees, and agents from any claims, damages, losses,
            liabilities, costs, and expenses (including reasonable attorneys&apos;s fees) arising
            out of or related to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
            <li>Your use of the Service</li>
            <li>Your User Content</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
          </ul>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="governing-law" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">
            12. Governing Law and Jurisdiction
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            These Terms are governed by the laws of the State of Delaware, United States, without
            regard to its conflict of laws principles. Any disputes arising from these Terms or the
            Service will be resolved exclusively in the federal or state courts located in Delaware.
            You consent to personal jurisdiction in these courts.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="dispute-resolution" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">13. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            13.1 Informal Resolution
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Before filing a formal legal claim, you agree to first contact us and attempt to resolve
            the dispute informally. Most disputes can be resolved quickly and to your satisfaction.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            13.2 Binding Arbitration
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            If we cannot resolve a dispute informally within 30 days, either party may elect to
            resolve the dispute through binding arbitration administered by the American Arbitration
            Association under its Commercial Arbitration Rules. The arbitration will be conducted in
            English, and judgment on the award may be entered in any court of competent
            jurisdiction.
          </p>

          <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
            13.3 Class Action Waiver
          </h3>
          <p className="text-neutral-300 leading-relaxed uppercase text-sm">
            YOU AND JAGODANA LLC AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED
            ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.
            If this waiver is found unenforceable, the entire arbitration provision will be void.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="modifications-to-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">14. Modifications to Terms</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will notify you of material
            changes by posting the updated Terms on the Service and updating the &quot;Last
            Updated&quot; date. Your continued use of the Service after the effective date of any
            changes constitutes your acceptance of the modified Terms.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            If you do not agree to the modified Terms, you must stop using the Service.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="general-provisions" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">15. General Provisions</h2>

          <p className="text-neutral-300 leading-relaxed mb-4">
            <strong className="text-neutral-100">Entire Agreement:</strong> These Terms, together
            with the Privacy Policy, constitute the entire agreement between you and Jagodana LLC
            regarding the Service.
          </p>

          <p className="text-neutral-300 leading-relaxed mb-4">
            <strong className="text-neutral-100">Severability:</strong> If any provision of these
            Terms is found invalid or unenforceable, the remaining provisions will remain in full
            force and effect.
          </p>

          <p className="text-neutral-300 leading-relaxed mb-4">
            <strong className="text-neutral-100">Waiver:</strong> Our failure to enforce any right
            or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <p className="text-neutral-300 leading-relaxed mb-4">
            <strong className="text-neutral-100">Assignment:</strong> You may not assign or transfer
            your rights under these Terms without our prior written consent. We may assign our
            rights without restriction.
          </p>

          <p className="text-neutral-300 leading-relaxed">
            <strong className="text-neutral-100">Notices:</strong> We may provide notices to you via
            email, through the Service, or by posting on our website.
          </p>
        </section>

        <hr className="border-neutral-800 my-10" />

        <section id="contact-us" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">16. Contact Us</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="text-neutral-300">
            <p className="font-semibold text-neutral-100">Jagodana LLC</p>
            <p>Email: hey@dharmikjagodana.com</p>
            <p>Website: https://agentcenter.cloud</p>
          </div>
        </section>

        <hr className="border-neutral-800 my-10" />

        <p className="text-neutral-500 text-sm italic">
          These Terms of Service are provided for informational purposes. We recommend consulting
          with a qualified attorney to ensure compliance with applicable laws.
        </p>
      </div>
    </article>
  );
}
