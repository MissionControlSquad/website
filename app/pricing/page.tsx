import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/sections/Pricing";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "AgentCenter pricing: $79/month. One plan, everything included. Cancel anytime. Powered by Stripe.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
