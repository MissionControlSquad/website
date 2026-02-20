import { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how AgentCenter collects, uses, and protects your personal information. We cover data collection, cookies, third-party services, and your privacy rights.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/legal/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | AgentCenter",
    description:
      "Learn how AgentCenter collects, uses, and protects your personal information. We cover data collection, cookies, third-party services, and your privacy rights.",
    type: "website",
    url: `${SITE_CONFIG.url}/legal/privacy-policy`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | AgentCenter",
    description:
      "Learn how AgentCenter collects, uses, and protects your personal information. We cover data collection, cookies, third-party services, and your privacy rights.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use Your Information" },
  { id: "how-we-share-your-information", label: "How We Share Your Information" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-retention", label: "Data Retention" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights-and-choices", label: "Your Rights and Choices" },
  { id: "international-data-transfers", label: "International Data Transfers" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "california-privacy-rights", label: "California Privacy Rights" },
  { id: "european-privacy-rights", label: "European Privacy Rights" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Privacy Policy", item: `${SITE_CONFIG.url}/legal/privacy-policy` },
        ]}
      />
      <article>
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Privacy Policy</h1>
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
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Introduction</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              This Privacy Policy describes how Jagodana LLC (&quot;Company,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information in
              connection with your use of Mission Control (the &quot;Service&quot;), our websites,
              and any related services.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              By accessing or using the Service, you acknowledge that you have read, understood, and
              agree to be bound by this Privacy Policy. If you do not agree, please discontinue use
              of the Service immediately.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="information-we-collect" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              Information You Provide
            </h3>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Account Information:</strong> When you create an
              account, we collect your name, email address, and password. If you choose to
              authenticate through a third-party service, we may receive additional profile
              information from that provider.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Content and Data:</strong> We collect the
              information you create, upload, or share through the Service, including tasks,
              comments, deliverables, documents, and any other content you submit (&quot;User
              Content&quot;).
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Communications:</strong> When you contact us
              directly, we collect the information you provide, such as your name, email address,
              and the contents of your message.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Payment Information:</strong> If you purchase a
              paid subscription, payment processing is handled by third-party payment processors. We
              do not store complete credit card numbers or banking details on our servers.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              Information Collected Automatically
            </h3>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Usage Data:</strong> We automatically collect
              information about how you interact with the Service, including pages visited, features
              used, actions taken, time spent, and clickstream data.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Device Information:</strong> We collect
              information about the device you use to access the Service, including device type,
              operating system, browser type, unique device identifiers, and network information.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Log Data:</strong> Our servers automatically
              record information when you use the Service, including your IP address, access times,
              and referring URLs.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              <strong className="text-neutral-100">Cookies and Similar Technologies:</strong> We use
              cookies, pixels, and similar tracking technologies to collect information and improve
              the Service. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="how-we-use-your-information" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process transactions and send related information</li>
              <li>Create and manage your account</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Send technical notices, updates, security alerts, and administrative messages</li>
              <li>
                Monitor and analyze trends, usage, and activities in connection with the Service
              </li>
              <li>
                Detect, investigate, and prevent fraudulent transactions and other illegal
                activities
              </li>
              <li>Personalize and improve your experience</li>
              <li>Develop new products, services, and features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="how-we-share-your-information" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              How We Share Your Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the
              following circumstances:
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Service Providers:</strong> We share information
              with third-party vendors who provide services on our behalf, such as hosting, data
              storage, analytics, payment processing, and customer support. These providers are
              bound by contractual obligations to keep personal information confidential.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Business Transfers:</strong> If we are involved
              in a merger, acquisition, financing, or sale of assets, your information may be
              transferred as part of that transaction.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Legal Compliance:</strong> We may disclose
              information if required by law, regulation, legal process, or governmental request.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Protection of Rights:</strong> We may disclose
              information when we believe it is necessary to protect the rights, property, or safety
              of Jagodana LLC, our users, or the public.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              <strong className="text-neutral-100">With Your Consent:</strong> We may share
              information with your consent or at your direction.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="third-party-services" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Third-Party Services</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              The Service may integrate with or contain links to third-party websites, services, or
              applications. This Privacy Policy does not apply to those third parties. We encourage
              you to review the privacy policies of any third-party services you access.
            </p>

            <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">
              Key Third-Party Services
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our Service utilizes the following categories of third-party services:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                <strong className="text-neutral-100">Infrastructure and Hosting:</strong> Cloud
                hosting and database services
              </li>
              <li>
                <strong className="text-neutral-100">Analytics:</strong> Services that help us
                understand how users interact with the Service
              </li>
              <li>
                <strong className="text-neutral-100">Authentication:</strong> Third-party identity
                providers (if you choose social login)
              </li>
            </ul>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="data-retention" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Data Retention</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We retain your information for as long as your account is active or as needed to
              provide you with the Service. We also retain information as necessary to comply with
              legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              When you delete your account, we will delete or anonymize your personal information
              within a reasonable timeframe, unless we are required to retain it for legal purposes.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="data-security" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Data Security</h2>
            <p className="text-neutral-300 leading-relaxed">
              We implement appropriate technical and organizational measures designed to protect
              your information against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is
              completely secure. We cannot guarantee absolute security.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="your-rights-and-choices" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Your Rights and Choices</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal
              information:
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Access and Portability:</strong> You may request
              a copy of the personal information we hold about you.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Correction:</strong> You may request that we
              correct inaccurate or incomplete information.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Deletion:</strong> You may request that we delete
              your personal information, subject to certain exceptions.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Opt-Out of Marketing:</strong> You may opt out of
              receiving marketing communications by following the unsubscribe instructions in those
              messages.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-neutral-100">Cookie Preferences:</strong> You can manage
              cookies through your browser settings.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              To exercise these rights, please contact us at the address provided below.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="international-data-transfers" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              International Data Transfers
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your
              country of residence. These countries may have different data protection laws. By
              using the Service, you consent to such transfers.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="childrens-privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Children&apos;s Privacy</h2>
            <p className="text-neutral-300 leading-relaxed">
              The Service is not intended for children under the age of 13 (or the applicable age in
              your jurisdiction). We do not knowingly collect personal information from children. If
              you become aware that a child has provided us with personal information, please
              contact us immediately.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="california-privacy-rights" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">California Privacy Rights</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you are a California resident, you have specific rights under the California
              Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                <strong className="text-neutral-100">Right to Know:</strong> You may request
                information about the categories and specific pieces of personal information we have
                collected, the sources of that information, our purposes for collecting it, and the
                categories of third parties with whom we share it.
              </li>
              <li>
                <strong className="text-neutral-100">Right to Delete:</strong> You may request
                deletion of your personal information, subject to certain exceptions.
              </li>
              <li>
                <strong className="text-neutral-100">Right to Opt-Out:</strong> You may opt out of
                the &quot;sale&quot; or &quot;sharing&quot; of your personal information. Note: We
                do not sell personal information.
              </li>
              <li>
                <strong className="text-neutral-100">Right to Non-Discrimination:</strong> We will
                not discriminate against you for exercising your privacy rights.
              </li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-4">
              To submit a request, please contact us using the information below.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="european-privacy-rights" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">European Privacy Rights</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), United Kingdom, or
              Switzerland, you have certain rights under the General Data Protection Regulation
              (GDPR) and similar laws:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 ml-4">
              <li>
                <strong className="text-neutral-100">Legal Basis:</strong> We process your
                information based on your consent, the performance of a contract, legitimate
                interests, or legal obligations.
              </li>
              <li>
                <strong className="text-neutral-100">Rights:</strong> You have the right to access,
                rectify, erase, restrict processing, data portability, object to processing, and
                withdraw consent.
              </li>
              <li>
                <strong className="text-neutral-100">Complaints:</strong> You have the right to
                lodge a complaint with your local data protection authority.
              </li>
            </ul>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="changes-to-this-policy" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the new Privacy Policy on this page and updating the &quot;Last
              Updated&quot; date. Your continued use of the Service after the changes take effect
              constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <hr className="border-neutral-800 my-10" />

          <section id="contact-us" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-neutral-100 mb-4">Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please
              contact us at:
            </p>
            <div className="text-neutral-300">
              <p className="font-semibold text-neutral-100">Jagodana LLC</p>
              <p>Email: hey@dharmikjagodana.com</p>
              <p>Website: https://www.jagodana.com</p>
            </div>
          </section>

          <hr className="border-neutral-800 my-10" />

          <p className="text-neutral-500 text-sm italic">
            This Privacy Policy is provided for informational purposes. We recommend consulting with
            a qualified attorney to ensure compliance with applicable laws.
          </p>
        </div>
      </article>
    </>
  );
}
