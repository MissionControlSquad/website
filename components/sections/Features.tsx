"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { FEATURES, FEATURE_CATEGORIES } from "@/lib/constants";
import {
  LayoutGrid,
  Activity,
  AtSign,
  FileCheck,
  History,
  ShieldCheck,
  FolderKanban,
  BookOpen,
  Copy,
  GitBranch,
  Ban,
  Wand,
  Users,
  HeartPulse,
  ListTodo,
  Smile,
  Search,
  Upload,
  GitCommit,
  CheckSquare,
  Bot,
  MessageCircle,
  Tag,
  Calendar,
  Clock,
} from "@/components/icons";
import { ComponentType, SVGProps } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  LayoutGrid,
  Activity,
  AtSign,
  FileCheck,
  History,
  ShieldCheck,
  FolderKanban,
  BookOpen,
  Copy,
  GitBranch,
  Ban,
  Wand,
  Users,
  HeartPulse,
  ListTodo,
  Smile,
  Search,
  Upload,
  GitCommit,
  CheckSquare,
  Bot,
  MessageCircle,
  Tag,
  Calendar,
  Clock,
};

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>(FEATURE_CATEGORIES[0].id);
  const activeCategory = FEATURE_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section id="features" className="py-24 md:py-32">
      <Container>
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            Everything you need to manage AI agents
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Built for teams running multi-agent systems. All the tools you need in one dashboard.
          </p>
        </ScrollReveal>

        {/* Zone 1: Core features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <ScrollReveal key={feature.title} staggerIndex={i}>
                <Card hover className="h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Zone 2: Tabbed "More Features" section */}
        <ScrollReveal className="mt-20">
          {/* Sub-header */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-3">
              Explore all capabilities
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto">
              From project management to audit trails — everything&apos;s built in.
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-10 justify-start md:justify-center">
            {FEATURE_CATEGORIES.map((category) => {
              const TabIcon = iconMap[category.icon];
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary-500/15 text-primary-400 border border-primary-500/30"
                      : "bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 hover:text-neutral-200 hover:border-neutral-600"
                  }`}
                >
                  <TabIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div
            key={activeTab}
            className="tab-panel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeCategory.features.map((feature) => {
              const FeatureIcon = iconMap[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FeatureIcon className="w-5 h-5 text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-100 mb-1">{feature.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
