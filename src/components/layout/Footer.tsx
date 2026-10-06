import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { site } from "@/data/site";

import { BrandMark } from "./BrandMark";

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.03 2.25a9.77 9.77 0 0 0-8.38 14.79l-1.3 4.73 4.84-1.27a9.77 9.77 0 1 0 4.84-18.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8.2 7.54c-.2-.43-.4-.44-.58-.44h-.5c-.18 0-.47.07-.72.34s-.94.92-.94 2.24.96 2.6 1.1 2.78c.14.19 1.88 3.02 4.65 4.11 2.29.9 2.76.72 3.26.68.5-.05 1.62-.66 1.85-1.3.23-.65.23-1.2.16-1.31-.07-.12-.26-.19-.54-.33-.27-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.6.14-.18.28-.69.89-.85 1.07-.16.19-.31.21-.59.07-.28-.14-1.18-.44-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.56.12-.12.28-.32.42-.48.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.61-1.48-.84-2.03Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4.1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.9 3h3.1l-6.8 7.8L23.2 21h-6.3L12 14.6 6.4 21H3.2l7.3-8.4L3 3h6.5l4.4 5.9L18.9 3Zm-1.1 16h1.7L8.4 4.9H6.6L17.8 19Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "WhatsApp",
    href: site.contact.whatsappUrl,
    Icon: WhatsAppIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gospel_j1?stkn=MTdsODV6dHBpY2xnag==",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://x.com/Jona_G4",
    Icon: XIcon,
  },
] as const;

/** Site footer: identity, navigation, project CTA and social channels. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 border-b border-border-subtle pb-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pb-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandMark className="size-8" />
              <span className="font-display text-base font-semibold leading-tight tracking-tight text-foreground">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {site.positioning}. Building practical digital solutions for
              businesses and organizations.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <nav aria-label="Footer navigation">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Navigate
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-1">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-xs">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Start a project
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Have a digital problem to solve? Let&apos;s turn the requirement
                into a practical solution.
              </p>
              <Link
                href={site.primaryCta.href}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
              >
                {site.primaryCta.label}
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="footer-connect-heading"
          className="border-b border-border-subtle py-6 sm:py-7"
        >
          <h2
            id="footer-connect-heading"
            className="font-display text-lg font-medium tracking-tight text-foreground"
          >
            Connect
          </h2>
          <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label} className="flex min-h-11 items-center gap-2.5">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:bg-surface hover:text-accent focus-visible:rounded-full sm:px-3"
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-2 pt-5 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Practical digital solutions built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
