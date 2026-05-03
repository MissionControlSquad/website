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
    <button onClick={() => signIn()}>
      <Button size={size}>Get Started</Button>
    </button>
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
    <button
      className="w-full"
      onClick={() => {
        signIn();
        onClose();
      }}
      tabIndex={isOpen ? 0 : -1}
    >
      <Button className="w-full" size="md">
        <span className="flex items-center gap-1.5">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success-500/20 text-success-400 text-xs font-medium leading-none">
            7-day free trial
          </span>
          Get Started
        </span>
      </Button>
    </button>
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
      <button className="w-full" tabIndex={isOpen ? 0 : -1}>
        <Button className="w-full" size="md">
          Get Started
        </Button>
      </button>
    );
  }

  return <NavbarAuthCTAMobileInner onClose={onClose} isOpen={isOpen} />;
}
