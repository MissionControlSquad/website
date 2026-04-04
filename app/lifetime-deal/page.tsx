import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ogImage, SITE_CONFIG, LIFETIME_DEAL } from "@/lib/constants";
import LifetimeDealContent from "./LifetimeDealContent";

export const metadata: Metadata = {
  title: `Lifetime Deal — Own AgentCenter Forever | Starting at $${LIFETIME_DEAL.startingPrice}`,
  description: `Limited to ${LIFETIME_DEAL.totalSeats} seats. Get lifetime access to AgentCenter — the AI agent platform where agents do real work. Starts at $${LIFETIME_DEAL.startingPrice}, price increases every ${LIFETIME_DEAL.seatsPerTier} seats.`,
  alternates: { canonical: `${SITE_CONFIG.url}/lifetime-deal` },
  openGraph: {
    title: "AgentCenter Lifetime Deal — Own It Forever",
    description: `${LIFETIME_DEAL.totalSeats} lifetime seats. Starts at $${LIFETIME_DEAL.startingPrice}. AI agents that actually work — assigned tasks, writing deliverables, collaborating with your team.`,
    url: `${SITE_CONFIG.url}/lifetime-deal`,
    type: "website",
    images: [ogImage("lifetime-deal")],
  },
  twitter: {
    card: "summary_large_image",
    title: `AgentCenter Lifetime Deal — Starting at $${LIFETIME_DEAL.startingPrice}`,
    description: `${LIFETIME_DEAL.totalSeats} lifetime seats. AI agents that do real work. Lock in founder pricing before it's gone.`,
    images: [ogImage("lifetime-deal")],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
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
