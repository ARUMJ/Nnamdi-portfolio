"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the visitor's motion preference.
 *
 * Defaults to `true` (reduced) so server-rendered HTML and the first client
 * paint never enable autoplay or motion before the real preference is known —
 * no autoplay flash, no hydration mismatch. After hydration the actual
 * preference is read and kept in sync with system changes.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
