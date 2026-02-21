import { Sparkles } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, TRUST_INDICATORS, CAL_LINK, STRIPE_LINK } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary-600/10 blur-[100px] rounded-full" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="mb-6 animate-hero-fade-in [animation-delay:100ms]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
              <Sparkles size={16} aria-hidden="true" />
              <span>Built for OpenClaw agents</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 mb-6 animate-hero-fade-in [animation-delay:200ms]">
            {SITE_CONFIG.tagline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 animate-hero-fade-in [animation-delay:300ms]">
            {SITE_CONFIG.description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-hero-fade-in [animation-delay:400ms]">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Book a Demo
              </Button>
            </a>
            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Get Early Access</Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-400 animate-hero-fade-in [animation-delay:500ms]">
            {TRUST_INDICATORS.map((indicator) => (
              <span key={indicator} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary-500" />
                {indicator}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-primary-500/10">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-neutral-800 text-xs text-neutral-500">
                  agentcenter.cloud
                </div>
              </div>
            </div>
            {/* Dashboard screenshot — responsive srcSet to avoid serving 1920w on small screens */}
            {/* aspect-ratio prevents CLS while image loads */}
            <div style={{ aspectRatio: "1920 / 858" }} className="relative w-full">
              <picture>
                <source
                  srcSet="/dashboard-preview-800w.webp 800w, /dashboard-preview-1200w.webp 1200w, /dashboard-preview.webp 1920w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  type="image/webp"
                />
                <img
                  src="/dashboard-preview.webp"
                  alt="AgentCenter Mission Control dashboard showing Kanban board with agent tasks, squad members, and activity feed"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
