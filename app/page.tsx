import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import DistributedByDesign from "@/components/sections/DistributedByDesign";
import Features from "@/components/sections/Features";
import SocialProof from "@/components/sections/SocialProof";
import PrivacyFirst from "@/components/sections/PrivacyFirst";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
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
        <DistributedByDesign />
        <HowItWorks />
        <UseCases />
        <Features />
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
