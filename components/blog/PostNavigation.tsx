import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import type { BlogPost } from "@/lib/blog";

interface PostNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="border-t border-neutral-800 py-8" aria-label="Post navigation">
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blogs/${prev.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
          >
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <ArrowLeft size={12} />
              Previous
            </span>
            <span className="text-sm font-medium text-neutral-300 group-hover:text-primary-400 transition-colors line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blogs/${next.slug}`}
            className="group flex flex-col items-end gap-1 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all text-right"
          >
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              Next
              <ArrowRight size={12} />
            </span>
            <span className="text-sm font-medium text-neutral-300 group-hover:text-primary-400 transition-colors line-clamp-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
