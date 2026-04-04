"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG, CAL_LINK, PLANS } from "@/lib/constants";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useFocusTrap(isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-neutral-100 hover:text-primary-400 transition-colors"
          >
            <Image
              src="/favicon-32x32.png"
              alt="AgentCenter.cloud"
              width={28}
              height={28}
              className="rounded"
            />
            <span>{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="secondary">
                Book a Demo
              </Button>
            </a>
            <GetStartedButton size="sm" />
          </div>

          {/* Mobile/Tablet CTA + Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="secondary">
                Book a Demo
              </Button>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 min-w-11 min-h-11 flex items-center justify-center text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu — CSS grid-rows trick for height:auto animation */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "lg:hidden grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label={isOpen ? "Mobile navigation menu" : undefined}
        id="mobile-menu"
      >
        <div className="overflow-hidden bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
          <Container>
            <nav className="py-4 space-y-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-neutral-300 hover:text-neutral-100 transition-colors"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 pt-4 border-t border-neutral-800 space-y-3">
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                  className="w-full"
                >
                  <Button className="w-full" size="md" variant="secondary">
                    Book a Demo
                  </Button>
                </a>
                <Link
                  href="/pricing"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <Button className="w-full" size="md">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-success-500/20 text-success-400 text-xs font-medium leading-none">
                        {`from $${PLANS.starter.monthly}/mo`}
                      </span>
                      Get Started
                    </span>
                  </Button>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
