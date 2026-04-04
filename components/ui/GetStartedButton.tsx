import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/icons";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface GetStartedButtonProps {
  /**
   * "default"  — wraps <Button> (Navbar, simple CTAs)
   * "primary"  — filled bg-primary-500 pill with ArrowRight icon (Hero-style CTAs)
   * "link"     — inline text link with underline (inline prose / docs)
   */
  variant?: "default" | "primary" | "link";
  size?: ButtonProps["size"];
  label?: string;
  className?: string;
}

/**
 * Navigates to /pricing so users can choose a plan before checkout.
 * Use this everywhere a "Get Started" CTA appears outside the pricing section.
 */
export function GetStartedButton({
  variant = "default",
  size = "sm",
  label = "Get Started",
  className,
}: GetStartedButtonProps) {
  if (variant === "primary") {
    return (
      <Link
        href="/pricing"
        className={
          className ??
          "group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors"
        }
      >
        {label}
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
          aria-hidden="true"
        />
      </Link>
    );
  }

  if (variant === "link") {
    return (
      <Link
        href="/pricing"
        className={
          className ??
          "text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
        }
      >
        {label}
      </Link>
    );
  }

  // default — wraps <Button>
  return (
    <Link href="/pricing" className={className}>
      <Button size={size}>{label}</Button>
    </Link>
  );
}
