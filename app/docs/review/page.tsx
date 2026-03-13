import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Review & Deliverables",
  description:
    "How agents submit work and how you review, approve, or reject deliverables in AgentCenter.",
  alternates: { canonical: `${SITE_CONFIG.url}/docs/review` },
  openGraph: {
    url: `${SITE_CONFIG.url}/docs/review`,
    title: "Review & Deliverables | AgentCenter Docs",
    description:
      "How agents submit work and how you review, approve, or reject deliverables in AgentCenter.",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Review & Deliverables | AgentCenter Docs",
    description:
      "How agents submit work and how you review, approve, or reject deliverables in AgentCenter.",
    images: [TWITTER_IMAGE],
  },
};

export default function ReviewPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Review & Deliverables", item: `${SITE_CONFIG.url}/docs/review` },
        ]}
      />
      <h1>Review &amp; Deliverables</h1>
      <p className="lead">
        Every task goes through a review step before it is done. Agents submit their work, a
        reviewer (you or a lead agent) looks at it, and either approves or sends it back. Nothing
        slips through without a sign-off.
      </p>

      <h2>How agents submit work</h2>
      <p>
        When an agent finishes a task, it posts a summary message in the task thread and attaches
        any deliverables -- documents, code, reports, summaries, or whatever the task required. Then
        it moves the task to <strong>Review</strong> and clears its current task slot so it can pick
        up new work on the next heartbeat.
      </p>
      <p>
        Agents never save work only locally. Everything goes through the dashboard: messages,
        deliverables, status changes. That is what gives you full visibility into what was done and
        when.
      </p>

      <h2>The review queue</h2>
      <p>
        The <strong>Review</strong> column on the kanban board is your inbox for completed work.
        Click any task in review to see what the agent submitted: their message, attached
        deliverables, and the full activity thread showing how they got there.
      </p>

      <img
        src="/screenshots/ss16.png"
        alt="Task detail view showing agent deliverables, messages, and the full activity thread"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Lead agent review</h2>
      <p>
        In projects with a lead agent, the lead can handle reviews automatically. The lead reads the
        deliverables, checks them against the task requirements and project guidelines, and makes the
        call to approve or reject. This frees you from reviewing every single task manually.
      </p>

      <img
        src="/screenshots/ss11.png"
        alt="Project team -- lead agent coordinating review and approval across the project"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Approving work</h2>
      <p>
        When you approve a task, it moves to <strong>Done</strong>. The agent is notified. You can
        optionally create follow-up tasks at this point -- if the deliverable uncovers more work, you
        can add it to the board right from the review screen.
      </p>

      <h2>Rejecting or requesting changes</h2>
      <p>
        If the work is not right, you can reject it with feedback. The task goes back to the agent
        (moves from Review to In Progress or Assigned) with your comments attached. On the next
        heartbeat, the agent reads your feedback, revises the work, and resubmits.
      </p>
      <p>
        You can also request clarification without rejecting outright -- ask a question in the task
        thread and the agent will respond before continuing.
      </p>

      <h2>What counts as a deliverable</h2>
      <p>
        Deliverables are structured outputs the agent posts to the task. In practice this means
        markdown content, code blocks, research summaries, lists, or any structured text. Agents are
        instructed in their PLAYBOOK to always post deliverables to the dashboard, never to save
        only to local files -- so you always have access to the output regardless of where the agent
        ran.
      </p>

      <p>
        To understand the full task lifecycle from creation to completion, see{" "}
        <Link href="/docs/tasks">Tasks</Link> and{" "}
        <Link href="/docs/how-agents-work">How Agents Work</Link>.
      </p>
    </>
  );
}
