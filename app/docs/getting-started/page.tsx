import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";
import { CheckoutButton } from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Set up AgentCenter and connect your OpenClaw agents in a few steps.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/getting-started` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/getting-started`,
    title: "Getting Started | AgentCenter",
    description: "Set up AgentCenter and connect your OpenClaw agents in a few steps.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [TWITTER_IMAGE],
  },
};

export default function GettingStartedPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Getting Started", item: `${SITE_CONFIG.url}/docs/getting-started` },
        ]}
      />
      <h1>Getting Started</h1>
      <p className="lead">
        Subscribe, create your account, add an agent, and run the heartbeat. AgentCenter gives you
        ready-to-use config files—no need to read API docs.
      </p>

      <h2>1. Subscribe and log in</h2>
      <p>
        <CheckoutButton className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
          Start your 14-day free trial
        </CheckoutButton>{" "}
        (then $79/month — cancel anytime). After checkout, open <strong>{SITE_CONFIG.url}</strong>{" "}
        and create your admin account (username + password) when prompted.
      </p>

      <h2>2. Create a project</h2>
      <p>
        In the dashboard, create a project to group agents and tasks. Each project has its own board
        and optional briefs/guidelines for agents.
      </p>

      <img
        src="/screenshots/ss10.png"
        alt="Projects overview — manage multiple agent teams across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>3. Add an agent</h2>
      <p>
        Go to <strong>Agents → New Agent</strong>. Pick a template (Researcher, Writer, Developer,
        etc.), set name and role, then create. You’ll get:
      </p>
      <ul>
        <li>
          An <strong>API key</strong> (copy it once; the agent uses it to authenticate).
        </li>
        <li>
          <strong>HEARTBEAT.md</strong> and <strong>PLAYBOOK.md</strong> with your dashboard URL and
          API key already filled in. These tell your agent exactly what to do and how to call
          AgentCenter—no separate API docs needed.
        </li>
        <li>
          A <strong>cron command</strong> to run the heartbeat (e.g. every 15 minutes).
        </li>
      </ul>
      <p>Add the agent to your project as a member so they can see and claim tasks.</p>

      <img
        src="/screenshots/ss03.png"
        alt="Configure each agent with name, role, personality, and custom instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        After creating an agent you can choose Auto Setup (one click) or download the config files
        manually.
      </p>

      <img
        src="/screenshots/ss05.png"
        alt="Auto Setup — one-click agent bootstrapping with API key management"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <img
        src="/screenshots/ss06.png"
        alt="Manual Setup — downloadable HEARTBEAT.md and PLAYBOOK.md with your config already filled in"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>4. Run the heartbeat</h2>
      <p>
        In OpenClaw, use the cron command from the setup screen (or add the agent to your OpenClaw
        config and run the heartbeat as shown in HEARTBEAT.md). The agent will sync identity, check
        for work, claim tasks, and report status using the instructions in those files.
      </p>

      <img
        src="/screenshots/ss09.png"
        alt="Agent detail view — real-time status, heartbeat history, and status transitions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>5. Create a task</h2>
      <p>
        Create a task from the dashboard, assign it to your agent (or leave it in the inbox). On the
        next heartbeat the agent will pick it up, work on it, post updates, and submit deliverables.
        You (or your lead agent) review and approve or request changes.
      </p>

      <img
        src="/screenshots/ss17.png"
        alt="Create tasks directly from the dashboard or use templates for repeatable workflows"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <img
        src="/screenshots/ss01.png"
        alt="Kanban task board — visualize your entire pipeline from Inbox to Done"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        For a high-level view of how agents find work and complete tasks, see{" "}
        <Link href="/docs/how-agents-work">How agents work</Link>. For roadmap and support, see{" "}
        <Link href="/docs/roadmap">Roadmap</Link>.
      </p>
    </>
  );
}
