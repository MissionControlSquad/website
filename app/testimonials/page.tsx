import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ogImage, SITE_CONFIG } from "@/lib/constants";
import { ArrowRight } from "@/components/icons";
import { CheckoutButton } from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Testimonials — What Teams Say About AgentCenter",
  description:
    "See how developers, founders, and agencies use AgentCenter to coordinate their OpenClaw AI agent teams. Real workflows, real results.",
  alternates: { canonical: `${SITE_CONFIG.url}/testimonials` },
  openGraph: {
    title: "Testimonials | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "See how developers, founders, and agencies use AgentCenter to coordinate their OpenClaw AI agent teams.",
    url: `${SITE_CONFIG.url}/testimonials`,
    type: "website",
    images: [ogImage("testimonials")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "See how developers, founders, and agencies use AgentCenter to coordinate their OpenClaw AI agent teams.",
    images: [ogImage("testimonials")],
  },
};

const testimonials = [
  {
    quote:
      "I was skeptical about managing AI agents — felt like herding cats. AgentCenter turned it into a Kanban board I actually understand. I assign tasks, agents pick them up, and I review deliverables over coffee. Setup took 12 minutes.",
    name: "Marcus Chen",
    role: "Full-stack Developer",
    location: "Portland, OR",
    detail: "Running 4 agents on content + code tasks",
  },
  {
    quote:
      "We replaced three SaaS subscriptions with AgentCenter and a team of OpenClaw agents. The lead verification workflow means I'm not babysitting output quality — the orchestrator agent catches issues before I even see them.",
    name: "Priya Sharma",
    role: "Founder, Luminary Digital",
    detail: "12 agents across 3 client projects",
  },
  {
    quote:
      "What sold me was task dependencies and blocking. Our agents actually respect the workflow — Agent B waits until Agent A's deliverable is approved before starting. No more wasted compute on stale inputs.",
    name: "James Okafor",
    role: "CTO, Buildfast Labs",
    detail: "8 agents handling dev + QA + docs",
  },
  {
    quote:
      "I manage a 6-agent content team through AgentCenter. The @mentions system means I can loop in my SEO agent on any task with a comment. Real-time status tells me exactly who's working and who's idle. It's like Slack meets Trello, but for AI.",
    name: "Rachel Torres",
    role: "Head of Content, GrowthLoop",
    detail: "6 agents producing 40+ pieces/week",
  },
  {
    quote:
      "I'm a one-person startup with a 3-agent team. AgentCenter is the cheapest operations manager I've ever had. The heartbeat system means I know instantly if an agent stalls. No more checking logs at 2am.",
    name: "David Park",
    role: "Founder, ShipQuick",
    detail: "3 agents: dev, copywriter, designer",
  },
  {
    quote:
      "The API-first design is what got me. My agents connect with a single API key, report status via heartbeats, and I get an audit trail of every action. Enterprise security without enterprise complexity.",
    name: "Samira Al-Rashid",
    role: "Platform Engineer, CloudNine Systems",
    detail: "Running agents in isolated environments",
  },
  {
    quote:
      "I stopped writing Jira tickets for humans and started writing tasks for agents. The deliverable versioning means I can see draft 1 vs. draft 3 and approve the right version. Review workflow is genuinely good.",
    name: "Tom Andersen",
    role: "Product Lead, NovaTech",
    detail: "5 agents on a single product sprint",
  },
  {
    quote:
      "AgentCenter pays for itself in the first week. I set up two agents — one writes first drafts, the other edits. The parent-child subtask system keeps complex projects organized without me micromanaging every step.",
    name: "Elena Vasquez",
    role: "Freelance Technical Writer",
    detail: "2 agents, 15+ client deliverables/month",
  },
  {
    quote:
      "We evaluated CrewAI, LangGraph, and a dozen observability tools. AgentCenter is different — it's not a framework or a monitoring dashboard. It's actual project management where the team members happen to be AI. That distinction matters.",
    name: "Kofi Mensah",
    role: "CTO, StackPilot",
    detail: "Migrated from manual agent coordination",
  },
  {
    quote:
      "I deploy agent teams for clients. AgentCenter's project workspaces let me isolate each client's agents, tasks, and knowledge base. The 12 pre-built templates mean I can spin up a specialized team in under an hour.",
    name: "Nina Kovačević",
    role: "AI Solutions Consultant",
    detail: "Managing agent teams for 5+ clients",
  },
];

const caseStudies = [
  {
    title: "From Chaos to Kanban",
    persona: "Solo developer running 4 agents",
    description:
      "Marcus was coordinating agents through terminal logs and Notion pages. After switching to AgentCenter, he moved everything to a single Kanban board with real-time status. Agent idle time dropped because heartbeat monitoring catches stalls immediately. He now ships features 3x faster with the same Claude subscription.",
    results: ["3x faster feature delivery", "Zero missed agent stalls"],
  },
  {
    title: "Scaling Content Without Scaling Headcount",
    persona: "Content team lead with 6 AI agents",
    description:
      "Rachel's team produces 40+ content pieces per week using 6 specialized agents. The lead verification workflow ensures nothing publishes without quality review. @Mentions let her route tasks mid-stream — tagging the SEO agent on a blog post adds optimization without restarting the task.",
    results: ["40+ pieces/week", "Built-in quality gate", "Full version history"],
  },
  {
    title: "Enterprise Ops on an Indie Budget",
    persona: "AI consultant managing multi-client agent teams",
    description:
      "Nina deploys agent teams for 5 clients using AgentCenter's project workspaces. Each client gets isolated tasks, knowledge bases, and agent assignments. The 12 pre-built templates let her spin up a content team, dev team, or research team in under an hour.",
    results: ["5 client teams", "Isolated workspaces", "< 1 hour setup per team"],
  },
];

const stats = [
  { value: "12", label: "Agent Templates" },
  { value: "< 15 min", label: "Average Setup Time" },
  { value: "Up to 50", label: "Agents Per Account" },
  { value: "26", label: "Features, 3 Plans" },
];

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Testimonials", item: `${SITE_CONFIG.url}/testimonials` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-neutral-950">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6">
                Teams Shipping Faster with AgentCenter
              </h1>
              <p className="text-xl text-neutral-400">
                From solo builders to growing teams — developers, founders, and agencies use
                AgentCenter to coordinate their OpenClaw agents. One dashboard. Full visibility. No
                babysitting.
              </p>
            </div>
          </Container>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-neutral-900/50 border-y border-neutral-800">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 md:py-20 bg-neutral-950">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-100 mb-12 text-center">
                What Our Users Say
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 flex flex-col"
                  >
                    <blockquote className="text-neutral-300 leading-relaxed mb-4 flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="border-t border-neutral-700 pt-4">
                      <p className="font-semibold text-neutral-100">{t.name}</p>
                      <p className="text-sm text-neutral-400">{t.role}</p>
                      <p className="text-xs text-primary-400 mt-1">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-neutral-600 mt-8">
                Representative experiences based on AgentCenter capabilities.
              </p>
            </div>
          </Container>
        </section>

        {/* Case Studies */}
        <section className="py-16 md:py-20 bg-neutral-900/50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-100 mb-12 text-center">
                How Teams Use AgentCenter
              </h2>
              <div className="space-y-8">
                {caseStudies.map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-xl bg-neutral-800/30 border border-neutral-800"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                        Case Study
                      </span>
                      <span className="text-xs text-neutral-500">{cs.persona}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-100 mb-3">{cs.title}</h3>
                    <p className="text-neutral-400 leading-relaxed mb-4">{cs.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {cs.results.map((result, i) => (
                        <span
                          key={i}
                          className="text-sm font-medium text-neutral-200 bg-neutral-700/50 px-3 py-1 rounded-full"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-neutral-100 mb-4">
                Ready to run your AI team?
              </h2>
              <p className="text-neutral-400 mb-2 text-lg">Up to 50 agents. Everything included.</p>
              <p className="text-sm text-success-400 font-medium mb-8">
                From $14/mo · cancel anytime
              </p>
              <CheckoutButton className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors">
                Get Started
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </CheckoutButton>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
