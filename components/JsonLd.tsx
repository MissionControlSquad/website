"use client";

export function JsonLd({ data }: { data: object }) {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
      }}
    />
  );
}
