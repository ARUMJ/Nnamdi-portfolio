import Link from "next/link";

import { site } from "@/data/site";

import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky site header (server component).
 * The only client islands are NavLinks (active route), MobileNav (menu
 * state) and ThemeToggle (theme state) — kept deliberately small.
 *
 * Build 06: header CTA has tactile btn-motion.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <BrandMark className="size-8 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {site.shortName}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={site.primaryCta.href}
            className="btn-motion hidden items-center gap-2 rounded-full bg-button px-5 py-2.5 text-sm font-medium text-button-foreground hover:bg-button-hover md:inline-flex"
          >
            {site.primaryCta.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
