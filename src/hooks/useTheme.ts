"use client";

import { useSyncExternalStore } from "react";

import { getDomTheme, subscribeToTheme, type Theme } from "@/lib/theme";

/**
 * The currently applied theme, kept in sync with the `.dark` class on
 * <html>.
 *
 * The document class is the source of truth (set before first paint by the
 * inline bootstrap script), so the hook can never desynchronise from what
 * the visitor sees. The server snapshot is always "light": server markup
 * renders the light-state toggle icon, and `useSyncExternalStore` reconciles
 * to the real theme on hydration without a mismatch.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribeToTheme,
    getDomTheme,
    () => "light",
  );
}
