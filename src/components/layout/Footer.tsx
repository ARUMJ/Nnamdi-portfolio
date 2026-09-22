import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { site } from "@/data/site";

import { BrandMark } from "./BrandMark";

/** Site footer: identity, navigation and the standing project CTA. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col gap-12 py-14 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-7" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {site.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {site.positioning}. Building practical digital solutions for
            businesses and organizations.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Navigate
          </p>
          <ul className="mt-5 grid gap-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground transition-colors duration-200 hover:text-accent"
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
          <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
            Have a digital problem to solve? Let&apos;s turn the requirement
            into a practical solution.
          </p>
          <Link
            href={site.primaryCta.href}
            className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
          >
            {site.primaryCta.label}
            <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-5 border-t border-border-subtle pt-5 text-sm text-foreground-muted">
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent"
            >
              WhatsApp
            </a>{" "}
            <span className="whitespace-nowrap">{site.contact.whatsappNumber}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Practical digital solutions — built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
