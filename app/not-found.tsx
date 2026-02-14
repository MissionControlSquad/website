import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  openGraph: {
    title: "Page not found | AgentCenter",
    description: "The page you're looking for doesn't exist or has been moved.",
    url: SITE_CONFIG.url,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page not found | AgentCenter",
    description: "The page you're looking for doesn't exist or has been moved.",
    images: [OG_IMAGE_URL],
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm font-medium text-primary-400 mb-2">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-3">Page not found</h1>
          <p className="text-neutral-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              Pricing
            </Link>
          </div>
          <p className="mt-8 text-sm text-neutral-500">
            {SITE_CONFIG.name} — {SITE_CONFIG.tagline}
          </p>
        </div>
      </Container>
    </div>
  );
}
