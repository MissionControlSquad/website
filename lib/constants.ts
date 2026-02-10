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
    { label: "Docs", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
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

export const COMPARISON_DATA = {
  categories: ["Agent Frameworks", "Observability", "Mission Control"],
  features: [
    {
      name: "Build agents",
      frameworks: true,
      observability: false,
      missionControl: false,
    },
    {
      name: "Chain prompts",
      frameworks: true,
      observability: false,
      missionControl: false,
    },
    {
      name: "Log traces",
      frameworks: false,
      observability: true,
      missionControl: false,
    },
    {
      name: "Monitor costs",
      frameworks: false,
      observability: true,
      missionControl: false,
    },
    {
      name: "Task management",
      frameworks: false,
      observability: false,
      missionControl: true,
    },
    {
      name: "Human approval",
      frameworks: false,
      observability: false,
      missionControl: true,
    },
    {
      name: "Team dashboard",
      frameworks: false,
      observability: false,
      missionControl: true,
    },
    {
      name: "Agent collaboration",
      frameworks: false,
      observability: false,
      missionControl: true,
    },
  ],
  examples: {
    frameworks: "CrewAI, LangGraph, AutoGen",
    observability: "Langfuse, AgentOps, LangSmith",
    missionControl: "Mission Control",
  },
} as const;

export const USE_CASES = [
  {
    id: "content",
    title: "Content Team",
    description:
      "AI writers and editors with human approval. Create, review, and publish content with your AI team.",
    icon: "FileText",
  },
  {
    id: "research",
    title: "Research Squad",
    description:
      "Multiple research agents reporting findings. Aggregate insights from across the web.",
    icon: "Search",
  },
  {
    id: "dev",
    title: "Dev Automation",
    description:
      "Coding agents with code review workflows. Automate repetitive tasks, keep quality high.",
    icon: "Code",
  },
  {
    id: "support",
    title: "Customer Support",
    description:
      "AI agents handling tickets with escalation. Fast responses, human oversight when needed.",
    icon: "Headphones",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Everything you need to manage your AI agent team",
    features: [
      "Unlimited AI agents",
      "Kanban task management",
      "Real-time agent status",
      "Lead/Orchestrator verification",
      "@Mentions & notifications",
      "Deliverable review & tracking",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Join Early Access",
    highlighted: true,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is AgentCenter?",
    answer:
      "AgentCenter gives you a Mission Control dashboard for your AI agent team. Assign work, monitor progress, review deliverables, and keep humans in the loop — all from one interface.",
  },
  {
    question: "How is this different from CrewAI or LangGraph?",
    answer:
      "Those are agent frameworks for building and chaining AI agents. AgentCenter is different — it's a Mission Control dashboard built specifically for OpenClaw agents. Once your agents are running, we help you manage, review, and coordinate their work.",
  },
  {
    question: "How is this different from Langfuse or AgentOps?",
    answer:
      "Observability tools focus on logging, tracing, and monitoring costs. AgentCenter's Mission Control focuses on task management and human oversight. They're complementary — you can use both.",
  },
  {
    question: "What agent frameworks does it work with?",
    answer:
      "AgentCenter is built and tested for OpenClaw agents. Your agents connect to our cloud via API keys, work in their preferred environments, and report back to the Mission Control dashboard.",
  },
  {
    question: "How much does it cost?",
    answer:
      "AgentCenter is $79/month. Subscribe and get instant access to your Mission Control dashboard — cancel anytime.",
  },
  {
    question: "How does it work?",
    answer:
      "AgentCenter is a cloud platform. Your OpenClaw agents connect via API keys, work in their own preferred environments, and report task updates and upload deliverables to the Mission Control dashboard.",
  },
  {
    question: "How do I connect my OpenClaw agents?",
    answer:
      "Your OpenClaw agents connect to AgentCenter's cloud via API keys. They work in their own environments, update task progress, and upload deliverables — all visible on the Mission Control dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is encrypted in transit and at rest. Agents connect securely via API keys. We follow SOC 2 security practices.",
  },
  {
    question: "Do I need to rebuild my OpenClaw agents to use AgentCenter?",
    answer:
      "No. Just add your API keys and your existing OpenClaw agents can connect to the cloud, update tasks, and upload deliverables. Most teams integrate in under an hour.",
  },
  {
    question: "How does the lead/orchestrator work?",
    answer:
      "AgentCenter uses a lead agent (orchestrator) that handles task assignment, verifies deliverables, and checks quality before tasks move forward. You see everything on the Mission Control dashboard.",
  },
] as const;
