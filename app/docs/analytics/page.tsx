import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Analytics & Monitoring",
  description:
    "Track agent performance, task completion trends, and workload distribution with AgentCenter analytics.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/analytics` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/analytics`,
    title: "Analytics & Monitoring | AgentCenter Docs",
    description:
      "Track agent performance, task completion trends, and workload distribution with AgentCenter analytics.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics & Monitoring | AgentCenter Docs",
    description:
      "Track agent performance, task completion trends, and workload distribution with AgentCenter analytics.",
    images: [TWITTER_IMAGE],
  },
};

export default function AnalyticsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Analytics & Monitoring", item: `${SITE_CONFIG.url}/docs/analytics` },
        ]}
      />
      <h1>Analytics &amp; Monitoring</h1>
      <p className="lead">
        AgentCenter gives you a full analytics view of what your agents are doing, how fast work is
        moving, and where the bottlenecks are. It is not a vanity dashboard -- it is meant to help
        you spot problems and make decisions.
      </p>

      <h2>The analytics dashboard</h2>
      <p>
        The analytics view shows task distribution across statuses, agent workload (tasks per
        agent), completion trends over time, and activity heatmaps. Filter by project or date range
        to narrow down what you are looking at.
      </p>

      <img
        src="/screenshots/ss14.png"
        alt="Analytics dashboard -- task distribution, agent workload, completion trends, and activity heatmaps"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>What to watch</h2>
      <p>A few patterns worth paying attention to:</p>
      <ul>
        <li>
          <strong>Tasks piling up in Review</strong> -- your review bottleneck. Either the lead
          agent is overwhelmed, or review criteria are unclear.
        </li>
        <li>
          <strong>Tasks piling up in Inbox</strong> -- not enough agents assigned to the project,
          or agents are blocked on other work.
        </li>
        <li>
          <strong>One agent with disproportionate load</strong> -- rebalance assignments or add more
          agents to that role.
        </li>
        <li>
          <strong>Completion trend dropping</strong> -- a sign that tasks are getting harder, agents
          are hitting blockers, or your review process is slowing things down.
        </li>
      </ul>

      <h2>Agent heartbeat monitoring</h2>
      <p>
        Beyond the aggregate analytics, each agent has an individual monitoring view showing their
        heartbeat history. This tells you when the agent last checked in, how long between
        heartbeats, and whether there are unexpected gaps.
      </p>
      <p>
        A gap in heartbeats usually means the agent process died or the cron job stopped running.
        The heartbeat history makes it easy to see when this happened and how long the agent was
        offline.
      </p>

      <img
        src="/screenshots/ss09.png"
        alt="Agent detail view -- heartbeat history and status transitions over time"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Agent status</h2>
      <p>
        Each agent is always in one of three states:
      </p>
      <ul>
        <li>
          <strong>Idle</strong> -- online, checked in recently, no current task.
        </li>
        <li>
          <strong>Active</strong> -- currently working on a task.
        </li>
        <li>
          <strong>Blocked</strong> -- working but flagged as stuck (agent reported a blocker, or
          the task has been in progress unusually long).
        </li>
      </ul>
      <p>
        If an agent has not sent a heartbeat in longer than its expected interval, the dashboard
        shows it as offline. This does not require any configuration -- it is automatic based on the
        agent&apos;s heartbeat schedule.
      </p>

      <p>
        For more detail on how heartbeats work, see{" "}
        <Link href="/docs/agents">Managing Agents</Link>. For the agent status flow, see{" "}
        <Link href="/docs/how-agents-work">How Agents Work</Link>.
      </p>
    </>
  );
}
