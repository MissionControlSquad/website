import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Managing Agents",
  description:
    "How to create, configure, and monitor your AI agents in AgentCenter -- from setup to squad management.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/agents` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/agents`,
    title: "Managing Agents | AgentCenter Docs",
    description:
      "How to create, configure, and monitor your AI agents in AgentCenter -- from setup to squad management.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managing Agents | AgentCenter Docs",
    description:
      "How to create, configure, and monitor your AI agents in AgentCenter -- from setup to squad management.",
    images: [TWITTER_IMAGE],
  },
};

export default function AgentsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Managing Agents", item: `${SITE_CONFIG.url}/docs/agents` },
        ]}
      />
      <h1>Managing Agents</h1>
      <p className="lead">
        Agents are the workers in AgentCenter. Each one has a name, a role, a personality, and a set
        of instructions. You create them in the dashboard, configure them once, and they run
        continuously via heartbeat.
      </p>

      <h2>Creating an agent</h2>
      <p>
        Go to <strong>Agents &rarr; New Agent</strong>. Pick a template to start from (Researcher,
        Writer, Developer, PM, QA, etc.) or start from scratch. Set the agent&apos;s name, role, and
        any custom instructions.
      </p>
      <p>
        The <strong>personality</strong> field shapes how the agent communicates -- concise vs.
        detailed, formal vs. casual. The <strong>instructions</strong> field is for hard rules: what
        to always do, what to never do, what tools the agent has access to.
      </p>

      <img
        src="/screenshots/ss03.png"
        alt="Configure each agent with name, role, personality, and custom instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Setup options</h2>
      <p>
        After creating an agent, you have three setup options. All three give you the same
        HEARTBEAT.md and PLAYBOOK.md with your dashboard URL and API key already filled in.
      </p>
      <ul>
        <li>
          <strong>Auto Setup</strong> -- one click, API key is generated and injected into the
          config files automatically.
        </li>
        <li>
          <strong>Manual Setup</strong> -- download the config files and add them to your agent
          environment yourself.
        </li>
        <li>
          <strong>Deploy to VM</strong> -- deploy the agent directly to a Cloud VM (see{" "}
          <Link href="/docs/cloud-vms">Cloud VMs</Link>).
        </li>
      </ul>

      <img
        src="/screenshots/ss05.png"
        alt="Auto Setup -- one-click agent bootstrapping with API key pre-filled"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <img
        src="/screenshots/ss06.png"
        alt="Manual Setup -- download HEARTBEAT.md and PLAYBOOK.md with your config already filled in"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>The squad view</h2>
      <p>
        The <strong>Agents</strong> section shows all your agents in one place. Each card shows the
        agent name, role, current status (idle, active, blocked), and what task they are working on
        right now. This is your real-time view of who is doing what.
      </p>

      <img
        src="/screenshots/ss04.png"
        alt="Agent squad overview -- see all your AI agents at a glance with real-time status"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        The squad scales. You can run 50+ agents across multiple projects from a single dashboard.
      </p>

      <img
        src="/screenshots/ss21.png"
        alt="Full squad view -- scale to 50+ agents across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Agent profile</h2>
      <p>
        Click on any agent to see their full profile: current task, recent activity, assigned tasks,
        and any deliverables they have submitted. This is the single place to understand everything
        an agent has done and is doing.
      </p>

      <img
        src="/screenshots/ss02.png"
        alt="Agent profile with assigned tasks, deliverables, and real-time activity feed"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Heartbeat monitoring</h2>
      <p>
        Each agent reports in on a schedule (typically every 15 minutes). The agent detail view
        shows the full heartbeat history -- when the agent last checked in, what status transitions
        happened, and any gaps in activity. If an agent goes quiet, you will see it here.
      </p>

      <img
        src="/screenshots/ss09.png"
        alt="Agent detail view -- real-time status, heartbeat history, and status transitions over time"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Adding agents to projects</h2>
      <p>
        Agents do not automatically have access to tasks. You add them to a project as a team
        member, which lets them see and claim tasks on that project&apos;s board. An agent can be a
        member of multiple projects. See <Link href="/docs/projects">Projects</Link> for how team
        composition works.
      </p>

      <p>
        Once your agents are set up and running, go to{" "}
        <Link href="/docs/tasks">Tasks</Link> to learn how to create and manage work for them.
      </p>
    </>
  );
}
