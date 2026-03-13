"use client";

import { useEffect } from "react";
import { trackBlogView } from "@/lib/analytics";

interface BlogTrackerProps {
  slug: string;
  title: string;
}

export default function BlogTracker({ slug, title }: BlogTrackerProps) {
  useEffect(() => {
    trackBlogView(slug, title);
  }, [slug, title]);

  return null;
}
