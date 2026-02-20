import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";

interface ContentPageProps {
  content: string;
  title?: string;
  subtitle?: string;
}

export function ContentPage({ content, title, subtitle }: ContentPageProps) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Container className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">{title}</h1>
            )}
            {subtitle && <p className="text-xl text-neutral-400 mb-10">{subtitle}</p>}
            <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-neutral-100 prose-a:text-primary-400 prose-strong:text-neutral-200 prose-table:text-neutral-300 prose-th:text-neutral-200 prose-td:text-neutral-300 prose-th:border-neutral-700 prose-td:border-neutral-800">
              <MDXRemote source={content} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
