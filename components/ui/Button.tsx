"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-50 disabled:pointer-events-none",
          // Size variants
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-8 py-3 text-base": size === "lg",
          },
          // Style variants
          {
            "gradient-bg text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98]":
              variant === "primary",
            "bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600":
              variant === "secondary",
            "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/50": variant === "ghost",
            "border border-neutral-700 text-neutral-100 hover:bg-neutral-800 hover:border-primary-500/50":
              variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
