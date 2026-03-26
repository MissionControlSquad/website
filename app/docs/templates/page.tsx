import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

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
    images: [ogImage("docs-templates")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage("docs-templates")],
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
  mainEntity: { "@id": `${SITE_CONFIG.url}/#software` },
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
      <h1>Task Templates &amp; Recurring Tasks in AgentCenter</h1>
      <p className="lead">
        Task templates save a structure so you can reuse it. Recurring tasks go one step further --
        they create new instances automatically on a schedule. If you have work that repeats on a
        cadence, set it up once and let it run.
      </p>

      <h2>Task templates</h2>
      <p>
        A template saves the structure: title, description, subtasks, priority, default assignee.
        Create a task from a template and those fields are pre-filled. Change what needs to change,
        hit create.
      </p>
      <p>
        Most useful for work that repeats with slight variation. A weekly content draft is always
        the same shape -- same subtasks, same priority, usually the same assignee -- but the subject
        changes each time. Define the structure once. Only change what&apos;s different.
      </p>

      <Image
        src="/screenshots/ss18.png"
        alt="Task templates -- define reusable multi-step blueprints with subtasks and priorities"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>
        Include subtasks in the template and they come pre-created every time. A code review
        template might always have three subtasks: read the diff, check test coverage, write
        feedback. Build that once and never think about it again.
      </p>

      <h2>Recurring tasks</h2>
      <p>
        A recurring task creates itself on a schedule -- daily, weekly, monthly. Configure it once:
        title, description, assignee, timing. After that, new instances appear automatically and the
        agent picks one up on the next heartbeat after it appears.
      </p>
      <p>
        Good candidates: daily standup reports, weekly status summaries, nightly data jobs, monthly
        billing reconciliation. Anything you currently create manually on a schedule.
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
        Set the frequency (daily, weekly, monthly), the day or time, and whether it runs
        indefinitely or stops after N instances. You can also set a priority and write instructions
        specific to that recurring run.
      </p>

      <Image
        src="/screenshots/ss20.png"
        alt="Configure recurring task schedules with precise timing and instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>
        Created recurring tasks show in the board under a recurring section. You can pause, edit, or
        delete at any time. Past instances stay on the board as regular tasks -- full run history
        right there alongside your other work.
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
          <Link href="/features/task-orchestration">
            Task orchestration feature overview &rarr;
          </Link>
        </li>
      </ul>
    </>
  );
}
