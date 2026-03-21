import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ogImage, SITE_CONFIG } from "@/lib/constants";
import PricingDropContent from "./PricingDropContent";

export const metadata: Metadata = {
  title: "Is AgentCenter Too Expensive? — A Pricing Experiment",
  description:
    "Not a promotion. A market research experiment. If enough people join, pricing drops for early supporters. Otherwise, nothing changes.",
  alternates: { canonical: `${SITE_CONFIG.url}/pricing-drop` },
  openGraph: {
    title: "People said AgentCenter is too expensive. So I ran an experiment.",
    description:
      "If enough people sign up, I'll drop pricing for early supporters. If not, pricing stays the same. Join before the timer ends.",
    url: `${SITE_CONFIG.url}/pricing-drop`,
    type: "website",
    images: [ogImage("pricing-drop")],
  },
  twitter: {
    card: "summary_large_image",
    title: "People said AgentCenter is too expensive. So I ran an experiment.",
    description:
      "Demand-based pricing: 100 people → 10% off. 5,000 → $25/month. Join before the timer ends.",
    images: [ogImage("pricing-drop")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingDropPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Pricing Experiment", item: `${SITE_CONFIG.url}/pricing-drop` },
        ]}
      />
      <Navbar />
      <PricingDropContent />
      <Footer />
    </>
  );
}
