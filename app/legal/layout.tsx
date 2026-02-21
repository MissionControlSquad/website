"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@/components/icons";
import { Container } from "@/components/ui/Container";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Minimal header */}
      <header className="border-b border-neutral-800">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-neutral-100">
              <Image
                src="/favicon-32x32.png"
                alt="AgentCenter.cloud"
                width={28}
                height={28}
                className="rounded"
              />
              <span>AgentCenter</span>
            </Link>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">{children}</div>
        </Container>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-neutral-800 py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Jagodana LLC. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/legal/privacy-policy"
                className="hover:text-neutral-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:text-neutral-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
