"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Bot, FileCheck, CheckCircle } from "@/components/icons";

interface Metric {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  {
    icon: <Bot size={20} className="text-primary-400" />,
    value: 50,
    suffix: "+",
    label: "Agents Deployed",
  },
  {
    icon: <CheckCircle size={20} className="text-primary-400" />,
    value: 1000,
    suffix: "+",
    label: "Tasks Completed",
  },
  {
    icon: <FileCheck size={20} className="text-primary-400" />,
    value: 500,
    suffix: "+",
    label: "Deliverables Submitted",
  },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-6 bg-neutral-900/50 border-y border-neutral-800/50"
      aria-label="Platform metrics"
    >
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3 text-neutral-300">
              <span className="flex-shrink-0">{metric.icon}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl md:text-2xl font-bold text-neutral-100">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    isVisible={isVisible}
                  />
                </span>
                <span className="text-sm text-neutral-400">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
