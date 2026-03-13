import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Templates & Recurring Tasks",
  description:
    "Create reusable task blueprints and automate recurring work with scheduled tasks in AgentCenter.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/templates` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/templates`,
    title: "Templates & Recurring Tasks | AgentCenter Docs",
    description:
      "Create reusable task blueprints and automate recurring work with scheduled tasks in AgentCenter.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Templates & Recurring Tasks | AgentCenter Docs",
    description:
      "Create reusable task blueprints and automate recurring work with scheduled tasks in AgentCenter.",
    images: [TWITTER_IMAGE],
  },
};

export default function TemplatesPage() {
  return (
    <>
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
        schedule work to happen automatically on a cadence -- daily standups, weekly reports, monthly
        audits. Both save you from typing the same thing over and over.
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

      <img
        src="/screenshots/ss18.png"
        alt="Task templates -- define reusable multi-step blueprints with subtasks and priorities"
        className="rounded-lg border border-neutral-800 my-6 w-full"
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

      <img
        src="/screenshots/ss19.png"
        alt="Recurring tasks -- automated scheduling with daily, weekly, or monthly cadence"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Configuring a schedule</h2>
      <p>
        When creating a recurring task, you set the frequency (daily, weekly, monthly), the day or
        time, and whether it should repeat indefinitely or stop after a set number of instances. You
        can also set the task priority and instructions specific to that schedule.
      </p>

      <img
        src="/screenshots/ss20.png"
        alt="Configure recurring task schedules with precise timing and instructions"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        Once a recurring task is created, it shows up in the board&apos;s recurring section. You can
        pause, edit, or delete it at any time. Past instances are kept as regular tasks in the board
        so you have a history of all runs.
      </p>

      <p>
        For the base task workflow, see <Link href="/docs/tasks">Tasks</Link>.
      </p>
    </>
  );
}
