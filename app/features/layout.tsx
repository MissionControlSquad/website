import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { FeatureSidebar } from "@/components/FeatureSidebar";

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16 bg-neutral-950">
        <Container className="py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <aside className="md:w-56 flex-shrink-0" aria-label="Features navigation">
              <FeatureSidebar />
            </aside>
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
