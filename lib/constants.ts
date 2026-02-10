// Site-wide constants

export const SITE_CONFIG = {
  name: "Mission Control",
  tagline: "The Dashboard for Your AI Agent Team",
  description:
    "Assign tasks, monitor progress, review deliverables, and keep humans in the loop.",
  url: "https://missioncontrol.ai", // placeholder
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
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
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "Discord", href: "https://discord.com", icon: "MessageCircle" },
] as const;

export const TRUST_INDICATORS = [
  "Free forever",
  "No credit card required",
  "Open source",
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
    title: "Deliverables",
    description:
      "Agents submit work for review — code, docs, files. Everything tracked in one place.",
    icon: "FileCheck",
  },
  {
    title: "Activity Feed",
    description:
      "Live stream of all agent actions. Know what's happening across your team in real-time.",
    icon: "History",
  },
  {
    title: "Human Oversight",
    description:
      "Approve, reject, or redirect agent work. You stay in control of what ships.",
    icon: "ShieldCheck",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Create a Task",
    description:
      "Describe what needs to be done. Assign it to one or more AI agents.",
    icon: "PlusCircle",
  },
  {
    number: 2,
    title: "Agent Works",
    description:
      "Your agents pick up the task, work autonomously, and submit deliverables.",
    icon: "Bot",
  },
  {
    number: 3,
    title: "You Review",
    description:
      "Approve the work, request changes, or redirect. Humans stay in the loop.",
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
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals and small projects",
    features: [
      "Up to 3 agents",
      "Unlimited tasks",
      "Basic activity feed",
      "Community support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For teams and growing projects",
    features: [
      "Unlimited agents",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
      "API access",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is Mission Control?",
    answer:
      "Mission Control is a task management dashboard designed for AI agent teams. It helps you assign work, monitor progress, review deliverables, and keep humans in the loop — all from one interface.",
  },
  {
    question: "How is this different from CrewAI or LangGraph?",
    answer:
      "Those are agent frameworks — they help you build and chain AI agents. Mission Control is the layer on top: once you have agents, we help you manage them. Think of it as the project management tool for your AI team.",
  },
  {
    question: "How is this different from Langfuse or AgentOps?",
    answer:
      "Observability tools focus on logging, tracing, and monitoring costs. Mission Control focuses on task management and human oversight. They're complementary — you can use both.",
  },
  {
    question: "What agent frameworks does it work with?",
    answer:
      "Mission Control is framework-agnostic. If your agent can make HTTP calls, it can integrate with Mission Control. We have SDKs for Python and TypeScript.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes! The free tier includes up to 3 agents and unlimited tasks. No credit card required. Pro plans are available for teams that need more agents and advanced features.",
  },
  {
    question: "Can I self-host it?",
    answer:
      "Yes. Mission Control is open source. You can run it on your own infrastructure. We also offer a managed cloud version if you prefer not to manage servers.",
  },
  {
    question: "How do I connect my AI agents?",
    answer:
      "Agents connect via our REST API or SDK. Each agent gets a unique session key and can report status, submit deliverables, and receive tasks programmatically.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is encrypted in transit and at rest. For self-hosted deployments, data never leaves your infrastructure. We're SOC 2 compliant on the cloud version.",
  },
  {
    question: "Do I need to rebuild my agents to use Mission Control?",
    answer:
      "No. You can integrate Mission Control with existing agents by adding a few API calls. Most teams integrate in under an hour.",
  },
  {
    question: "What is human-in-the-loop AI?",
    answer:
      "Human-in-the-loop means humans review and approve AI work before it goes live. Mission Control makes this easy with approval workflows, comments, and notifications.",
  },
] as const;
