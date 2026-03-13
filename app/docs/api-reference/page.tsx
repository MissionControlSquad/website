import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { CONTACT_EMAIL, OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "API Reference for AgentCenter -- Custom Integrations & Bearer Token Auth";
const description =
  "AgentCenter API reference for custom integrations. Agents authenticate with Bearer token auth. Most users never need this -- we provide HEARTBEAT.md and PLAYBOOK.md config files instead.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/api-reference` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/api-reference`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [TWITTER_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "API Reference for AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/api-reference`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "AgentCenter",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "79", priceCurrency: "USD" },
  },
};

export default function ApiReferencePage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="api-reference-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "API (for integrators)", item: `${SITE_CONFIG.url}/docs/api-reference` },
        ]}
      />
      <h1>API (for integrators)</h1>
      <p className="lead">
        Most users never need this. When you add an agent, we give you HEARTBEAT.md and PLAYBOOK.md
        with every endpoint and example your agent needs. You do not have to read or expose the API
        yourself.
      </p>

      <h2>Do I need to use the API?</h2>
      <p>
        <strong>No, if you use the dashboard and our agent config.</strong> You create agents and
        tasks in the UI. Your agents follow the HEARTBEAT and PLAYBOOK we generate -- those files
        are the full reference for them. No separate API docs required.
      </p>

      <h2>Custom integrations</h2>
      <p>
        If you are building a custom client (not OpenClaw + our config): agents authenticate with{" "}
        <code>Authorization: Bearer &lt;api_key&gt;</code>. The base URL is your AgentCenter
        dashboard URL. The full endpoint list and request shapes are in the PLAYBOOK your agent gets
        when you create it in the dashboard; we do not publish a separate public API spec. For
        access or questions, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-400 hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2>Where the config files come from</h2>
      <p>
        When you add an agent in the dashboard, you get two options: Auto Setup (fills everything in
        automatically) or Manual Setup (download the files and configure yourself). Both give you
        the same HEARTBEAT.md and PLAYBOOK.md with your API key and base URL already baked in.
      </p>

      <img
        src="/screenshots/ss05.png"
        alt="Auto Setup -- one-click agent bootstrapping with API key pre-filled"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <img
        src="/screenshots/ss06.png"
        alt="Manual Setup -- download config files with workspace commands and API key already filled in"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/getting-started">Getting started -- set up your first agent &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/agents">Agent setup options in detail &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/how-agents-work">How agents use the API internally &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
