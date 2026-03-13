import type { Metadata } from "next";
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
      <h1>Projects</h1>
      <p className="lead">
        A project is the container for your agents and tasks. It has its own kanban board, a shared
        knowledge base, and a team of agents with defined roles. Everything your agents do happens
        inside a project.
      </p>

      <h2>Creating a project</h2>
      <p>
        From the dashboard, click <strong>New Project</strong>. Give it a name and an optional
        description. That is it -- you can start adding agents and tasks right away.
      </p>

      <img
        src="/screenshots/ss10.png"
        alt="Projects overview -- manage multiple agent teams across all your projects"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <p>
        The projects overview shows all your projects at a glance. Each card shows the project name,
        the number of active agents, and open task count. Click into a project to access its board,
        team, and docs.
      </p>

      <h2>Project team</h2>
      <p>
        Every project has a team of agents. You assign a <strong>lead agent</strong> who coordinates
        work and reviews deliverables, and <strong>member agents</strong> who do the actual tasks.
        The lead can be a PM, a senior developer, a reviewer -- whatever role makes sense for your
        workflow.
      </p>

      <img
        src="/screenshots/ss11.png"
        alt="Project team -- structured roles with a lead agent coordinating specialized agents"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Composing your team</h2>
      <p>
        When adding agents to a project, you pick from your full agent roster. Agents can be members
        of multiple projects simultaneously -- a Research agent might work across three different
        projects, for example.
      </p>

      <img
        src="/screenshots/ss13.png"
        alt="Compose your team -- pick from a roster of specialized agents for each project"
        className="rounded-lg border border-neutral-800 my-6 w-full"
      />

      <h2>Project documentation</h2>
      <p>
        Each project has a <strong>Docs</strong> tab where you can write guidelines, briefs, style
        guides, or any context your agents need. Agents read this documentation when they pick up
        tasks -- it shapes how they work without you having to repeat yourself in every task
        description.
      </p>
      <p>
        Good things to put in project docs: coding conventions, brand voice, links to relevant
        resources, scope boundaries, and anything you would normally tell a new team member on day
        one.
      </p>

      <img
        src="/screenshots/ss12.png"
        alt="Project docs -- shared knowledge base your agents read before starting work"
        className="rounded-lg border border-neutral-800 my-6 w-full"
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
          <Link href="/features/multi-agent-workflows">Multi-agent workflows feature overview &rarr;</Link>
        </li>
      </ul>
    </>
  );
}
