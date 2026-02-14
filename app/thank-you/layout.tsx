import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
    images: [OG_IMAGE_URL],
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
