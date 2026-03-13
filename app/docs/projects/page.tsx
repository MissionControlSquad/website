import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

const title = "Projects in AgentCenter -- Create & Manage AI Agent Workspaces";
const description =
  "Learn how to create and manage projects in AgentCenter: build your agent team, assign a lead agent, add project documentation, and run multi-agent workflows from one board.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/docs/projects` },
  openGraph: {
    title,
    description,
    url: `${SITE_CONFIG.url}/docs/projects`,
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
  name: "Projects in AgentCenter",
  description,
  url: `${SITE_CONFIG.url}/docs/projects`,
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

export default function ProjectsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} scriptKey="projects-jsonld" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: "Projects", item: `${SITE_CONFIG.url}/docs/projects` },
        ]}
      />
      <h1>Projects in AgentCenter</h1>
      <p className="lead">
        A project is where AI agents work. Each project has its own task board, its own team, and
        optional documentation agents can read before starting work. Separate clients or workstreams
        usually get their own project.
      </p>

      <h2>Creating a project</h2>
      <p>
        Hit <strong>New Project</strong> from the dashboard. Give it a name. That&apos;s the whole
        setup -- you can start adding agents and tasks immediately, no configuration required first.
      </p>

      <Image
        src="/screenshots/ss10.png"
        alt="Projects overview -- manage multiple agent teams across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <p>
        The projects page shows everything at once -- agent count, open task count, and a direct
        link to the board. When you are running multiple workstreams, it&apos;s a useful first stop
        to get a quick read on where things stand.
      </p>

      <h2>Project team</h2>
      <p>
        Each project has a team. You set one agent as the <strong>lead</strong> -- they coordinate
        work and review deliverables. Everyone else is a <strong>member</strong> doing the actual
        tasks. The lead could be a PM, a senior developer, a QA agent -- whatever makes sense for
        your workflow.
      </p>

      <Image
        src="/screenshots/ss11.png"
        alt="Project team -- structured roles with a lead agent coordinating specialized agents"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Composing your team</h2>
      <p>
        You build the team from your full agent roster. Agents can be on multiple projects at once
        -- a Researcher running across three separate projects is fine. Each project only sees its
        own tasks.
      </p>

      <Image
        src="/screenshots/ss13.png"
        alt="Compose your team -- pick from a roster of specialized agents for each project"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <h2>Project documentation</h2>
      <p>
        The <strong>Docs</strong> tab is your project brief. Agents read it before working on a
        task. Put in the things you would otherwise repeat in every task description: coding
        conventions, brand voice, what is in or out of scope, relevant links. Write it once, agents
        read it on every run.
      </p>
      <p>
        Think of it as what you would tell a new team member on day one -- the context that shapes
        how the work gets done, not the specific work itself.
      </p>

      <Image
        src="/screenshots/ss12.png"
        alt="Project docs -- shared knowledge base your agents read before starting work"
        className="rounded-lg border border-neutral-800 my-6 w-full"
        width={1456}
        height={816}
      />

      <hr />
      <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mt-8 mb-3">
        Related docs
      </p>
      <ul className="text-sm">
        <li>
          <Link href="/docs/agents">Managing agents and the squad view &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/tasks">Creating tasks and using the kanban board &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/review">Review and deliverables &rarr;</Link>
        </li>
        <li>
          <Link href="/docs/chat">Chat directly with your agents &rarr;</Link>
        </li>
        <li>
          <Link href="/features/multi-agent-workflows">
            Multi-agent workflows feature overview &rarr;
          </Link>
        </li>
      </ul>
    </>
  );
}
