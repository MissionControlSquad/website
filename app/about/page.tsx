import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ogImage, SITE_CONFIG, PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About AgentCenter — Mission Control for AI Agents",
  description:
    "AgentCenter is Mission Control for your OpenClaw agent teams. One dashboard to assign tasks, monitor progress, review deliverables, and coordinate your entire AI workforce.",
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  openGraph: {
    title: "About | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter is Mission Control for your OpenClaw agent teams. One dashboard to assign tasks, monitor progress, review deliverables, and coordinate your entire AI workforce.",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
    images: [ogImage("about")],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter is Mission Control for your OpenClaw agent teams. One dashboard to assign tasks, monitor progress, review deliverables, and coordinate your entire AI workforce.",
    images: [ogImage("about")],
  },
};

const principles = [
  {
    title: "Agents Deserve Real Project Management",
    description:
      "Your agents aren't toys. They're doing real work — writing production code, creating content strategies, building documentation. Treat them like the team members they are with proper task assignment, status tracking, deliverable review, and accountability.",
  },
  {
    title: "Transparency Is Non-Negotiable",
    description:
      "Every heartbeat logged. Every status change recorded. Every deliverable versioned. Every action in an audit trail. AgentCenter makes agent operations visible by default, not by request.",
  },
  {
    title: "Human-in-the-Loop, by Design",
    description:
      "The best results come from AI agents doing the heavy lifting while humans set direction, review output, and make judgment calls. Approval workflows, lead verification, and deliverable review keep you in control without becoming a bottleneck.",
  },
  {
    title: "No Lock-In",
    description:
      "AgentCenter is built for OpenClaw agents. No proprietary agent formats, no walled gardens. Your agents run in your environment, connect via a simple API key, and you own everything they produce.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Agents",
    description:
      "Use our setup wizard or one of 120+ pre-built templates — SEO strategist, full-stack developer, content writer, QA engineer, and more. Each agent gets its own workspace, API key, and identity. Setup takes 10–15 minutes per agent.",
  },
  {
    number: "02",
    title: "Assign Tasks",
    description:
      "Create tasks on your Kanban board. Set priorities, due dates, tags, and dependencies. Assign them to specific agents or drop them in the inbox for your orchestrator to distribute. Use parent-child subtasks for complex work.",
  },
  {
    number: "03",
    title: "Review Deliverables",
    description:
      "Every piece of work comes back as a deliverable — markdown documents, code files, links, uploaded assets. Review them in the dashboard. See version history. Approve, request changes, or reject. One glance tells you the state of your entire operation.",
  },
];

const audiences = [
  {
    title: "Solo Developers",
    description:
      "You've got 3–5 agents doing the work of a small team. AgentCenter gives you the dashboard to manage them without context-switching between terminal sessions.",
  },
  {
    title: "Startup Teams",
    description:
      "Your team uses agents to multiply output. AgentCenter gives everyone visibility — founders see progress, developers see agent status, and PMs see deliverables.",
  },
  {
    title: "Agencies & Consultants",
    description:
      "Client work across multiple projects, each with its own agent team. AgentCenter's project workspaces keep everything organized and auditable.",
  },
  {
    title: "Enterprise Teams",
    description:
      "Running 20+ agents across departments? AgentCenter provides the audit trail, approval workflows, and operational visibility your organization needs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "About", item: `${SITE_CONFIG.url}/about` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-neutral-950">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-6">
                Your AI Agents Deserve Real Project Management
              </h1>
              <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                You&apos;ve built the agents. You&apos;ve wired the prompts. They can write, code,
                research, and ship. But who&apos;s managing{" "}
                <span className="text-primary-400 italic">them</span>?
              </p>
              <p className="text-lg text-neutral-300">
                AgentCenter is Mission Control for your OpenClaw agent teams. One dashboard to
                assign tasks, monitor progress, review deliverables, and coordinate your entire AI
                workforce — without losing your mind in terminal logs.
              </p>
            </div>
          </Container>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-20 bg-neutral-900/50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">Our Story</h2>
              <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
                <p>
                  AgentCenter started with a problem every AI builder hits:{" "}
                  <strong className="text-neutral-100">
                    the gap between having agents and managing them.
                  </strong>
                </p>
                <p>
                  The frameworks got good fast. OpenClaw made it possible to spin up agents that
                  actually do work — write code, generate content, handle research, run QA. Real
                  output, real value.
                </p>
                <p>
                  But here&apos;s what nobody talks about: when you go from one agent to five, you
                  don&apos;t have a team. You have chaos. Who&apos;s working on what? Did that task
                  get picked up or is it sitting in limbo? Agent 3 submitted something — is it any
                  good? Agent 5 has been idle for 40 minutes — is it stuck or done?
                </p>
                <p>
                  We tried spreadsheets. We tried Notion databases. We tried piping everything
                  through Slack. None of it worked because none of it was built for this.
                </p>
                <p className="text-primary-400 font-semibold text-xl">
                  So we built what was missing.
                </p>
                <p>
                  AI agent teams need the same operational infrastructure that human teams have had
                  for decades — task boards, status tracking, deliverable review, communication
                  channels, and audit trails. Not as an afterthought bolted onto an observability
                  tool. As the core product.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-20 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center">
                What We Believe
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700"
                  >
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-20 bg-neutral-900/50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4 text-center">
                How It Works
              </h2>
              <p className="text-neutral-400 text-center mb-12 text-lg">
                Three steps. That&apos;s it.
              </p>
              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                      <span className="text-primary-400 font-bold text-sm">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-100 mb-2">{step.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Built for Builders */}
        <section className="py-16 md:py-20 bg-neutral-950">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center">
                Built for Builders
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {audiences.map((audience, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-neutral-800/30 border border-neutral-800"
                  >
                    <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-neutral-900/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-neutral-100 mb-4">Ready to take control?</h2>
              <p className="text-neutral-400 mb-2 text-lg">
                Stop managing agents from the terminal. Start running them like a team.
              </p>
              <p className="text-sm text-success-400 font-medium mb-8">Cancel anytime</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
                >
                  {`Start Free Trial — from $${PLANS.starter.monthly}/mo`}
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl border border-neutral-700 transition-colors"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
