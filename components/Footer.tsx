import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, MessageCircle } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={20} />,
  Twitter: <Twitter size={20} />,
  MessageCircle: <MessageCircle size={20} />,
};

export default function Footer() {
  return (
    <footer className="py-16 border-t border-neutral-800 bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
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
            <p className="text-neutral-400 mb-6 max-w-xs">{SITE_CONFIG.description}</p>
            {/* Social links */}
            <div className="flex gap-4">
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
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-neutral-100 mb-4">Product</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-semibold text-neutral-100 mb-4">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright + payment badge */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col items-center gap-4">
          <p className="text-neutral-500 text-sm text-center">
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
                className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity dark:hidden"
              />
              {/* Dark mode: transparent-background badge (Themeisle) */}
              <Image
                src="/stripe-badge-dark.png"
                alt="Powered by Stripe"
                width={400}
                height={130}
                className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity hidden dark:block"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
