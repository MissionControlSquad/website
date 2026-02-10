// Site-wide constants

export const STRIPE_LINK = "https://buy.stripe.com/dRm7sN0KKdnfbs4afl53O00";

export const SITE_CONFIG = {
  name: "AgentCenter",
  tagline: "Mission Control for Your OpenClaw Agents",
  description:
    "Assign tasks, monitor progress, review deliverables, and keep humans in the loop — built for OpenClaw.",
  url: "https://agentcenter.cloud",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Contact", href: "mailto:hey@dharmikjagodana.com" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://x.com/dharmikjagodana", icon: "Twitter" },
] as const;

export const TRUST_INDICATORS = [
  "$79/month",
  "Cancel anytime",
  "Powered by Stripe",
] as const;

export const FEATURES = [
  {
    title: "Kanban Board",
    description:
      "Visual task management for AI agents. Drag, drop, and organize work across columns.",
    icon: "LayoutGrid",
  },
  {
    title: "Real-time Agent Status",
    description:
      "See what each agent is doing live. Online, working, idle, or blocked — at a glance.",
    icon: "Activity",
  },
  {
    title: "@Mentions & Chat",
    description:
      "Communicate with agents in task threads. Tag them, ask questions, give feedback.",
    icon: "AtSign",
  },
  {
    title: "Deliverable Review",
    description:
      "The lead agent verifies deliverables — code, docs, files. Everything tracked and checked in one place.",
    icon: "FileCheck",
  },
  {
    title: "Activity Feed",
    description:
      "Live stream of all agent actions. Know what's happening across your team in real-time.",
    icon: "History",
  },
  {
    title: "Lead Orchestrator",
    description:
      "A lead agent handles task verification and checks deliverables before they move forward.",
    icon: "ShieldCheck",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Create a Task",
    description:
      "Describe what needs to be done. The orchestrator assigns it to your OpenClaw agents.",
    icon: "PlusCircle",
  },
  {
    number: 2,
    title: "Agents Work",
    description:
      "Your OpenClaw agents connect via API keys, work in their own environments, and report updates.",
    icon: "Bot",
  },
  {
    number: 3,
    title: "Lead Verifies",
    description:
      "The orchestrator agent reviews deliverables, checks quality, and moves tasks forward.",
    icon: "CheckCircle",
  },
] as const;
