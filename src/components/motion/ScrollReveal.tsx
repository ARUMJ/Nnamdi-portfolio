"use client";

import { useEffect } from "react";

import {
  REVEAL_CONTROLLER_ATTRIBUTE,
  REVEAL_FAILSAFE_CLASS,
  REVEAL_READY_VALUE,
} from "@/lib/reveal";

/**
 * Global scroll-reveal controller.
 *
 * Enhances every `.reveal` element (declared in server components) with an
 * IntersectionObserver that adds `.is-visible` when the element enters the
 * viewport. This is the JS fallback for the CSS `view()`-timeline reveal:
 * it works in every browser and respects prefers-reduced-motion.
 *
 * Fail-open contract (Build 08): content is never hidden because this
 * controller failed. As soon as reveals are armed — or the moment we decide
 * they should not animate — `<html data-reveal-controller="ready">` is set,
 * which cancels the bootstrap failsafe in src/lib/reveal.ts. If the
 * controller never runs, that failsafe fires on its own and the CSS makes
 * every reveal target visible. If the failsafe already fired by the time we
 * arrive, all content is shown immediately and no observers are attached.
 *
 * Stagger: elements may declare `data-reveal-delay="120"` (ms) or
 * `style="--reveal-delay: 120ms"` — the CSS reads the variable for
 * transition-delay. For grouped lists we set progressive delays in the
 * component markup (e.g. index * 80ms) rather than auto-staggering here,
 * so the markup remains the source of truth.
 *
 * Performance:
 * - One shared IntersectionObserver (rootMargin tuned to trigger slightly
 *   before the element is fully visible).
 * - Observers disconnect after revealing (no continuous work).
 * - In-view state is a class toggle only (GPU properties: opacity/transform).
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Mark JS presence so CSS `html.js .reveal` rules activate.
    root.classList.add("js");

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const showAll = () => {
      for (const el of document.querySelectorAll<HTMLElement>(".reveal")) {
        el.classList.add("is-visible");
      }
      for (const el of document.querySelectorAll<HTMLElement>(".media-reveal")) {
        el.classList.add("is-visible");
      }
    };

    /**
     * Tell the bootstrap that the controller is alive. If the failsafe
     * already fired (slow or partially failed load), keep everything
     * visible instead of re-hiding it for an animation.
     */
    const markReady = () => {
      root.setAttribute(REVEAL_CONTROLLER_ATTRIBUTE, REVEAL_READY_VALUE);
    };

    if (root.classList.contains(REVEAL_FAILSAFE_CLASS)) {
      showAll();
      markReady();
      return;
    }

    const setupObserver = () => {
      if (mediaQuery.matches) {
        showAll();
        return () => {};
      }

      if (typeof IntersectionObserver === "undefined") {
        showAll();
        return () => {};
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              const delayAttr = target.getAttribute("data-reveal-delay");
              if (delayAttr) {
                target.style.setProperty("--reveal-delay", `${delayAttr}ms`);
              }
              target.classList.add("is-visible");
              for (const inner of target.querySelectorAll<HTMLElement>(".media-reveal")) {
                inner.classList.add("is-visible");
              }
              observer.unobserve(target);
            }
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12,
        },
      );

      const elements = document.querySelectorAll<HTMLElement>(".reveal");
      for (const el of elements) observer.observe(el);

      const mediaElements = document.querySelectorAll<HTMLElement>(".media-reveal:not(.reveal .media-reveal)");
      for (const el of mediaElements) observer.observe(el);

      const mutationObserver = new MutationObserver(() => {
        for (const el of document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")) {
          observer.observe(el);
        }
        for (const el of document.querySelectorAll<HTMLElement>(".media-reveal:not(.is-visible):not(.reveal .media-reveal)")) {
          observer.observe(el);
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    };

    let cleanup = setupObserver();
    markReady();

    const onChange = () => {
      // Re-setup on preference change
      cleanup();
      if (mediaQuery.matches) {
        showAll();
        cleanup = () => {};
      } else {
        // Keep already-visible elements; re-observe the rest.
        cleanup = setupObserver();
      }
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      cleanup();
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return null;
}
