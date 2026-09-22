"use client";

import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees (both axes). Premium = subtle, default 6 */
  maxTilt?: number;
  /** Scale on hover */
  scale?: number;
  /** Disable tilt entirely (force static) */
  disabled?: boolean;
}

/**
 * Premium 3D tilt for project cards.
 *
 * On pointer movement within the card bounds:
 * - calculates rotateX / rotateY (clamped to maxTilt)
 * - tracks glare position for a soft highlight
 * - applies perspective transform via CSS vars (GPU)
 *
 * Disabled:
 * - under prefers-reduced-motion
 * - on coarse pointers (mobile)
 * - when `disabled` prop is true
 *
 * Preserves text readability: tilt is subtle (max 5°), and the card
 * elevates with shadow rather than dramatic rotation.
 */
export function Tilt({ children, className = "", maxTilt = 5, scale = 1.015, disabled = false }: TiltProps) {
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const shouldDisable = disabled || reducedMotion;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (shouldDisable) return;
      // Disable on coarse pointer at runtime (mobile)
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width; // 0..1
      const py = y / rect.height;

      const tiltX = (px - 0.5) * (maxTilt * 2); // -max .. +max
      const tiltY = (0.5 - py) * (maxTilt * 2);

      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      card.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--mx", (px * 2 - 1).toFixed(2));
      card.style.setProperty("--my", (py * 2 - 1).toFixed(2));
    },
    [shouldDisable, maxTilt],
  );

  const handleEnter = useCallback(() => {
    if (shouldDisable) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    setIsHovered(true);
    const card = cardRef.current;
    if (card) card.style.setProperty("--tilt-scale", String(scale));
  }, [shouldDisable, scale]);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
    card.style.setProperty("--mx", "0");
    card.style.setProperty("--my", "0");
  }, []);

  if (shouldDisable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`tilt-wrap ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <div ref={cardRef} className={`tilt-card ${isHovered ? "is-hovered" : ""}`.trim()}>
        {/* Glare overlay */}
        <div aria-hidden="true" className="tilt-glare" />
        {children}
      </div>
    </div>
  );
}
