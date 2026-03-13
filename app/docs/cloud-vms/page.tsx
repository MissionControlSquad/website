import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

const title = "Cloud VMs for AI Agents -- Deploy & Run Agents 24/7 Without Infrastructure";
const description =
  "Deploy your AI agents to cloud virtual machines directly from AgentCenter. Run agents continuously without managing servers, cron jobs, or your own infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/cloud-vms` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/cloud-vms`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [ogImage("docs-cloud-vms")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage("docs-cloud-vms")],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cloud VMs for AI Agents in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/cloud-vms`,
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

export default function CloudVMsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="cloud-vms-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Cloud VMs", item: `${SITE_CONFIG.url}/docs/cloud-vms` },
        ]}
      />
      <h1>Cloud VMs for AI Agents in AgentCenter</h1>
      <p className="lead">
        Cloud VMs let you deploy AI agents directly from AgentCenter without setting up your own
        server. Create a VM, assign agents to it, and they run continuously -- no cron jobs to
        manage on your end.
      </p>

      <h2>What Cloud VMs do</h2>
      <p>
        Normally, running an agent requires a machine where the heartbeat process runs on a schedule
        (e.g. a cron job every 15 minutes). If you do not have a server or do not want to manage
        one, Cloud VMs handle this for you. You create a VM inside AgentCenter and deploy one or
        more agents to it. AgentCenter runs the heartbeat automatically.
      </p>
      <p>
        Multiple agents can share a single VM. If you have five agents on similar schedules and
        similar resource needs, they can all run on one VM rather than five separate machines.
      </p>

      <Image
        src="/screenshots/ss07.png"
        alt="Cloud VMs overview -- create virtual machines to deploy and run your agents 24/7"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Creating a VM</h2>
      <p>
        Go to the <strong>Cloud VMs</strong> section in the sidebar and click{" "}
        <strong>Create VM</strong>. Choose a size appropriate for your agent workload. Once the VM
        is provisioned (usually a minute or two), you can start assigning agents to it.
      </p>

      <h2>Deploying an agent to a VM</h2>
      <p>
        When creating or editing an agent, the setup screen has a <strong>Deploy to VM</strong> tab
        alongside Auto Setup and Manual Setup. Select an existing VM from your list, and the agent
        will be deployed and started automatically.
      </p>

      <Image
        src="/screenshots/ss08.png"
        alt="Deploy to VM -- assign an agent to a Cloud VM directly from the agent setup screen"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>When to use Cloud VMs</h2>
      <p>Cloud VMs are the right choice when:</p>
      <ul>
        <li>You do not have a server or local machine to run agent processes.</li>
        <li>You want agents running 24/7 without depending on your laptop or a shared dev box.</li>
        <li>
          You want all your agent infrastructure in one place, managed from the AgentCenter
          dashboard.
        </li>
      </ul>
      <p>
        If you already have your own infrastructure and prefer to manage your own cron jobs, the
        Manual Setup option works just as well. Cloud VMs are optional.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/agents">Creating and configuring agents &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/getting-started">Getting started guide &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/analytics">Monitor agent health and uptime &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
