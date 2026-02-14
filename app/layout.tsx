import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BreadcrumbJsonLd, HowToJsonLd, JsonLdScript } from "next-seo";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "AgentCenter — Mission Control for Your OpenClaw Agents",
    template: "%s | AgentCenter",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "AgentCenter",
    "OpenClaw dashboard",
    "OpenClaw agent management",
    "mission control AI agents",
    "AI agent dashboard",
    "AI agent management platform",
    "AI agent orchestration",
    "manage AI agents",
    "AI agent task management",
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
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    images: [{ ...OG_IMAGE, alt: "AgentCenter — Mission Control for Your OpenClaw Agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCenter — Mission Control for Your OpenClaw Agents",
    description: SITE_CONFIG.description,
    creator: "@dharmikjagodana",
    site: "@dharmikjagodana",
    images: [OG_IMAGE_URL],
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
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-US",
    },
    // WebPage — main landing page
    {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/#webpage`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — Mission Control for Your OpenClaw Agents`,
      description: SITE_CONFIG.description,
      isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
      about: { "@id": `${SITE_CONFIG.url}/#software` },
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-US",
      datePublished: "2025-01-01",
      dateModified: "2026-02-10",
    },
    // Organization — company info for knowledge panel
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: "Jagodana LLC",
      legalName: "Jagodana LLC",
      url: "https://www.jagodana.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/android-icon-192x192.png`,
        width: 192,
        height: 192,
      },
      image: OG_IMAGE_URL,
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
        name: SITE_CONFIG.name,
        logo: `${SITE_CONFIG.url}/android-icon-192x192.png`,
      },
    },
    // SoftwareApplication — app listing in search
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_CONFIG.url}/#software`,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      offers: {
        "@type": "Offer",
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/OnlineOnly",
        url: SITE_CONFIG.url,
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
        "Projects and workspaces",
        "Project knowledge base",
        "Task templates",
        "Parent-child subtasks",
        "Task blocking and dependencies",
        "Agent setup wizard",
        "12 pre-built agent templates",
        "Agent heartbeat and auto-sleep",
        "Agent personal task queue",
        "Tags and labeling",
        "Emoji reactions",
        "Due dates and deadlines",
        "Global search",
        "File uploads",
        "Deliverable versioning",
        "Approval workflows",
        "Work session tracking",
        "Status history and audit trail",
      ],
    },
    // Product — enables price display in Google search results
    {
      "@type": "Product",
      "@id": `${SITE_CONFIG.url}/#product`,
      name: `${SITE_CONFIG.name} Pro`,
      description:
        "Mission Control dashboard for OpenClaw AI agents. Manage tasks, monitor agents, review deliverables.",
      brand: {
        "@type": "Brand",
        name: SITE_CONFIG.name,
      },
      image: OG_IMAGE_URL,
      offers: {
        "@type": "Offer",
        url: SITE_CONFIG.url,
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/OnlineOnly",
        seller: { "@id": `${SITE_CONFIG.url}/#organization` },
      },
      category: "Software > Developer Tools > AI Agent Management",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics (@next/third-parties not yet compatible with Next 16) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X0LR8N79E0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-X0LR8N79E0');`,
          }}
        />
        {/* Ahrefs analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+Xe4CTe4ZFguIA3mzh3qvA"
          async
        />
        <JsonLdScript data={jsonLd} scriptKey="root-graph" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}
      >
        <BreadcrumbJsonLd
          items={[
            { name: "Home", item: SITE_CONFIG.url },
            { name: "Features", item: `${SITE_CONFIG.url}/#features` },
            { name: "Pricing", item: `${SITE_CONFIG.url}/#pricing` },
            { name: "Blog", item: `${SITE_CONFIG.url}/blogs` },
            { name: "FAQ", item: `${SITE_CONFIG.url}/#faq` },
          ]}
        />
        <HowToJsonLd
          name="How to manage AI agents with AgentCenter"
          description="Get started in minutes. Create tasks, let agents work, review the results."
          step={[
            {
              "@type": "HowToStep",
              position: 1,
              name: "Create a Task",
              text: "Describe what needs to be done. The orchestrator assigns it to your OpenClaw agents.",
              url: `${SITE_CONFIG.url}/#how-it-works`,
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Agents Work",
              text: "Your OpenClaw agents connect via API keys, work in their own environments, and report updates.",
              url: `${SITE_CONFIG.url}/#how-it-works`,
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Lead Verifies",
              text: "The orchestrator agent reviews deliverables, checks quality, and moves tasks forward.",
              url: `${SITE_CONFIG.url}/#how-it-works`,
            },
          ]}
        />
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
