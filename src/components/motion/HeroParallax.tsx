"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroParallaxProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Hero pointer-parallax provider.
 *
 * Tracks pointer position within the hero section and exposes normalized
 * --mx / --my (-1 … 1) CSS variables to descendants. Layers multiply these
 * at different rates for a convincing depth effect.
 *
 * Behavior:
 * - Disabled under prefers-reduced-motion
 * - Disabled on coarse pointers (touch) — mobile gets a graceful static layout
 * - Rafs the updates for smoothness
 * - Uses transform only (GPU)
 * - Text layers move minimally (2–4px) to remain readable; media and decor
 *   move more (10–22px) for noticeable depth without distraction.
 * - Adds a subtle scroll-parallax fallback: on scroll, hero media drifts
 *   slightly opposite to scroll for mobile / touch users.
 */
export function HeroParallax({ children, className = "" }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (reducedMotion) return;
    // Disable on coarse pointer (mobile/tablet) — static is correct there
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.matchMedia("(max-width: 1024px)").matches;
    if (isCoarse && isSmall) {
      // On mobile, provide subtle scroll-based parallax instead of pointer
      const onScroll = () => {
        const rect = container.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, -rect.top / 500));
        // Only when hero is near viewport top
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          container.style.setProperty("--mx", `${progress * 0.3}`);
          container.style.setProperty("--my", `${progress * 0.5}`);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      target.current.x = Math.max(-1, Math.min(1, x));
      target.current.y = Math.max(-1, Math.min(1, y));
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onPointerLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      rafRef.current = null;
      // Lerp for buttery smoothing (premium feel)
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      container.style.setProperty("--mx", current.current.x.toFixed(3));
      container.style.setProperty("--my", current.current.y.toFixed(3));

      const dx = Math.abs(target.current.x - current.current.x);
      const dy = Math.abs(target.current.y - current.current.y);
      if (dx > 0.001 || dy > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={`hero-parallax ${className}`.trim()}>
      {children}
    </div>
  );
}
