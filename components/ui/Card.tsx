import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  className,
  children,
  hover = false,
  glow = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-neutral-800 border border-neutral-700 p-6",
        glow && "card-glow",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/30 card-glow-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
