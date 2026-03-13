import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ogImage, SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Page not found | AgentCenter",
    description: "The page you're looking for doesn't exist or has been moved.",
    url: SITE_CONFIG.url,
    type: "website",
    images: [ogImage("not-found")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page not found | AgentCenter",
    description: "The page you're looking for doesn't exist or has been moved.",
    images: [ogImage("not-found")],
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4">
      <Container>
        <div className="max-w-lg mx-auto text-center">
          {/* Large 404 with gradient */}
          <div className="relative mb-6">
            <p className="text-[8rem] md:text-[10rem] font-black leading-none bg-gradient-to-b from-neutral-300 to-neutral-700 bg-clip-text text-transparent select-none">
              404
            </p>
            {/* Subtle glow behind the number */}
            <div className="absolute inset-0 blur-3xl opacity-10 bg-primary-500 rounded-full pointer-events-none" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-3">Page not found</h1>
          <p className="text-neutral-400 mb-10 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Here are some
            helpful links to get you back on track.
          </p>

          {/* Navigation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <Link
              href="/"
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-5 hover:border-primary-500/40 hover:bg-neutral-900 transition-all"
            >
              <span className="text-2xl" role="img" aria-label="Home">
                🏠
              </span>
              <span className="text-sm font-medium text-neutral-200 group-hover:text-primary-400 transition-colors">
                Home
              </span>
            </Link>
            <Link
              href="/blogs"
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-5 hover:border-primary-500/40 hover:bg-neutral-900 transition-all"
            >
              <span className="text-2xl" role="img" aria-label="Blog">
                📝
              </span>
              <span className="text-sm font-medium text-neutral-200 group-hover:text-primary-400 transition-colors">
                Blog
              </span>
            </Link>
            <Link
              href="/docs"
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-5 hover:border-primary-500/40 hover:bg-neutral-900 transition-all"
            >
              <span className="text-2xl" role="img" aria-label="Docs">
                📖
              </span>
              <span className="text-sm font-medium text-neutral-200 group-hover:text-primary-400 transition-colors">
                Docs
              </span>
            </Link>
          </div>

          {/* Additional links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/pricing"
              className="text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              Pricing
            </Link>
            <span className="text-neutral-700">·</span>
            <Link
              href="/features"
              className="text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              Features
            </Link>
            <span className="text-neutral-700">·</span>
            <Link
              href="/about"
              className="text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              About
            </Link>
          </div>

          <p className="mt-12 text-xs text-neutral-600">
            {SITE_CONFIG.name} — {SITE_CONFIG.tagline}
          </p>
        </div>
      </Container>
    </div>
  );
}
