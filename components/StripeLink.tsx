"use client";

import { useStripeLink } from "@/lib/hooks/useStripeLink";

interface StripeLinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A link to the Stripe checkout that automatically appends the Endorsely
 * referral ID (`client_reference_id`) when available.
 */
export function StripeLink({ children, className }: StripeLinkProps) {
  const stripeLink = useStripeLink();

  return (
    <a href={stripeLink} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
