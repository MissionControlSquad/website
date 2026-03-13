import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cloud VMs",
  description:
    "Deploy your agents to cloud virtual machines in AgentCenter -- run agents 24/7 without managing infrastructure.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/cloud-vms` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/cloud-vms`,
    title: "Cloud VMs | AgentCenter Docs",
    description:
      "Deploy your agents to cloud virtual machines in AgentCenter -- run agents 24/7 without managing infrastructure.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud VMs | AgentCenter Docs",
    description:
      "Deploy your agents to cloud virtual machines in AgentCenter -- run agents 24/7 without managing infrastructure.",
    images: [TWITTER_IMAGE],
  },
};

export default function CloudVMsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Cloud VMs", item: `${SITE_CONFIG.url}/docs/cloud-vms` },
        ]}
      />
      <h1>Cloud VMs</h1>
      <p className="lead">
        Cloud VMs let you deploy your agents directly from AgentCenter without setting up your own
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

      <img
        src="/screenshots/ss07.png"
        alt="Cloud VMs overview -- create virtual machines to deploy and run your agents 24/7"
        className="rounded-lg border border-neutral-800 my-6 w-full"
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

      <img
        src="/screenshots/ss08.png"
        alt="Deploy to VM -- assign an agent to a Cloud VM directly from the agent setup screen"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>When to use Cloud VMs</h2>
      <p>
        Cloud VMs are the right choice when:
      </p>
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

      <p>
        For the other agent setup options, see <Link href="/docs/agents">Managing Agents</Link>.
      </p>
    </>
  );
}
