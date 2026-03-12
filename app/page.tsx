import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import SocialProof from "@/components/sections/SocialProof";
import DistributedByDesign from "@/components/sections/DistributedByDesign";
import MidPageCTA from "@/components/sections/MidPageCTA";
import Features from "@/components/sections/Features";
import InsideAgentCenter from "@/components/sections/InsideAgentCenter";
import LiveActivityFeed from "@/components/sections/LiveActivityFeed";
import SocialProof from "@/components/sections/SocialProof";
import PrivacyFirst from "@/components/sections/PrivacyFirst";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import ActivityFeed from "@/components/sections/ActivityFeed";
import FinalCTA from "@/components/sections/FinalCTA";
import LatestPosts from "@/components/sections/LatestPosts";
import Footer from "@/components/Footer";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";
import { getLatestPosts } from "@/lib/blog";

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
    images: [TWITTER_IMAGE],
  },
};

export default function HomePage() {
  const latestPosts = getLatestPosts(3).map(({ slug, title, description, date, readingTime }) => ({
    slug,
    title,
    description,
    date,
    readingTime,
  }));

  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <SocialProof />
        <DistributedByDesign />
        <HowItWorks />
        <UseCases />
        <MidPageCTA />
        <Features />
        <ActivityFeed />
        <InsideAgentCenter />
        <LiveActivityFeed />
        <SocialProof />
        <PrivacyFirst />
        <Pricing />
        <FAQ />
        {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
