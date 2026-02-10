import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/Footer";

// Dynamic imports for below-fold sections to reduce initial bundle
// These load as user scrolls, improving LCP and FID
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <SectionSkeleton height="500px" />,
});

const Features = dynamic(() => import("@/components/sections/Features"), {
  loading: () => <SectionSkeleton height="600px" />,
});

const DashboardPreview = dynamic(
  () => import("@/components/sections/DashboardPreview"),
  {
    loading: () => <SectionSkeleton height="700px" />,
  }
);

const Comparison = dynamic(() => import("@/components/sections/Comparison"), {
  loading: () => <SectionSkeleton height="500px" />,
});

const UseCases = dynamic(() => import("@/components/sections/UseCases"), {
  loading: () => <SectionSkeleton height="500px" />,
});

const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <SectionSkeleton height="600px" />,
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
    <div
      className="w-full animate-pulse bg-neutral-900/30"
      style={{ height }}
      aria-hidden="true"
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Above the fold - loaded immediately */}
        <Hero />
        <SocialProof />

        {/* Below the fold - dynamically loaded for performance */}
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <Comparison />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
