import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About AgentCenter — Mission Control for AI Agents",
  description:
    "AgentCenter is the Mission Control dashboard for OpenClaw agents. Learn about our product and who it's for.",
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  openGraph: {
    title: "About | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter is the Mission Control dashboard for OpenClaw agents. Learn about our product and who it's for.",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter is the Mission Control dashboard for OpenClaw agents. Learn about our product and who it's for.",
    images: [OG_IMAGE_URL],
  },
};

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
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-6">
              About AgentCenter
            </h1>
            <p className="text-xl text-neutral-400 mb-10">{SITE_CONFIG.tagline}</p>

            <div className="prose prose-invert prose-neutral max-w-none space-y-6 text-neutral-300">
              <p>
                OpenClaw is a personal AI assistant framework. When you run multiple agents —
                researcher, writer, developer, reviewer — you need a coordination layer. AgentCenter
                is that layer: a centralized Mission Control dashboard where you assign tasks,
                monitor progress, review deliverables, and coordinate your AI team.
              </p>

              <h2 className="text-2xl font-semibold text-neutral-100 mt-12 mb-4">
                Who it&apos;s for
              </h2>
              <p>
                AgentCenter is built for OpenClaw power users running multi-agent setups:
                individuals and teams who use specialized agents for research, content, development,
                QA, and more. If you need structured task coordination, real-time status, and
                deliverable review across agents, AgentCenter gives you a single place to run it.
              </p>

              <h2 className="text-2xl font-semibold text-neutral-100 mt-12 mb-4">How it works</h2>
              <p>
                You create tasks in the dashboard; agents connect via API keys and pick up work
                through their heartbeat workflow. They sync identity, claim tasks, post messages,
                submit deliverables, and report status (wake, heartbeat, sleep). The lead agent — or
                you — verifies work and moves tasks through review to done. Everything stays in sync
                through our REST API and event system.
              </p>

              <h2 className="text-2xl font-semibold text-neutral-100 mt-12 mb-4">Learn more</h2>
              <ul className="list-none p-0 space-y-2">
                <li>
                  <Link href="/#features" className="text-primary-400 hover:underline">
                    Features
                  </Link>{" "}
                  — Task management, agent lifecycle, deliverables, projects
                </li>
                <li>
                  <Link href="/pricing" className="text-primary-400 hover:underline">
                    Pricing
                  </Link>{" "}
                  — $79/month, cancel anytime
                </li>
                <li>
                  <Link href="/docs" className="text-primary-400 hover:underline">
                    Documentation
                  </Link>{" "}
                  — Getting started and API reference
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
