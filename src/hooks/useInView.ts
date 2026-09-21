"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Start observing this many pixels before the element is actually visible. */
  rootMargin?: string;
}

interface UseInViewResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  /** Current visibility (updates as the element enters/leaves the margin). */
  inView: boolean;
  /** Sticky flag: true once the element has been seen at least once. */
  hasEnteredView: boolean;
}

/**
 * IntersectionObserver hook used to defer heavy media (video bytes) until an
 * element approaches the viewport, and to pause ambient playback that has
 * scrolled out of view.
 *
 * SSR-safe: both flags start `false`, so server-rendered markup never
 * contains media sources. Browsers without IntersectionObserver immediately
 * report in-view so media still loads (graceful legacy behaviour).
 */
export function useInView<T extends HTMLElement>({
  rootMargin = "256px",
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setInView(visible);
        if (visible) setHasEnteredView(true);
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView, hasEnteredView };
}
