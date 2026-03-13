import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/icons";
import { ogImage, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AgentCenter vs Competitors — AI Agent Platform Comparisons",
  description:
    "See how AgentCenter compares to CrewAI, LangSmith, AgentOps, Relevance AI, SuperAGI, and more. Side-by-side breakdowns of features, pricing, and use cases.",
  alternates: { canonical: `${SITE_CONFIG.url}/compare` },
  openGraph: {
    title: "AgentCenter vs Competitors | AI Agent Platform Comparisons",
    description:
      "See how AgentCenter compares to CrewAI, LangSmith, AgentOps, Relevance AI, SuperAGI, and more. Side-by-side breakdowns of features, pricing, and use cases.",
    url: `${SITE_CONFIG.url}/compare`,
    type: "website",
    images: [ogImage("compare")],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter vs Competitors | AI Agent Platform Comparisons",
    description:
      "See how AgentCenter compares to CrewAI, LangSmith, AgentOps, Relevance AI, SuperAGI, and more.",
    images: [ogImage("compare")],
  },
};

const COMPARISONS = [
  {
    href: "/compare/vs-crewai",
    competitor: "CrewAI Cloud",
    summary:
      "Framework runtime vs. management dashboard. AgentCenter works with your existing agents — no rewrites, no lock-in.",
    tag: "Most popular",
  },
  {
    href: "/compare/vs-langsmith",
    competitor: "LangSmith",
    summary:
      "LLM observability vs. agent management. LangSmith traces prompts; AgentCenter manages tasks, deliverables, and teams.",
    tag: null,
  },
  {
    href: "/compare/vs-agentops",
    competitor: "AgentOps",
    summary:
      "Monitoring and observability vs. full agent management. AgentOps watches what agents do; AgentCenter controls what they do.",
    tag: null,
  },
  {
    href: "/compare/vs-relevance-ai",
    competitor: "Relevance AI",
    summary:
      "No-code agent builder vs. agent management layer. Relevance builds agents from scratch; AgentCenter manages the ones you already have.",
    tag: null,
  },
  {
    href: "/compare/vs-superagi",
    competitor: "SuperAGI",
    summary:
      "Autonomous execution platform vs. team management dashboard. Different philosophies on how humans stay in the loop.",
    tag: null,
  },
  {
    href: "/compare/vs-lindy-ai",
    competitor: "Lindy AI",
    summary:
      "Personal AI assistants vs. multi-agent team coordination. Lindy automates individual workflows; AgentCenter runs agent teams.",
    tag: null,
  },
  {
    href: "/compare/vs-mindstudio",
    competitor: "MindStudio",
    summary:
      "No-code AI app builder vs. agent management platform. MindStudio creates AI apps; AgentCenter coordinates agent work.",
    tag: null,
  },
  {
    href: "/compare/vs-lyzr",
    competitor: "Lyzr Agent Studio",
    summary:
      "Enterprise agent builder with templates vs. management-layer dashboard. Build vs. manage — two different problems.",
    tag: null,
  },
  {
    href: "/compare/vs-mission-control-hq",
    competitor: "Mission Control HQ",
    summary:
      "Side-by-side comparison of pricing, features, and architecture for teams running AI agents.",
    tag: null,
  },
  {
    href: "/compare/vs-diy-agent-management",
    competitor: "Building Your Own Dashboard",
    summary:
      "Should you build your own AI agent dashboard? We break down the real costs, timelines, and trade-offs.",
    tag: null,
  },
];

export default function ComparePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Compare", item: `${SITE_CONFIG.url}/compare` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-neutral-950">
        {/* Header */}
        <div className="pt-32 pb-16 border-b border-neutral-800">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary-400 tracking-wider uppercase mb-4">
                Comparisons
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
                AgentCenter vs the alternatives
              </h1>
              <p className="text-xl text-neutral-400">
                Side-by-side breakdowns of features, pricing, and use cases. See where AgentCenter
                fits — and where it doesn&apos;t.
              </p>
            </div>
          </Container>
        </div>

        {/* Comparison grid */}
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {COMPARISONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex flex-col gap-3 p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-600 hover:bg-neutral-900/80 transition-all"
              >
                {item.tag && (
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-500/15 text-primary-400">
                    {item.tag}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    AgentCenter
                  </span>
                  <span className="text-neutral-600 text-xs">vs</span>
                  <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    {item.competitor}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.summary}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary-400 font-medium mt-auto group-hover:gap-2 transition-all">
                  Read comparison <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
