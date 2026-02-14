import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    url: SITE_CONFIG.url,
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    type: "website",
    images: [{ ...OG_IMAGE, alt: "AgentCenter — Mission Control for Your OpenClaw Agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    images: [OG_IMAGE_URL],
  },
};

// Dynamic imports for below-fold sections to reduce initial bundle
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <SectionSkeleton height="500px" />,
});

const Features = dynamic(() => import("@/components/sections/Features"), {
  loading: () => <SectionSkeleton height="600px" />,
});

const DashboardPreview = dynamic(() => import("@/components/sections/DashboardPreview"), {
  loading: () => <SectionSkeleton height="700px" />,
});

const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <SectionSkeleton height="400px" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => <SectionSkeleton height="800px" />,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
  loading: () => <SectionSkeleton height="300px" />,
});

// Lightweight skeleton for loading states
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div className="w-full animate-pulse bg-neutral-900/30" style={{ height }} aria-hidden="true" />
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Above the fold - loaded immediately */}
        <Hero />

        {/* Below the fold - dynamically loaded for performance */}
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
