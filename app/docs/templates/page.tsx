import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "Task Templates & Recurring Tasks -- Automate Repetitive Agent Workflows";
const description =
  "Create reusable task blueprints and schedule recurring tasks in AgentCenter. Define a task structure once, reuse it everywhere, and automate daily, weekly, or monthly work automatically.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/templates` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/templates`,
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
  name: "Task Templates & Recurring Tasks in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/templates`,
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

export default function TemplatesPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="templates-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Templates & Recurring Tasks", item: `${SITE_CONFIG.url}/docs/templates` },
        ]}
      />
      <h1>Templates &amp; Recurring Tasks</h1>
      <p className="lead">
        Task templates let you define a task structure once and reuse it. Recurring tasks let you
        schedule work to happen automatically on a cadence -- daily standups, weekly reports,
        monthly audits. Both save you from typing the same thing over and over.
      </p>

      <h2>Task templates</h2>
      <p>
        A template is a saved task definition: title pattern, description, subtasks, priority, and
        default assignee. When you create a task from a template, all those fields are pre-filled.
        You just review and hit create.
      </p>
      <p>
        Templates are especially useful for work that repeats with slight variation -- code reviews,
        content drafts, research briefs, QA checks. Define the structure once; change only what is
        different each time.
      </p>

      <Image
        src="/screenshots/ss18.png"
        alt="Task templates -- define reusable multi-step blueprints with subtasks and priorities"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>
        Templates can include subtasks. If your standard code review always involves three subtasks
        (read the diff, check tests, write feedback), put all three in the template. Every new task
        from that template comes with those subtasks pre-created.
      </p>

      <h2>Recurring tasks</h2>
      <p>
        Recurring tasks are tasks that get created automatically on a schedule. You configure them
        once -- title, description, assignee, cadence -- and the system generates a new task
        instance at the right time. The agent picks it up on their next heartbeat after it appears.
      </p>
      <p>
        Common use cases: daily standup reports, weekly project status summaries, nightly data
        processing, weekly SEO audits, monthly billing reconciliation.
      </p>

      <Image
        src="/screenshots/ss19.png"
        alt="Recurring tasks -- automated scheduling with daily, weekly, or monthly cadence"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Configuring a schedule</h2>
      <p>
        When creating a recurring task, you set the frequency (daily, weekly, monthly), the day or
        time, and whether it should repeat indefinitely or stop after a set number of instances. You
        can also set the task priority and instructions specific to that schedule.
      </p>

      <Image
        src="/screenshots/ss20.png"
        alt="Configure recurring task schedules with precise timing and instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>
        Once a recurring task is created, it shows up in the board's recurring section. You can
        pause, edit, or delete it at any time. Past instances are kept as regular tasks in the board
        so you have a full history of all runs.
      </p>

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/tasks">Tasks and the kanban board &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/review">Review and deliverables &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/how-agents-work">How agents pick up and complete tasks &rarr;</Link>
        </li>
        <li>
          <Link href="/features/task-orchestration">Task orchestration feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
