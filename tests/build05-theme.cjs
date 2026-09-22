// Build 05 — Light & Dark theme validation suite.
// Standalone browser checks. Playwright lives in a separate tooling directory;
// no capture/test dependencies are added to the production app.
//
//   cd /home/user/tooling
//   LD_LIBRARY_PATH=/home/user/tooling/nss/lib:/home/user/tooling/dist/Release/lib \
//   BASE_URL=http://localhost:3000 node /home/user/Nnamdi-portfolio/tests/build05-theme.cjs
//
// Optional: BASE_URL, THEME_TEST_ARTIFACTS (screenshot dir).
//
// Note: the tooling Chromium is the serverless (single-process) build, which
// accumulates memory and dies after a dozen or so pages on small machines —
// so the suite relaunches the browser per section instead of reusing one.
const chromiumPkg = require("@sparticuz/chromium");
// ESM package consumed from CJS — the API lives under `.default`.
const chromiumModule = chromiumPkg.default || chromiumPkg;
const { chromium } = require("playwright-core");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const base = process.env.BASE_URL || "http://localhost:3000";
const artifacts =
  process.env.THEME_TEST_ARTIFACTS ||
  fs.mkdtempSync(path.join(os.tmpdir(), "build05-"));
fs.mkdirSync(artifacts, { recursive: true });

const routes = ["/", "/solutions", "/work", "/about", "/contact"];
const projectTitles = [
  "Prince M Furnishing Concept",
  "D-Connect Delivery Services",
  "PureNest Cleaning Co.",
  "Stayora",
  "PNK / Clarean Peekan",
];

const log = [];
let failures = 0;
const seen = new Set();
const checks = (name, ok, info) => {
  const key = `${name}|${info ?? ""}`;
  if (seen.has(key)) return; // section retry after a crash: report once
  seen.add(key);
  log.push({ name, ok, info });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${info ? `  (${info})` : ""}`);
  if (!ok) failures += 1;
};

/* --------------------------- color helpers --------------------------- */

function srgbToLinear(c) {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance({ r, g, b }) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function parseColor(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a] = m[1].split(",").map((v) => parseFloat(v));
  return { r, g, b, a: a === undefined ? 1 : a };
}

function contrastRatio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/* --------------------------- browser helpers --------------------------- */

const UNSTABLE_ARGS = [
  // --single-process: renderer OOM kills the whole browser on small machines.
  // --no-zygote: companion to --single-process.
  // GPU/swiftshader set: intermittently SIGSEGVs at startup in this
  // environment (measured 2/10 failures; 0/10 without them).
  "--single-process",
  "--no-zygote",
  "--in-process-gpu",
  "--use-gl=angle",
  "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist",
];

const browserLaunch = async (attempt = 1) => {
  try {
    return await chromium.launch({
      executablePath: await chromiumModule.executablePath(),
      args: [
        ...(chromiumModule.args || []).filter((a) => !UNSTABLE_ARGS.includes(a)),
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  } catch (error) {
    if (attempt >= 3) throw error;
    return browserLaunch(attempt + 1); // intermittent startup crashes — retry
  }
};

const collectConsole = (page) => {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("requestfailed", (req) => {
    const url = req.url();
    if (!url.startsWith(base) && !url.startsWith("data:")) return;
    if (req.resourceType() === "media") return; // range-request 416s are fine
    errors.push(`requestfailed: ${req.resourceType()} ${url} (${req.failure()?.errorText})`);
  });
  return errors;
};

const makeContext = (browser, { width = 1440, height = 900, colorScheme = "light", reducedMotion = null, storage }) =>
  browser.newContext({
    viewport: { width, height },
    colorScheme,
    ...(reducedMotion ? { reducedMotion } : {}),
  }).then((context) => {
    if (!storage) return context;
    return context
      .addInitScript(([key, value]) => {
        try {
          window.localStorage.setItem(key, value);
        } catch {}
      }, ["nnamdi-portfolio:theme", storage])
      .then(() => context);
  });

const withBrowser = async (label, fn, attempt = 1) => {
  const browser = await browserLaunch();
  try {
    await fn(browser);
  } catch (error) {
    await browser.close().catch(() => {});
    if (attempt >= 2) throw error;
    console.log(
      `  (browser crashed in "${label}"; retrying section — ${String(error.message).split("\n")[0]})`,
    );
    await withBrowser(label, fn, attempt + 1);
  }
};

/* ====================================================================== */

(async () => {
  /* =====================================================================
     1. Route smoke tests — both themes, desktop + mobile widths
     ===================================================================== */

  for (const scheme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
      await withBrowser(`smoke ${scheme} ${width}`, async (browser) => {
        const context = await makeContext(browser, { width, colorScheme: scheme });
        for (const route of routes) {
          const page = await context.newPage();
          const errors = collectConsole(page);
          await page.goto(base + route, { waitUntil: "load" });
          await page.waitForTimeout(350);

          const themeOk = await page.evaluate((expected) => {
            return document.documentElement.classList.contains("dark") === (expected === "dark");
          }, scheme);
          checks(`[${scheme} ${width}] ${route} theme class applied`, themeOk);

          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          );
          checks(`[${scheme} ${width}] ${route} no horizontal overflow`, overflow <= 1, `delta=${overflow}px`);

          const consoleClean =
            errors.filter((e) => !/favicon/i.test(e) && !/Failed to load resource/i.test(e)).length === 0;
          checks(`[${scheme} ${width}] ${route} no console errors`, consoleClean, errors.slice(0, 3).join(" | "));

          const media = await page.evaluate(() => {
            const imgs = [...document.querySelectorAll("img")];
            const broken = imgs
              .filter((img) => img.complete && img.naturalWidth === 0 && !img.src.includes("icon"))
              .map((img) => img.src);
            const filtered = [...document.querySelectorAll("video, img")]
              .map((el) => getComputedStyle(el).filter)
              .filter((f) => f && f !== "none");
            return { broken, filtered };
          });
          checks(`[${scheme} ${width}] ${route} no broken images`, media.broken.length === 0, media.broken.join(", "));
          checks(`[${scheme} ${width}] ${route} no media filters`, media.filtered.length === 0, media.filtered.join(", "));
          await page.close();
        }
        await context.close();
      });
    }
  }

  /* =====================================================================
     2. Theme bootstrap — no flash, system preference, persistence
     ===================================================================== */

  {
    // The init script must appear in the raw HTML before any visible content.
    const html = await (await fetch(base + "/")).text();
    const scriptIdx = html.indexOf("nnamdi-portfolio:theme");
    const bodyIdx = html.indexOf("<main");
    checks("init script present in SSR HTML", scriptIdx > 0, `at char ${scriptIdx}`);
    checks("init script precedes first content", scriptIdx > -1 && scriptIdx < bodyIdx, `script@${scriptIdx} < main@${bodyIdx}`);
  }

  await withBrowser("bootstrap", async (browser) => {
    for (const scheme of ["light", "dark"]) {
      const context = await makeContext(browser, { colorScheme: scheme });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: "domcontentloaded" });
      const [darkClass, stored] = await page.evaluate(() => [
        document.documentElement.classList.contains("dark"),
        localStorage.getItem("nnamdi-portfolio:theme"),
      ]);
      checks(`first visit respects system (${scheme})`, darkClass === (scheme === "dark"));
      checks(`first visit stores nothing`, stored === null, `stored=${stored}`);
      await context.close();
    }
  });

  await withBrowser("persistence", async (browser) => {
    // Explicit choice persists across reloads, navigation, and beats the system.
    const context = await makeContext(browser, { colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    await page.click('button[aria-label="Switch to light mode"]');
    await page.waitForTimeout(350);
    const [afterToggle, storedAfter] = await page.evaluate(() => [
      document.documentElement.classList.contains("dark"),
      localStorage.getItem("nnamdi-portfolio:theme"),
    ]);
    checks("toggle persists explicit choice", !afterToggle && storedAfter === "light", `dark=${afterToggle} stored=${storedAfter}`);

    await page.reload({ waitUntil: "load" });
    const afterReload = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    checks("stored light survives reload (system dark)", !afterReload);

    for (const route of ["/work", "/about", "/contact"]) {
      await page.click(`a[href="${route}"]`);
      await page.waitForTimeout(250);
      const kept = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
      checks(`theme consistent while navigating (${route})`, kept);
    }
    await context.close();

    // Stored dark beats system light.
    const context2 = await makeContext(browser, { colorScheme: "light", storage: "dark" });
    const page2 = await context2.newPage();
    await page2.goto(base + "/", { waitUntil: "load" });
    const dark = await page2.evaluate(() => document.documentElement.classList.contains("dark"));
    checks("stored dark beats system light", dark);
    await context2.close();
  });

  /* =====================================================================
     3. Theme toggle — accessibility, keyboard, reduced motion
     ===================================================================== */

  await withBrowser("toggle", async (browser) => {
    const context = await makeContext(browser, { colorScheme: "light" });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });

    const toggle = page.locator('button[aria-label="Switch to dark mode"]');
    checks("toggle visible (desktop light)", await toggle.isVisible());
    checks("toggle has title tooltip", (await toggle.getAttribute("title")) === "Dark mode");

    // Keyboard: walk the tab order until the toggle is focused.
    let focused = null;
    for (let i = 0; i < 15; i += 1) {
      await page.keyboard.press("Tab");
      focused = await page.evaluate(() => document.activeElement.getAttribute("aria-label"));
      if (focused === "Switch to dark mode") break;
    }
    checks("toggle reachable by keyboard", focused === "Switch to dark mode", `focused=${focused}`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(350);
    checks("keyboard Enter toggles theme", await page.evaluate(() => document.documentElement.classList.contains("dark")));
    checks(
      "toggle label updates in dark",
      await page.locator('button[aria-label="Switch to light mode"]').isVisible(),
    );
    await context.close();
  });

  await withBrowser("reduced motion", async (browser) => {
    const context = await makeContext(browser, { colorScheme: "light", reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    const sawSwitchingClass = await page.evaluate(() => {
      return new Promise((resolve) => {
        let seen = false;
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.target.classList && m.target.classList.contains("theme-switching")) seen = true;
          }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        document.querySelector('button[aria-label="Switch to dark mode"]')?.click();
        setTimeout(() => {
          observer.disconnect();
          resolve(seen || document.documentElement.classList.contains("theme-switching"));
        }, 500);
      });
    });
    const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    checks("reduced motion: theme still switches", dark);
    checks("reduced motion: no transition class", !sawSwitchingClass);
    await context.close();
  });

  /* =====================================================================
     4. Mobile navigation (Build 03 fix) — both themes
     ===================================================================== */

  for (const scheme of ["light", "dark"]) {
    await withBrowser(`mobile nav ${scheme}`, async (browser) => {
      const context = await makeContext(browser, { width: 390, height: 844, colorScheme: scheme });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: "load" });

      const menuButton = page.locator("button[aria-controls]");
      checks(`[${scheme} mobile] menu button visible`, await menuButton.isVisible());
      checks(
        `[${scheme} mobile] theme toggle visible`,
        await page.locator('button[aria-label^="Switch to"]').isVisible(),
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      checks(`[${scheme} mobile] no overflow with toggle`, overflow <= 1, `delta=${overflow}px`);

      await menuButton.click();
      await page.waitForTimeout(350);
      const openState = await page.evaluate(() => {
        const btn = document.querySelector("button[aria-controls]");
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        const links = [...panel.querySelectorAll("a")];
        return {
          expanded: btn.getAttribute("aria-expanded"),
          hidden: panel.hidden,
          linkCount: links.length,
          allVisible: links.every((a) => a.offsetParent !== null),
          hasCta: links.some((a) => a.textContent.trim() === "Start a Project"),
        };
      });
      checks(`[${scheme} mobile] menu opens`, openState.expanded === "true" && !openState.hidden);
      // 5 nav links + the panel's CTA link.
      checks(
        `[${scheme} mobile] menu links rendered`,
        openState.linkCount === 6 && openState.hasCta,
        `count=${openState.linkCount}`,
      );
      checks(`[${scheme} mobile] menu links visible`, openState.allVisible);
      checks(
        `[${scheme} mobile] body scroll locked while open`,
        await page.evaluate(() => document.body.style.overflow === "hidden"),
      );

      await page.keyboard.press("Escape");
      await page.waitForTimeout(350);
      const closed = await page.evaluate(
        () => document.querySelector("button[aria-controls]").getAttribute("aria-expanded") === "false",
      );
      checks(`[${scheme} mobile] Escape closes menu`, closed);
      await context.close();
    });
  }

  /* =====================================================================
     5. /work media system (Build 04) — both themes
     ===================================================================== */

  for (const scheme of ["light", "dark"]) {
    await withBrowser(`work ${scheme}`, async (browser) => {
      const context = await makeContext(browser, { colorScheme: scheme });
      const page = await context.newPage();
      const errors = collectConsole(page);
      await page.goto(base + "/work", { waitUntil: "load" });
      await page.waitForTimeout(450);

      for (const title of projectTitles) {
        checks(
          `[${scheme} /work] project visible: ${title}`,
          await page.locator(`h3:has-text("${title}")`).first().isVisible(),
        );
      }

      // Wait until every poster is actually decoded (not merely in the DOM).
      await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll("img[src*='showcase-poster']")];
        await Promise.all(
          imgs.map(
            (img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((resolve) => {
                    img.addEventListener("load", resolve, { once: true });
                    img.addEventListener("error", resolve, { once: true });
                  }),
          ),
        );
      });
      const posterState = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll("img[src*='showcase-poster']")];
        return { count: imgs.length, decoded: imgs.filter((i) => i.naturalWidth > 0).length };
      });
      checks(
        `[${scheme} /work] all 5 posters decoded`,
        posterState.count === 5 && posterState.decoded === 5,
        `count=${posterState.count} decoded=${posterState.decoded}`,
      );

      const playButton = page.locator('button[aria-label^="Play video"]').first();
      checks(`[${scheme} /work] play control present`, await playButton.isVisible());
      await playButton.click();
      await page.waitForTimeout(500);
      const videoState = await page.evaluate(() => {
        const video = document.querySelector("video[controls]");
        return video ? Boolean(video.hasAttribute("controls")) : false;
      });
      checks(`[${scheme} /work] click-to-play mounts native video`, videoState);
      checks(
        `[${scheme} /work] no console errors on /work`,
        errors.filter((e) => !/Failed to load resource/i.test(e)).length === 0,
        errors.slice(0, 2).join(" | "),
      );
      await context.close();
    });
  }

  /* =====================================================================
     6. Homepage hero media + WhatsApp CTA (dark)
     ===================================================================== */

  await withBrowser("home dark", async (browser) => {
    const context = await makeContext(browser, { colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    await page.waitForTimeout(1000);

    const heroMedia = await page.evaluate(() => ({
      videoCount: document.querySelectorAll("video").length,
      posterLoaded: [...document.querySelectorAll("img")].some((i) => i.src.includes("showcase-poster")),
    }));
    checks(
      "[dark home] hero media present",
      heroMedia.videoCount >= 1 && heroMedia.posterLoaded,
      JSON.stringify(heroMedia),
    );
    const whatsappHref = await page.locator('a[href^="https://wa.me/2348102505135"]').count();
    checks("[dark home] WhatsApp CTA href intact", whatsappHref >= 1);
    await context.close();
  });

  /* =====================================================================
     7. Contrast audit — key text/surface pairs, both themes
     ===================================================================== */

  for (const scheme of ["light", "dark"]) {
    await withBrowser(`contrast ${scheme}`, async (browser) => {
      const context = await makeContext(browser, { colorScheme: scheme });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: "load" });
      await page.waitForTimeout(250);

      const pairs = await page.evaluate(() => {
        const parseColor = (str) => {
          const m = str.match(/rgba?\(([^)]+)\)/);
          if (!m) return null;
          const [r, g, b, a] = m[1].split(",").map((v) => parseFloat(v));
          return { r, g, b, a: a === undefined ? 1 : a };
        };
        const lin = (c) => {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        };
        const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
        const ratio = (a, b) => {
          const [hi, lo] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
          return (hi + 0.05) / (lo + 0.05);
        };
        const colorOf = (sel) => parseColor(getComputedStyle(document.querySelector(sel)).color);
        const bgOf = (sel) => {
          let el = document.querySelector(sel);
          while (el && el !== document.documentElement) {
            const c = parseColor(getComputedStyle(el).backgroundColor);
            if (c && c.a > 0) return c;
            el = el.parentElement;
          }
          return parseColor(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
        };
        return {
          bodyOnBg: ratio(colorOf("h1"), bgOf("body")),
          mutedOnBg: ratio(colorOf(".text-foreground-muted"), bgOf("body")),
          navOnHeader: ratio(colorOf('nav[aria-label="Main"] a'), bgOf("header")),
          footerOnBg: ratio(colorOf("footer p"), bgOf("footer")),
        };
      });
      checks(`[${scheme}] body text contrast >= 4.5`, pairs.bodyOnBg >= 4.5, `${pairs.bodyOnBg.toFixed(2)}:1`);
      checks(`[${scheme}] muted text contrast >= 4.5`, pairs.mutedOnBg >= 4.5, `${pairs.mutedOnBg.toFixed(2)}:1`);
      checks(`[${scheme}] nav text contrast >= 4.5`, pairs.navOnHeader >= 4.5, `${pairs.navOnHeader.toFixed(2)}:1`);
      checks(`[${scheme}] footer text contrast >= 4.5`, pairs.footerOnBg >= 4.5, `${pairs.footerOnBg.toFixed(2)}:1`);
      await context.close();
    });
  }

  /* =====================================================================
     8. SEO stability — theme must not alter head content
     ===================================================================== */

  await withBrowser("seo", async (browser) => {
    for (const scheme of ["light", "dark"]) {
      const context = await makeContext(browser, { colorScheme: scheme });
      const page = await context.newPage();
      await page.goto(base + "/work", { waitUntil: "load" });
      const head = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || "",
        ogType: document.querySelector('meta[property="og:type"]')?.content,
      }));
      checks(`[${scheme}] SEO: title`, head.title === "Work — Arum Jonathan Nnamdi", head.title);
      checks(`[${scheme}] SEO: description`, head.description.startsWith("Projects by Arum Jonathan Nnamdi"));
      checks(`[${scheme}] SEO: og intact`, head.ogType === "website");
      await context.close();
    }
  });

  /* =====================================================================
     9. Screenshots — visual comparison set
     ===================================================================== */

  {
    const shots = [
      { name: "home-light-1440", route: "/", scheme: "light", width: 1440, full: true },
      { name: "home-dark-1440", route: "/", scheme: "dark", width: 1440, full: true },
      { name: "solutions-dark-1440", route: "/solutions", scheme: "dark", width: 1440, full: true },
      { name: "work-light-1440", route: "/work", scheme: "light", width: 1440, full: true },
      { name: "work-dark-1440", route: "/work", scheme: "dark", width: 1440, full: true },
      { name: "about-dark-1440", route: "/about", scheme: "dark", width: 1440, full: true },
      { name: "contact-dark-1440", route: "/contact", scheme: "dark", width: 1440, full: true },
      { name: "home-light-390", route: "/", scheme: "light", width: 390, full: false },
      { name: "home-dark-390", route: "/", scheme: "dark", width: 390, full: false },
      { name: "work-dark-390", route: "/work", scheme: "dark", width: 390, full: false },
      { name: "mobile-menu-dark-390", route: "/", scheme: "dark", width: 390, full: false, openMenu: true },
    ];
    for (const shot of shots) {
      await withBrowser(`shot ${shot.name}`, async (browser) => {
        // Reduced motion freezes the scroll-driven .reveal animations at
        // full opacity, so full-page captures show every section (the
        // timeline never advances in a stitched capture).
        const context = await makeContext(browser, {
          width: shot.width,
          height: 844,
          colorScheme: shot.scheme,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        await page.goto(base + shot.route, { waitUntil: "load" });
        await page.waitForTimeout(350);
        if (shot.openMenu) {
          await page.click("button[aria-controls]");
          await page.waitForTimeout(400);
        } else {
          // Walk the page so lazy media loads, then settle at the top.
          await page.evaluate(async () => {
            const step = () => window.innerHeight;
            for (let y = 0; y < document.body.scrollHeight; y += step()) {
              window.scrollTo(0, y);
              await new Promise((resolve) => setTimeout(resolve, 60));
            }
            window.scrollTo(0, 0);
          });
          await page.evaluate(
            () =>
              Promise.all(
                [...document.querySelectorAll("img")]
                  .filter((img) => !img.complete)
                  .map(
                    (img) =>
                      new Promise((resolve) => {
                        img.addEventListener("load", resolve, { once: true });
                        img.addEventListener("error", resolve, { once: true });
                      }),
                  ),
              ),
          );
          await page.waitForTimeout(400);
        }
        const file = path.join(artifacts, `${shot.name}.png`);
        await page.screenshot({ path: file, fullPage: shot.full });
        checks(`screenshot: ${shot.name}`, fs.existsSync(file), path.basename(file));
        await context.close();
      });
    }
  }

  console.log(`\nArtifacts: ${artifacts}`);
  console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`);
  fs.writeFileSync(path.join(artifacts, "results.json"), JSON.stringify(log, null, 2));
  process.exit(failures === 0 ? 0 : 1);
})().catch((err) => {
  console.error("SUITE ERROR:", err.message || err);
  process.exit(1);
});
