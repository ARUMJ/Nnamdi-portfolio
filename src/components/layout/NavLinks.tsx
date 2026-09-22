"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/data/site";

/**
 * Desktop navigation. Client component only because it needs usePathname()
 * to highlight the active route — everything else in the header remains
 * server-rendered.
 *
 * Build 06: sliding underline (scaleX) + premium hover. Active state is a
 * persistent scaleX(1); hover animates from 0→1. GPU-only.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-7 lg:gap-8">
      {site.nav.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`nav-link pb-1 text-sm transition-colors duration-200 ${
                isActive
                  ? "font-medium text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
