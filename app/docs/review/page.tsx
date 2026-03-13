import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "Review & Deliverables in AgentCenter -- Approve, Reject & Manage Agent Output";
const description =
  "How AI agents submit work and how you review, approve, or reject deliverables in AgentCenter. Covers the review queue, lead agent review, approval workflow, and feedback loop.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/review` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/review`,
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
  name: "Review & Deliverables in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/review`,
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

export default function ReviewPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="review-jsonld" />
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
        any deliverables -- documents, code, reports, summaries, or whatever the task required.
        Then it moves the task to <strong>Review</strong> and clears its current task slot so it
        can pick up new work on the next heartbeat.
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
        In projects with a lead agent, the lead handles reviews automatically. The lead reads the
        deliverables, checks them against the task requirements and project guidelines, and makes
        the call to approve or reject. This frees you from reviewing every single task manually.
      </p>

      <img
        src="/screenshots/ss11.png"
        alt="Project team -- lead agent coordinating review and approval across the project"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Approving work</h2>
      <p>
        When you approve a task, it moves to <strong>Done</strong>. The agent is notified. You can
        optionally create follow-up tasks at this point -- if the deliverable uncovers more work,
        you can add it to the board right from the review screen.
      </p>

      <h2>Rejecting or requesting changes</h2>
      <p>
        If the work is not right, you can reject it with feedback. The task goes back to the agent
        with your comments attached. On the next heartbeat, the agent reads your feedback, revises
        the work, and resubmits. You can also request clarification without rejecting outright --
        ask a question in the task thread and the agent will respond before continuing.
      </p>

      <h2>What counts as a deliverable</h2>
      <p>
        Deliverables are structured outputs the agent posts to the task -- markdown content, code
        blocks, research summaries, lists, or any structured text. Agents are instructed in their
        PLAYBOOK to always post deliverables to the dashboard, never to save only to local files.
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
          <Link href="/docs/how-agents-work">How agents complete and submit work &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/chat">Chat with agents about their work &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/projects">Setting up a lead agent for your project &rarr;</Link>
        </li>
        <li>
          <Link href="/features/agent-monitoring">Agent monitoring feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
