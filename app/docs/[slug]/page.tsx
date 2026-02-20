import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BreadcrumbJsonLd } from "next-seo";
import { getAllDocs, getDocBySlug } from "@/lib/docs";
import { OG_IMAGE, OG_IMAGE_URL, SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `${SITE_CONFIG.url}/docs/${slug}` },
    openGraph: {
      title: `${doc.title} | AgentCenter Docs`,
      description: doc.description,
      type: "article",
      url: `${SITE_CONFIG.url}/docs/${slug}`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} | AgentCenter Docs`,
      description: doc.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE_CONFIG.url },
          { name: "Docs", item: `${SITE_CONFIG.url}/docs` },
          { name: doc.title, item: `${SITE_CONFIG.url}/docs/${slug}` },
        ]}
      />
      <h1>{doc.title}</h1>
      {doc.description && <p className="lead text-neutral-400">{doc.description}</p>}
      <MDXRemote source={doc.content} />
    </>
  );
}
