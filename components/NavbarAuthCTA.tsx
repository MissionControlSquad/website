"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useSaaSAuth } from "@buildbase/sdk/react";
import { useBuildbaseReady } from "@/components/providers/BuildbaseProvider";

interface Props {
  size?: "sm" | "md";
}

function NavbarAuthCTAInner({ size }: { size: "sm" | "md" }) {
  const { isAuthenticated, signIn } = useSaaSAuth();

  if (isAuthenticated) {
    return (
      <Link href="/dashboard">
        <Button size={size}>Dashboard</Button>
      </Link>
    );
  }

  return (
    <Button size={size} onClick={() => signIn()}>
      Get Started
    </Button>
  );
}

export function NavbarAuthCTA({ size = "sm" }: Props) {
  const providerReady = useBuildbaseReady();
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (providerReady) setCanRender(true);
  }, [providerReady]);

  if (!canRender) {
    return <Button size={size}>Get Started</Button>;
  }

  return <NavbarAuthCTAInner size={size} />;
}

interface MobileProps {
  onClose: () => void;
  isOpen: boolean;
}

function NavbarAuthCTAMobileInner({ onClose, isOpen }: MobileProps) {
  const { isAuthenticated, signIn } = useSaaSAuth();

  if (isAuthenticated) {
    return (
      <Link href="/dashboard" className="w-full" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
        <Button className="w-full" size="md">
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className="w-full"
      size="md"
      tabIndex={isOpen ? 0 : -1}
      onClick={() => {
        signIn();
        onClose();
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success-500/20 text-success-400 text-xs font-medium leading-none">
          7-day free trial
        </span>
        Get Started
      </span>
    </Button>
  );
}

export function NavbarAuthCTAMobile({ onClose, isOpen }: MobileProps) {
  const providerReady = useBuildbaseReady();
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (providerReady) setCanRender(true);
  }, [providerReady]);

  if (!canRender) {
    return (
      <Button className="w-full" size="md" tabIndex={isOpen ? 0 : -1} disabled>
        Get Started
      </Button>
    );
  }

  return <NavbarAuthCTAMobileInner onClose={onClose} isOpen={isOpen} />;
}
