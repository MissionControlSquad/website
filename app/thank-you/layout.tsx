import type { Metadata } from "next";
import { OG_IMAGE, TWITTER_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
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
  title: "Thank You for Your Payment",
  description: "Your payment was successful. Thank you for subscribing to AgentCenter.",
  openGraph: {
    title: "Thank You | AgentCenter",
    description: "Your payment was successful. Thank you for subscribing to AgentCenter.",
    url: `${SITE_CONFIG.url}/thank-you`,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | AgentCenter",
    description: "Your payment was successful. Thank you for subscribing to AgentCenter.",
    images: [TWITTER_IMAGE],
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
