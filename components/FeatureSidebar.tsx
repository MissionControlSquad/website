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

export function FeatureSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-24" aria-label="Features navigation">
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
  );
}
