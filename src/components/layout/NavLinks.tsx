"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/data/site";

/**
 * Desktop navigation. Client component only because it needs usePathname()
 * to highlight the active route — everything else in the header remains
 * server-rendered.
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
              className={`relative pb-1 text-sm transition-colors duration-200 ${
                isActive ? "font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
