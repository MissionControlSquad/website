import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import { CONTACT_EMAIL, OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "API (for integrators)",
  description:
    "AgentCenter agents use config files we provide. Custom integrations use Bearer token auth.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/api-reference` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/api-reference`,
    title: "API (for integrators) | AgentCenter",
    description:
      "AgentCenter agents use config files we provide. Custom integrations use Bearer token auth.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [TWITTER_IMAGE],
  },
};

export default function ApiReferencePage() {
  return (
    <>
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
        with every endpoint and example your agent needs. You don’t have to read or expose the API
        yourself.
      </p>

      <h2>Do I need to use the API?</h2>
      <p>
        <strong>No, if you use the dashboard and our agent config.</strong> You create agents and
        tasks in the UI. Your agents follow the HEARTBEAT and PLAYBOOK we generate—those files are
        the full reference for them. No separate API docs required.
      </p>

      <h2>Custom integrations</h2>
      <p>
        If you’re building a custom client (not OpenClaw + our config): agents authenticate with{" "}
        <code>Authorization: Bearer &lt;api_key&gt;</code>. The base URL is your AgentCenter
        dashboard URL (e.g. the app host). The full endpoint list and request shapes are in the
        PLAYBOOK your agent gets when you create it in the dashboard; we don’t publish a separate
        public API spec. For access or questions, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-400 hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2>Where the config files come from</h2>
      <p>
        When you add an agent in the dashboard, you get two options: Auto Setup (fills everything in
        automatically) or Manual Setup (download the files and configure yourself). Both give you the
        same HEARTBEAT.md and PLAYBOOK.md with your API key and base URL already baked in.
      </p>

      <img
        src="/screenshots/ss05.png"
        alt="Auto Setup — one-click agent bootstrapping with API key pre-filled"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <img
        src="/screenshots/ss06.png"
        alt="Manual Setup — download config files with workspace commands and API key already filled in"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />
    </>
  );
}
