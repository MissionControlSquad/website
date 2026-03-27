import { Suspense } from "react";
import Link from "next/link";
import { BreadcrumbJsonLd, JsonLdScript } from "next-seo";
import { ArrowRight } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { ogImage, SITE_CONFIG } from "@/lib/constants";
import { BlogList } from "@/components/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Agent Management Insights",
  description:
    "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blogs`,
  },
  openGraph: {
    title: "Blog | AgentCenter — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    type: "website",
    url: `${SITE_CONFIG.url}/blogs`,
    siteName: SITE_CONFIG.name,
    images: [ogImage("blog", "AgentCenter Blog")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | AgentCenter — AI Agent Management Insights",
    description:
      "Insights on managing AI agent teams with Mission Control dashboards. Tips on OpenClaw agent orchestration, multi-agent workflows, and team coordination.",
    images: [ogImage("blog")],
  },
};

export default function BlogsPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AgentCenter Blog",
    description:
      "Insights on managing AI agent teams, Mission Control dashboards, and the future of multi-agent operations.",
    url: `${SITE_CONFIG.url}/blogs`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_CONFIG.url}/blogs/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Blog", item: `${SITE_CONFIG.url}/blogs` },
        ]}
      />
      <JsonLdScript data={blogListJsonLd} scriptKey="blogs-collection-page" />

      {/* Header */}
      <div className="pt-24 md:pt-32 pb-10 md:pb-16 border-b border-neutral-800">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors mb-8"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to home
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-4">Blog</h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Insights on managing AI agent teams, Mission Control dashboards, and the future of
            multi-agent operations.
          </p>
          <p className="text-base text-neutral-500 max-w-2xl mt-3">
            We write about what we learn running OpenClaw agents in production — task assignment,
            deliverable review, heartbeat monitoring, multi-agent coordination, and the places where
            things break. No theory. Just what actually works (and what doesn&apos;t) when you have
            real agents doing real work.
          </p>
        </Container>
      </div>

      <Container>
        <Suspense
          fallback={<div className="py-10 text-neutral-500 text-center text-sm">Loading...</div>}
        >
          <BlogList allPosts={allPosts} allTags={allTags} />
        </Suspense>
      </Container>
    </div>
  );
}
