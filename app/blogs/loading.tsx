import { Container } from "@/components/ui/Container";

function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-4 rounded bg-neutral-800 animate-pulse ${className}`} aria-hidden="true" />
  );
}

function SkeletonCard() {
  return (
    <div className="border-b border-neutral-800/50 pb-8 md:pb-12 last:border-0">
      {/* Date & reading time */}
      <div className="flex items-center gap-3 mb-3">
        <SkeletonLine className="w-32 h-3.5" />
        <SkeletonLine className="w-20 h-3.5" />
      </div>
      {/* Title */}
      <SkeletonLine className="w-3/4 h-7 mb-2" />
      <SkeletonLine className="w-1/2 h-7 mb-3" />
      {/* Description */}
      <SkeletonLine className="w-full h-4 mb-2" />
      <SkeletonLine className="w-2/3 h-4 mb-4" />
      {/* Tags */}
      <div className="flex gap-2">
        <SkeletonLine className="w-16 h-6 rounded-full" />
        <SkeletonLine className="w-20 h-6 rounded-full" />
        <SkeletonLine className="w-14 h-6 rounded-full" />
      </div>
    </div>
  );
}

export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header skeleton */}
      <div className="pt-32 pb-16 border-b border-neutral-800">
        <Container>
          <SkeletonLine className="w-28 h-4 mb-8" />
          <SkeletonLine className="w-40 h-10 md:h-12 mb-4" />
          <SkeletonLine className="w-96 max-w-full h-5" />
        </Container>
      </div>

      {/* Posts skeleton */}
      <Container>
        <div className="py-16 grid gap-8 md:gap-12" role="status" aria-label="Loading blog posts">
          <span className="sr-only">Loading blog posts…</span>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Container>
    </div>
  );
}
