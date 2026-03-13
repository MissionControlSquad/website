"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const COMPARE_SECTIONS = [
  {
    title: "Overview",
    links: [{ label: "All Comparisons", href: "/compare" }],
  },
  {
    title: "Popular",
    links: [{ label: "vs Mission Control HQ", href: "/compare/vs-mission-control-hq" }],
  },
  {
    title: "vs Alternatives",
    links: [
      { label: "vs CrewAI Cloud", href: "/compare/vs-crewai" },
      { label: "vs LangSmith", href: "/compare/vs-langsmith" },
      { label: "vs AgentOps", href: "/compare/vs-agentops" },
      { label: "vs Relevance AI", href: "/compare/vs-relevance-ai" },
      { label: "vs SuperAGI", href: "/compare/vs-superagi" },
      { label: "vs Lindy AI", href: "/compare/vs-lindy-ai" },
      { label: "vs MindStudio", href: "/compare/vs-mindstudio" },
      { label: "vs Lyzr Agent Studio", href: "/compare/vs-lyzr" },
      { label: "vs DIY Dashboard", href: "/compare/vs-diy-agent-management" },
    ],
  },
];

const ALL_LINKS = COMPARE_SECTIONS.flatMap((s) => s.links);

export function CompareSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal scrollable pills */}
      <div className="md:hidden flex overflow-x-auto gap-2 pb-1 -mx-4 px-4">
        {ALL_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-primary-500/15 text-primary-400 border-primary-500/30"
                  : "text-neutral-400 border-neutral-700 hover:text-neutral-100 hover:border-neutral-500"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Desktop: full vertical sidebar */}
      <nav className="hidden md:block sticky top-24" aria-label="Comparison navigation">
        {COMPARE_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-1.5 text-sm transition-colors ${
                      isActive
                        ? "text-neutral-100 font-medium"
                        : "text-neutral-400 hover:text-neutral-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}
