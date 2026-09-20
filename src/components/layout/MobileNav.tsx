"use client";

import Link from "next/link";
import { useId, useEffect, useRef, useState } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { site } from "@/data/site";

/**
 * Accessible mobile navigation:
 * - aria-expanded / aria-controls on the toggle
 * - Escape closes, body scroll locks while open
 * - focus moves into the panel on open and returns to the toggle on close
 * - the collapsed panel is `inert`, keeping it out of the tab order
 * - height animates via a CSS grid-rows transition (no layout jank)
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="size-5"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h10" />
            </>
          )}
        </svg>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        tabIndex={-1}
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 top-16 z-40 overflow-hidden bg-paper shadow-xl shadow-ink/10 transition-[grid-template-rows] duration-300 ease-out outline-none ${
          open ? "grid-rows-[1fr] border-b border-line" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Mobile" className="min-h-0 overflow-hidden">
          <ul className="container-page flex flex-col py-4">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-line/70 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4 font-display text-xl text-ink transition-colors duration-200 hover:text-accent"
                >
                  {item.label}
                  <ArrowIcon className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            <li className="pb-3 pt-5">
              <Link
                href={site.primaryCta.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-deep"
              >
                {site.primaryCta.label}
                <ArrowIcon className="size-4" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
