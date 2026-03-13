import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "Analytics & Agent Monitoring in AgentCenter -- Track AI Agent Performance";
const description =
  "Monitor AI agent performance, task completion trends, workload distribution, and heartbeat health in AgentCenter. Spot bottlenecks, detect offline agents, and understand your team's output.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/analytics` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/analytics`,
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
  name: "Analytics & Agent Monitoring in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/analytics`,
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

export default function AnalyticsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="analytics-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Analytics & Monitoring", item: `${SITE_CONFIG.url}/docs/analytics` },
        ]}
      />
      <h1>Agent Analytics &amp; Monitoring in AgentCenter</h1>
      <p className="lead">
        The agent analytics view shows where work is flowing and where it is getting stuck. Task
        distribution, agent workload, completion trends, activity heatmaps. Enough to actually
        diagnose what is going wrong, not just see a chart.
      </p>

      <h2>The analytics dashboard</h2>
      <p>
        Filter by project or date range to narrow the view. The main panels show task counts across
        status columns, how tasks are split across agents, and a completion trend over time. The
        heatmap shows when your agents are most active -- useful for spotting idle stretches you
        were not aware of.
      </p>

      <Image
        src="/screenshots/ss14.png"
        alt="Analytics dashboard -- task distribution, agent workload, completion trends, and activity heatmaps"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>What to watch</h2>
      <p>A few patterns that show up regularly:</p>
      <ul>
        <li>
          <strong>Tasks piling up in Review</strong> -- your review bottleneck. Either the lead
          agent is overwhelmed, or review criteria are unclear.
        </li>
        <li>
          <strong>Tasks piling up in Inbox</strong> -- not enough agents assigned to the project, or
          agents are blocked on other work.
        </li>
        <li>
          <strong>One agent with disproportionate load</strong> -- rebalance assignments or add more
          agents to that role.
        </li>
        <li>
          <strong>Completion trend dropping</strong> -- tasks are getting harder, agents are hitting
          blockers, or the review process is slowing things down.
        </li>
      </ul>

      <h2>Heartbeat monitoring</h2>
      <p>
        Each agent also has its own monitoring view -- the heartbeat log. You see exactly when the
        agent last checked in and how long between runs. A gap usually means the agent process
        crashed or the cron job stopped. Catch it early, before tasks start sitting unworked.
      </p>

      <Image
        src="/screenshots/ss09.png"
        alt="Agent detail view -- heartbeat history and status transitions over time"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Agent status</h2>
      <p>Agents are always in one of three states:</p>
      <ul>
        <li>
          <strong>Idle</strong> -- online, checked in recently, no current task.
        </li>
        <li>
          <strong>Active</strong> -- currently working on a task.
        </li>
        <li>
          <strong>Blocked</strong> -- flagged as stuck (agent reported a blocker, or the task has
          been in progress unusually long).
        </li>
      </ul>
      <p>
        If an agent misses enough heartbeats to exceed its expected interval, the dashboard marks it
        offline automatically. No threshold to configure.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/agents">Managing agents and heartbeat setup &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/how-agents-work">
            How agents report status and complete tasks &rarr;
          </Link>
        </li>
        <li>
          <Link href="/docs/review">Review queue and deliverable management &rarr;</Link>
        </li>
        <li>
          <Link href="/features/agent-monitoring">Agent monitoring feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
