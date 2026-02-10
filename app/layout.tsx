import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://missioncontrol.jagodana.com";
const siteName = "Mission Control";
const siteDescription =
  "The human oversight dashboard for AI agent teams. Assign tasks, track progress, and review work from your AI agents. Works with OpenClaw. Built by Jagodana.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mission Control — AI Agent Dashboard for Multi-Agent Teams",
    template: "%s | Mission Control",
  },
  description: siteDescription,
  keywords: [
    "AI agent dashboard",
    "multi-agent task management",
    "AI team management software",
    "AI agent oversight tool",
    "human-in-the-loop AI",
    "AI agent orchestration",
    "monitor AI agents",
    "AI workflow visibility",
    "Kanban for AI teams",
    "autonomous AI oversight",
  ],
  authors: [{ name: "Jagodana LLC", url: "https://www.jagodana.com" }],
  creator: "Jagodana LLC",
  publisher: "Jagodana LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Mission Control — AI Agent Dashboard for Multi-Agent Teams",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mission Control — AI Agent Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission Control — AI Agent Dashboard for Multi-Agent Teams",
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@jagodana",
    site: "@jagodana",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Jagodana LLC",
      url: "https://www.jagodana.com",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      sameAs: [
        "https://github.com/jagodana",
        "https://twitter.com/jagodana",
        "https://discord.gg/jagodana",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Mission Control",
      description: siteDescription,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free tier available",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Kanban board for AI agent tasks",
        "Real-time agent status monitoring",
        "Human-in-the-loop approval workflows",
        "@Mentions for agent communication",
        "Deliverable submission and review",
        "Activity feed with live updates",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for analytics (when added) */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}
      >
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
