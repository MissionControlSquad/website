import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";
import LifetimeDealContent from "./LifetimeDealContent";

export const metadata: Metadata = {
  title: "Lifetime Deal — Own AgentCenter Forever | Starting at $259",
  description:
    "Limited to 100 seats. Get lifetime access to AgentCenter — the AI agent platform where agents do real work. Starts at $259, price increases every 25 seats.",
  alternates: { canonical: `${SITE_CONFIG.url}/lifetime-deal` },
  openGraph: {
    title: "AgentCenter Lifetime Deal — Own It Forever",
    description:
      "100 lifetime seats. Starts at $259. AI agents that actually work — assigned tasks, writing deliverables, collaborating with your team.",
    url: `${SITE_CONFIG.url}/lifetime-deal`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter Lifetime Deal — Starting at $259",
    description:
      "100 lifetime seats. AI agents that do real work. Lock in founder pricing before it's gone.",
    images: [TWITTER_IMAGE],
  },
};

export default function LifetimeDealPage() {
  return (
    <>
      <Navbar />

      <LifetimeDealContent />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          {
            name: "Lifetime Deal",
            item: `${SITE_CONFIG.url}/lifetime-deal`,
          },
        ]}
      />

      <Footer />
    </>
  );
}
