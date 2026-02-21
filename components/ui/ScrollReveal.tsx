"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for child items (applied via CSS custom property) */
  staggerIndex?: number;
  /** Root margin for IntersectionObserver */
  margin?: string;
}

/**
 * Lightweight scroll-reveal wrapper using IntersectionObserver + CSS animations.
 * Replaces framer-motion for simple fade-in-up on scroll patterns.
 */
export function ScrollReveal({
  children,
  className = "",
  staggerIndex,
  margin = "-100px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-revealed");
          observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  const style =
    staggerIndex !== undefined
      ? ({ "--stagger-index": staggerIndex } as React.CSSProperties)
      : undefined;

  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
