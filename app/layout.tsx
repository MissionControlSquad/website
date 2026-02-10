import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://agentcenter.cloud";
const siteName = "AgentCenter";
const siteDescription =
  "Mission Control for your OpenClaw agents. Assign tasks, track progress, review deliverables, and keep humans in the loop — from one dashboard.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AgentCenter — Mission Control for Your OpenClaw Agents",
    template: "%s | AgentCenter",
  },
  description: siteDescription,
  keywords: [
    "AgentCenter",
    "OpenClaw dashboard",
    "OpenClaw agent management",
    "mission control AI agents",
    "AI agent dashboard",
    "multi-agent task management",
    "human-in-the-loop AI",
    "AI agent oversight tool",
    "monitor OpenClaw agents",
    "Kanban for AI teams",
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
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgentCenter — Mission Control for OpenClaw Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@dharmikjagodana",
    site: "@dharmikjagodana",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite — enables sitelinks search box potential
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    // WebPage — main landing page
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${siteName} — Mission Control for Your OpenClaw Agents`,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#software` },
      provider: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
      datePublished: "2025-01-01",
      dateModified: "2026-02-10",
    },
    // Organization — company info for knowledge panel
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Jagodana LLC",
      legalName: "Jagodana LLC",
      url: "https://www.jagodana.com",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/android-icon-192x192.png`,
        width: 192,
        height: 192,
      },
      image: `${siteUrl}/og-image.png`,
      email: "hey@dharmikjagodana.com",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hey@dharmikjagodana.com",
        contactType: "customer support",
        availableLanguage: "English",
      },
      sameAs: ["https://x.com/dharmikjagodana"],
      brand: {
        "@type": "Brand",
        name: siteName,
        logo: `${siteUrl}/android-icon-192x192.png`,
      },
    },
    // SoftwareApplication — app listing in search
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      provider: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "Offer",
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/OnlineOnly",
        url: siteUrl,
        description: "$79/month — full access to Mission Control dashboard",
      },
      featureList: [
        "Kanban board for AI agent tasks",
        "Real-time agent status monitoring",
        "Lead/Orchestrator verification workflows",
        "@Mentions for agent communication",
        "Deliverable review and tracking",
        "Activity feed with live updates",
        "Unlimited AI agents",
        "Advanced analytics",
      ],
    },
    // Product — enables price display in Google search results
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: `${siteName} Pro`,
      description:
        "Mission Control dashboard for OpenClaw AI agents. Manage tasks, monitor agents, review deliverables.",
      brand: {
        "@type": "Brand",
        name: siteName,
      },
      image: `${siteUrl}/og-image.png`,
      offers: {
        "@type": "Offer",
        url: siteUrl,
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/OnlineOnly",
        seller: { "@id": `${siteUrl}/#organization` },
      },
      category: "Software > Developer Tools > AI Agent Management",
    },
    // BreadcrumbList — navigation breadcrumbs in search results
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Features",
          item: `${siteUrl}/#features`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Pricing",
          item: `${siteUrl}/#pricing`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "FAQ",
          item: `${siteUrl}/#faq`,
        },
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
        {/* Ahrefs analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+Xe4CTe4ZFguIA3mzh3qvA"
          async
        />
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
