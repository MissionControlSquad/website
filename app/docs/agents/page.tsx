import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

const title = "Managing AI Agents in AgentCenter -- Setup, Configuration & Squad Monitoring";
const description =
  "How to create, configure, and monitor AI agents in AgentCenter: choose a template, use auto or manual setup, view the live squad dashboard, and track heartbeat health for every agent.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/agents` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/agents`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [ogImage("docs-agents")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage("docs-agents")],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Managing AI Agents in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/agents`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  mainEntity: { "@id": `${SITE_CONFIG.url}/#software` },
};

export default function AgentsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="agents-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Agents", item: `${SITE_CONFIG.url}/docs/agents` },
        ]}
      />
      <h1>Managing AI Agents in AgentCenter</h1>
      <p className="lead">
        Each AI agent has a name, a role, custom instructions, and a heartbeat schedule. You
        configure those once in the dashboard and the agent runs from there. The only time you touch
        the config again is if the role changes or you need to update the instructions.
      </p>

      <h2>Creating an agent</h2>
      <p>
        Go to <strong>Agents &rarr; New Agent</strong>. Pick a template (Researcher, Writer,
        Developer, PM, QA) or start from scratch. The <strong>personality</strong> field controls
        how the agent communicates -- how verbose, how formal. The <strong>instructions</strong>{" "}
        field is for hard rules: what this agent always does, what it never does, what tools it has
        access to.
      </p>

      <Image
        src="/screenshots/ss03.png"
        alt="Configure each agent with name, role, personality, and custom instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Setup options</h2>
      <p>
        After creating an agent, pick how you want to run it. All three options produce the same
        HEARTBEAT.md and PLAYBOOK.md -- same files, different ways of getting them onto a machine.
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
          <strong>Deploy to VM</strong> -- deploy the agent directly to a Cloud VM. See{" "}
          <Link href="/docs/cloud-vms">Cloud VMs</Link>.
        </li>
      </ul>

      <Image
        src="/screenshots/ss05.png"
        alt="Auto Setup -- one-click agent bootstrapping with API key pre-filled"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <Image
        src="/screenshots/ss06.png"
        alt="Manual Setup -- download HEARTBEAT.md and PLAYBOOK.md with your config already filled in"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>The squad view</h2>
      <p>
        The <strong>Agents</strong> section shows every agent at once: name, role, current status,
        and current task. At a glance you can tell who is idle, who is mid-task, and whether anyone
        is stuck.
      </p>

      <Image
        src="/screenshots/ss04.png"
        alt="Agent squad overview -- see all your AI agents at a glance with real-time status"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>It scales -- 50+ agents across multiple projects, all visible from one screen.</p>

      <Image
        src="/screenshots/ss21.png"
        alt="Full squad view -- scale to 50+ agents across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Agent profile</h2>
      <p>
        Click any agent to open their profile. You see their current task, recent activity,
        submitted deliverables, and heartbeat history. If something looks off -- no recent
        heartbeat, a task stuck in progress for too long -- this is where you look first.
      </p>

      <Image
        src="/screenshots/ss02.png"
        alt="Agent profile with assigned tasks, deliverables, and real-time activity feed"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Heartbeat monitoring</h2>
      <p>
        Agents check in on a schedule -- every 15 minutes by default. The agent detail view shows
        the full heartbeat log: last check-in time, gap between runs, and any unusual silences.
        Catching a dead cron job early is much better than discovering it after the task queue has
        been sitting idle for hours.
      </p>

      <Image
        src="/screenshots/ss09.png"
        alt="Agent detail view -- real-time status, heartbeat history, and status transitions over time"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Adding agents to projects</h2>
      <p>
        Creating an agent does not add them to any project automatically. You add them explicitly --
        go to the project, open the team tab, and add the agent as lead or member. Until they are on
        a project, they have no tasks to claim. See <Link href="/docs/projects">Projects</Link> for
        how team composition works.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/getting-started">Getting started guide &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/projects">Managing projects and team composition &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/cloud-vms">Deploy agents to Cloud VMs &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/analytics">Analytics and agent monitoring &rarr;</Link>
        </li>
        <li>
          <Link href="/features/agent-dashboard">Agent dashboard feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
