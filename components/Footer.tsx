import Link from "next/link";
import Image from "next/image";
import { Twitter, MessageCircle, Github } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG, FOOTER_LINKS, SOCIAL_LINKS, CAL_LINK } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Twitter: <Twitter size={20} />,
  MessageCircle: <MessageCircle size={20} />,
  Github: <Github size={20} />,
};

const FOOTER_SECTIONS = [
  { title: "Product", links: FOOTER_LINKS.product },
  { title: "Use Cases", links: FOOTER_LINKS.useCases },
  { title: "Compare", links: FOOTER_LINKS.comparisons },
  { title: "Resources", links: FOOTER_LINKS.resources },
  { title: "Legal", links: FOOTER_LINKS.legal },
] as const;

export default function Footer() {
  return (
    <footer className="py-16 border-t border-neutral-800 bg-neutral-950">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-neutral-100 mb-4"
            >
              <Image
                src="/favicon-32x32.png"
                alt="AgentCenter.cloud"
                width={28}
                height={28}
                className="rounded"
              />
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-xs text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            {/* Book a Demo */}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-700 transition-colors text-sm font-medium mb-6 w-fit"
            >
              Book a Demo
            </a>

            {/* Social links */}
            <div className="flex gap-4 mb-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
                  aria-label={link.label}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>

            {/* Product Hunt badge */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.producthunt.com/products/agentcenter-for-openclaw?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-agentcenter-for-openclaw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1088308&theme=dark&t=1773145635606"
                  alt="AgentCenter for OpenClaw - Mission Control for your OpenClaw agents. | Product Hunt"
                  width={250}
                  height={54}
                  className="w-[250px] h-[54px]"
                />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-neutral-100 mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-neutral-400 hover:text-neutral-100 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright + payment badge */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col items-center gap-4">
          <p className="text-neutral-400 text-sm text-center">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-400 text-sm dark:text-neutral-400">
              Secure, PCI compliant payments
            </span>
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-400 transition-colors"
              aria-label="Powered by Stripe"
            >
              {/* Light mode: white-background badge (Themeisle) */}
              <Image
                src="/stripe-badge-light.png"
                alt="Powered by Stripe"
                width={400}
                height={130}
                sizes="295px"
                className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity dark:hidden"
              />
              {/* Dark mode: transparent-background badge (Themeisle) */}
              <Image
                src="/stripe-badge-dark.png"
                alt="Powered by Stripe"
                width={400}
                height={130}
                sizes="295px"
                className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity hidden dark:block"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
