/**
 * Theme controller — the runtime half of the light/dark theme system.
 *
 * The theme lives as a `.dark` class on <html>. An inline, dependency-free
 * bootstrap script (see `themeInitScript`, rendered in src/app/layout.tsx)
 * applies it during the initial HTML parse — before first paint — so there
 * is never a flash of the wrong theme. This module then reads and writes
 * the same class at runtime.
 *
 * Persistence contract:
 * - First visit      → the visitor's system preference is respected.
 * - Explicit choice  → stored in localStorage under THEME_STORAGE_KEY.
 * - Future visits    → the stored choice wins.
 * - Live system changes are followed ONLY while no explicit choice is
 *   stored — a user's explicit choice is never overridden.
 */

export type Theme = "light" | "dark";

/** localStorage key for the visitor's explicit theme choice. */
export const THEME_STORAGE_KEY = "nnamdi-portfolio:theme";

type Listener = () => void;

const listeners = new Set<Listener>();
let switchingTimer: ReturnType<typeof setTimeout> | undefined;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** The theme currently applied to the document — the source of truth. */
export function getDomTheme(): Theme {
  return isBrowser() && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme | null {
  if (!isBrowser()) return null;
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    /* storage unavailable (private mode, blocked) — fall back to system */
    return null;
  }
}

function writeStoredTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* non-persistent storage — the choice still applies for this session */
  }
}

/**
 * Inline, dependency-free bootstrap executed during the initial HTML parse
 * (before first paint) — this is what prevents a flash of the wrong theme.
 * Exported so the script and the runtime share one storage key and one
 * resolution rule.
 */
export function themeInitScript(): string {
  return `(function () {
  try {
    var stored = null;
    try {
      stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    } catch (error) {}
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (error) {}
})();`;
}

/**
 * Brief, unified color crossfade for manual switches only. Skipped entirely
 * under prefers-reduced-motion (and the global reduce rule removes
 * transitions outright regardless).
 */
function startSwitchTransition(): void {
  if (!isBrowser()) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  root.classList.add("theme-switching");
  clearTimeout(switchingTimer);
  switchingTimer = setTimeout(
    () => root.classList.remove("theme-switching"),
    320,
  );
}

function emitChange(): void {
  for (const listener of listeners) listener();
}

/**
 * Apply a theme to the document.
 *
 * @param options.persist — pass `true` for an explicit user choice (saved
 *   to localStorage). Omit it for passive updates (following the system
 *   preference) so they never create or modify a stored preference.
 */
export function applyTheme(
  theme: Theme,
  options: { persist?: boolean } = {},
): void {
  if (!isBrowser()) return;
  const root = document.documentElement;
  const isDark = theme === "dark";
  if (root.classList.contains("dark") === isDark) return; // no-op
  startSwitchTransition();
  root.classList.toggle("dark", isDark);
  if (options.persist) writeStoredTheme(theme);
  emitChange();
}

/** Toggle between themes. The choice is persisted. */
export function toggleTheme(): void {
  applyTheme(getDomTheme() === "dark" ? "light" : "dark", { persist: true });
}

/**
 * Subscribe to theme changes: explicit toggles plus live system-preference
 * changes (applied only while no explicit choice is stored).
 * Returns an unsubscribe function.
 */
export function subscribeToTheme(listener: Listener): () => void {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemPreferenceChange = (): void => {
    if (readStoredTheme() === null) {
      applyTheme(media.matches ? "dark" : "light");
    }
  };
  media.addEventListener("change", onSystemPreferenceChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemPreferenceChange);
  };
}
