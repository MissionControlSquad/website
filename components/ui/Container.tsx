import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </Component>
  );
}
