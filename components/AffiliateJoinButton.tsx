"use client";

import { ArrowRight } from "@/components/icons";
import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateJoinButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AffiliateJoinButton({
  href,
  children,
  className,
}: AffiliateJoinButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackAffiliateClick()}
    >
      {children}
    </a>
  );
}
