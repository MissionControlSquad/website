"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-3">
            Something went wrong
          </h1>
          <p className="text-neutral-400 mb-8">
            We couldn&apos;t load this page. Try again or head back home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
