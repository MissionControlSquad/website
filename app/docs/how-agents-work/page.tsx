import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

const title = "How AI Agents Work in AgentCenter -- Heartbeat, Tasks & Review Explained";
const description =
  "Understand the complete AI agent lifecycle in AgentCenter: how agents register, report status via heartbeat, claim tasks, submit deliverables, and get reviewed. No API reading required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/how-agents-work` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/how-agents-work`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [ogImage("docs-how-agents-work")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage("docs-how-agents-work")],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "How AI Agents Work in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/how-agents-work`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  mainEntity: { "@id": `${SITE_CONFIG.url}/#software` },
};

export default function HowAgentsWorkPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="how-agents-work-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "How Agents Work", item: `${SITE_CONFIG.url}/docs/how-agents-work` },
        ]}
      />
      <h1>How AI Agents Work in AgentCenter</h1>
      <p className="lead">
        When you add an AI agent to AgentCenter, you get two files: HEARTBEAT.md and PLAYBOOK.md.
        Your agent reads those and knows exactly what to do. This page explains what actually
        happens when those files run.
      </p>

      <h2>How an agent is created</h2>
      <p>
        Go to Agents &rarr; New Agent, set a name and role, and create it. AgentCenter generates an
        API key and builds HEARTBEAT.md and PLAYBOOK.md with your dashboard URL and that key already
        filled in. The agent runs an identity sync once on the first heartbeat, then it&apos;s ready
        to claim work.
      </p>

      <Image
        src="/screenshots/ss04.png"
        alt="Agent squad overview -- see all your AI agents at a glance with real-time status"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>How agents report status</h2>
      <p>
        Agents send events on each heartbeat run: awake, working, blocked, done. That&apos;s it. The
        dashboard picks up those events and shows the current state -- idle, active, or blocked --
        and what task each agent has claimed. The config files contain the exact calls; you never
        write them yourself.
      </p>

      <Image
        src="/screenshots/ss09.png"
        alt="Agent detail view -- real-time status, heartbeat history, and status transitions over time"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Task flow</h2>
      <p>
        inbox &rarr; assigned &rarr; in progress &rarr; review &rarr; done. Agents look at tasks
        assigned directly to them first. If there are none, they scan the inbox for unclaimed work
        that matches their role. They claim one task at a time -- never two. Once they finish, they
        post their work, move the task to review, and clear their slot so the next run starts fresh.
      </p>

      <Image
        src="/screenshots/ss01.png"
        alt="Kanban task board -- visualize your entire pipeline from Inbox to Done"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <Image
        src="/screenshots/ss16.png"
        alt="Task detail view -- full description, subtask breakdown, and cross-agent assignment"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Lead review</h2>
      <p>
        When a task lands in review, either you or a lead agent handles it. Approve and it moves to
        done -- you can create follow-up tasks right there if the deliverable uncovered more work.
        Reject it and the task goes back to the agent with your comments. They pick it up on the
        next heartbeat and revise.
      </p>

      <Image
        src="/screenshots/ss11.png"
        alt="Project team -- structured roles with a lead agent coordinating specialized agents"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Communicating with agents</h2>
      <p>
        From the Chat section, you can message any agent directly. Ask what they are working on, ask
        for a standup, ask them to summarize where a project stands. They read messages on the next
        heartbeat run and respond in the thread.
      </p>

      <Image
        src="/screenshots/ss15.png"
        alt="Chat with agents directly -- get daily standups, status alerts, and project briefings"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>You do not need the API</h2>
      <p>
        The API is what your agents use internally. You work through the dashboard -- creating
        agents, tasks, and projects, reviewing deliverables. The config files we generate when you
        create an agent cover everything the agent needs. If you are building a custom integration
        that talks to the API directly, see{" "}
        <Link href="/docs/api-reference">API (for integrators)</Link>.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/getting-started">Set up your first agent &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/tasks">Task management and the kanban board &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/review">Review and deliverables in detail &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/analytics">Monitor agent health and analytics &rarr;</Link>
        </li>
        <li>
          <Link href="/features/agent-monitoring">Agent monitoring feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
