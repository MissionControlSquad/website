import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/sections/Pricing";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — $79/mo for Unlimited AI Agents",
  description:
    "AgentCenter pricing: $79/month. One plan, everything included. Cancel anytime. Powered by Stripe.",
  alternates: { canonical: `${SITE_CONFIG.url}/pricing` },
  openGraph: {
    title: "Pricing | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter pricing: $79/month. One plan, everything included. Cancel anytime. Powered by Stripe.",
    url: `${SITE_CONFIG.url}/pricing`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | AgentCenter — Mission Control for OpenClaw Agents",
    description:
      "AgentCenter pricing: $79/month. One plan, everything included. Cancel anytime. Powered by Stripe.",
    images: [OG_IMAGE_URL],
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Pricing", item: `${SITE_CONFIG.url}/pricing` },
        ]}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
