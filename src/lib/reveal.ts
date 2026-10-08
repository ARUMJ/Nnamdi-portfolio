/**
 * Reveal bootstrap — the fail-open contract for the scroll-reveal system.
 *
 * Build 06 hid `.reveal` content from an inline `html.js` marker and relied
 * entirely on the client controller to show it again. If that controller
 * never ran (failed chunk, blocked script, an exception), the content could
 * stay invisible.
 *
 * Build 08 keeps the pre-paint hiding (no flash of un-animated content) but
 * adds a liveness contract:
 *
 * - The controller, once it has armed the IntersectionObserver (or decided
 *   reveals should not animate at all), marks
 *   `<html data-reveal-controller="ready">`.
 * - The inline bootstrap sets a timer. If the controller has not reported in
 *   by then, `<html>` gets `.reveal-failsafe` and the CSS forces every
 *   reveal target visible — animation is never a prerequisite for content.
 *
 * The constants live here so the inline script and the client controller
 * cannot drift apart.
 */

/** Attribute the controller sets on <html> once reveals are wired up. */
export const REVEAL_CONTROLLER_ATTRIBUTE = "data-reveal-controller";

/** Value of the attribute above that means "the controller is alive". */
export const REVEAL_READY_VALUE = "ready";

/** Class the bootstrap (or a late controller) adds to force content visible. */
export const REVEAL_FAILSAFE_CLASS = "reveal-failsafe";

/** How long the bootstrap waits for the controller before failing open. */
export const REVEAL_FAILSAFE_TIMEOUT_MS = 2500;

/**
 * Inline, dependency-free script rendered in src/app/layout.tsx. Runs during
 * the initial HTML parse: marks JS presence (pre-paint, so the reveal
 * animation is armed without a flash) and schedules the fail-open timer.
 */
export function revealBootstrapScript(): string {
  return `(function () {
  var root = document.documentElement;
  try {
    root.classList.add("js");
  } catch (error) {}
  try {
    window.setTimeout(function () {
      try {
        if (root.getAttribute(${JSON.stringify(REVEAL_CONTROLLER_ATTRIBUTE)}) !== ${JSON.stringify(REVEAL_READY_VALUE)}) {
          root.classList.add(${JSON.stringify(REVEAL_FAILSAFE_CLASS)});
        }
      } catch (error) {}
    }, ${REVEAL_FAILSAFE_TIMEOUT_MS});
  } catch (error) {}
})();`;
}
