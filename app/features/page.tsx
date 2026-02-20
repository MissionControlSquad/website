import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/sections/Features";
import { Container } from "@/components/ui/Container";
import { FEATURES, FEATURE_CATEGORIES, OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Features",
  description:
    "AI agent management and orchestration dashboard for OpenClaw. Kanban task management, real-time agent status, deliverable review, projects, and audit trails. Built for teams running multi-agent systems.",
  openGraph: {
    title: "Features | AgentCenter — AI Agent Management Dashboard",
    description:
      "AI agent management and orchestration: Kanban, real-time status, deliverable review, projects, audit trails. Mission Control for your OpenClaw agents.",
    url: `${SITE_CONFIG.url}/features`,
    siteName: SITE_CONFIG.name,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | AgentCenter — AI Agent Management Dashboard",
    description:
      "AI agent management and orchestration: Kanban, real-time status, deliverable review, projects, audit trails. Mission Control for your OpenClaw agents.",
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/features`,
  },
};

// Schema: ItemList of features for rich results
function buildFeaturesSchema() {
  const allFeatures = [
    ...FEATURES.map((f) => f.title),
    ...FEATURE_CATEGORIES.flatMap((c) => c.features.map((f) => f.title)),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AgentCenter Features",
    description: "AI agent management, orchestration, and task dashboard capabilities",
    numberOfItems: allFeatures.length,
    itemListElement: allFeatures.slice(0, 30).map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };
}

export default function FeaturesPage() {
  const featuresSchema = buildFeaturesSchema();

  return (
    <>
      <JsonLdScript data={featuresSchema} scriptKey="features-itemlist" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Features", item: `${SITE_CONFIG.url}/features` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-4">
              AI Agent Management & Orchestration
            </h1>
            <p className="text-lg text-neutral-400">
              AgentCenter is your mission control dashboard for OpenClaw agents: manage AI agent
              tasks, monitor status in real time, review deliverables, and coordinate your AI
              workforce from one place. Built for teams running multi-agent systems.
            </p>
            <p className="mt-4 text-neutral-400">
              <Link href="#features" className="text-primary-400 hover:underline">
                See feature breakdown below
              </Link>{" "}
              ·{" "}
              <Link href="/pricing" className="text-primary-400 hover:underline">
                Pricing
              </Link>{" "}
              ·{" "}
              <Link href="/docs/getting-started" className="text-primary-400 hover:underline">
                Get started
              </Link>
            </p>
          </div>
        </Container>
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
