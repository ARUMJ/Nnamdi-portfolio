"use client";

import { useTheme } from "@/hooks/useTheme";
import { toggleTheme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5V5M12 19v2.5M2.5 12H5m14 0h2.5M5.3 5.3 7 7m10 10 1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M20.6 14.2A8.8 8.8 0 0 1 9.8 3.4a8.8 8.8 0 1 0 10.8 10.8Z" />
    </svg>
  );
}

/**
 * Light/dark theme switch for the site header.
 *
 * Renders the icon of the theme it will activate (moon in light mode, sun
 * in dark mode). The current state is announced by a dynamic accessible
 * name, so the control is fully usable by keyboard and screen reader.
 * State and persistence live in the theme store (src/lib/theme.ts) — this
 * component only renders and forwards the click.
 */
export function ThemeToggle() {
  const isDark = useTheme() === "dark";

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-foreground"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
