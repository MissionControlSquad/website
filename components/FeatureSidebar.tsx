"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FEATURE_SECTIONS = [
  {
    title: "Overview",
    links: [{ label: "All Features", href: "/features" }],
  },
  {
    title: "Feature Pages",
    links: [
      { label: "Agent Dashboard", href: "/features/agent-dashboard" },
      { label: "Task Orchestration", href: "/features/task-orchestration" },
      { label: "Agent Monitoring", href: "/features/agent-monitoring" },
      { label: "Multi-Agent Workflows", href: "/features/multi-agent-workflows" },
    ],
  },
];

const ALL_LINKS = FEATURE_SECTIONS.flatMap((s) => s.links);

export function FeatureSidebar() {
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
      <nav className="hidden md:block sticky top-24" aria-label="Features navigation">
        {FEATURE_SECTIONS.map((section) => (
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
