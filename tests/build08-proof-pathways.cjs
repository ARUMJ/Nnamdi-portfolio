// Build 08 — Proof & Pathways validation suite.
//
// Standalone browser checks. Playwright lives in a separate tooling
// directory; no capture/test dependencies are added to the production app.
//
//   cd /home/user/tooling
//   BASE_URL=http://localhost:3000 NODE_PATH=/home/user/tooling/node_modules \
//   LD_LIBRARY_PATH=/home/user/tooling/dist/Release/lib \
//   node /home/user/Nnamdi-portfolio/tests/build08-proof-pathways.cjs
//
// Optional: BASE_URL, CHROMIUM_EXECUTABLE_PATH, BUILD08_TEST_ARTIFACTS.
//
// What this suite locks down:
//   1. The five routes render cleanly (no console errors, no overflow).
//   2. Homepage states the two service pathways and the conversion CTAs.
//   3. /solutions presents pathway 01 and 02 with the areas inside them.
//   4. /work has the h1 → h2 → h3 outline, honest statuses and proof.
//   5. The five approved live URLs are intact, visible and accessible.
//   6. Media → live link → caption order is preserved (PR #10 behaviour).
//   7. Contact serves both audiences and never prints the phone number.
//   8. Structured data is valid JSON-LD with no fabricated claims.
//   9. Reveals fail open: content stays visible with JS blocked, JS
//      disabled, and after the controller failsafe fires.
const chromiumPkg = require("@sparticuz/chromium");
const chromiumModule = chromiumPkg.default || chromiumPkg;
const { chromium } = require("playwright");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const base = process.env.BASE_URL || "http://localhost:3000";
const artifacts =
  process.env.BUILD08_TEST_ARTIFACTS ||
  fs.mkdtempSync(path.join(os.tmpdir(), "build08-"));
fs.mkdirSync(artifacts, { recursive: true });

const routes = ["/", "/solutions", "/work", "/about", "/contact"];

const liveUrls = [
  "https://stayora-595x3b9r7-gospelboys.vercel.app",
  "https://purenest-cleaning-website-sooty.vercel.app",
  "https://d-connect-delivery-services.vercel.app",
  "https://prince-m-furnishing-concept-weld.vercel.app",
  "https://pnk-enterprises-website-6yfgbwop6-gospelboys.vercel.app",
];

const allowedStatuses = ["Concept", "Prototype", "Deployed Demo", "Production Website"];

const log = [];
let failures = 0;

const checks = (name, ok, info) => {
  log.push({ name, ok, info });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${info ? `  (${info})` : ""}`);
  if (!ok) failures += 1;
};

const UNSTABLE_ARGS = [
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
    return browserLaunch(attempt + 1);
  }
};

const collectConsole = (page) => {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
};

const withBrowser = async (label, fn, attempt = 1) => {
  const browser = await browserLaunch();
  try {
    await fn(browser);
  } catch (error) {
    await browser.close().catch(() => {});
    if (attempt >= 2) throw error;
    console.log(`  (browser crashed in "${label}"; retrying — ${String(error.message).split("\n")[0]})`);
    await withBrowser(label, fn, attempt + 1);
  }
};

(async () => {
  /* =====================================================================
     1. Route smoke tests — desktop + mobile
     ===================================================================== */

  await withBrowser("routes", async (browser) => {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      for (const route of routes) {
        const page = await context.newPage();
        const errors = collectConsole(page);
        const response = await page.goto(base + route, { waitUntil: "load" });
        await page.waitForTimeout(400);

        checks(`[${width}] ${route} status 200`, response.status() === 200, `status=${response.status()}`);

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        checks(`[${width}] ${route} no horizontal overflow`, overflow <= 1, `delta=${overflow}px`);

        const consoleClean =
          errors.filter((e) => !/favicon/i.test(e) && !/Failed to load resource/i.test(e)).length === 0;
        checks(`[${width}] ${route} no console errors`, consoleClean, errors.slice(0, 2).join(" | "));

        await page.close();
      }
      await context.close();
    }
  });

  /* =====================================================================
     2. Homepage — pathways, proof and conversion CTAs
     ===================================================================== */

  await withBrowser("homepage", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    await page.waitForTimeout(400);

    for (const title of ["Web & Digital Development", "Digital Assistance & Technical Support"]) {
      checks(
        `home pathway card: ${title}`,
        await page.getByRole("heading", { name: title, exact: true }).first().isVisible(),
      );
    }

    checks(
      "home primary CTA (Start a Project)",
      await page.getByRole("link", { name: "Start a Project" }).first().isVisible(),
    );
    checks(
      "home View My Work CTA",
      await page.getByRole("link", { name: "View My Work" }).first().isVisible(),
    );
    checks(
      "home WhatsApp CTA",
      await page.locator('a[href^="https://wa.me/"]').first().isVisible(),
    );

    // Pathway 02 carries the inverse (cinematic) treatment — visually distinct.
    const tones = await page.evaluate(() => {
      const sections = [...document.querySelectorAll("main section[aria-labelledby$='-pathway-card']")];
      return sections.map((s) => ({
        id: s.id,
        inverse: getComputedStyle(s).backgroundColor,
      }));
    });
    checks("home pathway cards are two", tones.length === 2, `count=${tones.length}`);
    checks(
      "home pathway cards visually distinct",
      tones.length === 2 && tones[0].inverse !== tones[1].inverse,
      tones.map((t) => t.inverse).join(" vs "),
    );

    await context.close();
  });

  /* =====================================================================
     3. /solutions — two pathways with their areas
     ===================================================================== */

  await withBrowser("solutions", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/solutions", { waitUntil: "load" });
    await page.waitForTimeout(400);

    const outline = await page.evaluate(() => ({
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      h2: [...document.querySelectorAll("h2")].map((h) => h.textContent.trim()),
    }));
    checks("solutions has exactly one h1", outline.h1.length === 1, outline.h1.join(" | "));
    for (const title of ["Web & Digital Development", "Digital Assistance & Technical Support"]) {
      checks(`solutions pathway h2: ${title}`, outline.h2.includes(title));
    }

    const areas = await page.evaluate(() =>
      [...document.querySelectorAll("li[id]")]
        .map((li) => li.id)
        .filter((id) => ["business-websites", "web-products", "website-improvement", "digital-support", "education-tech"].includes(id)),
    );
    checks("solutions keeps all five area anchors", areas.length === 5, areas.join(", "));

    const rowsAreH3 = await page.evaluate(() =>
      document.querySelectorAll("li[id='business-websites'] h3, li[id='digital-support'] h3").length,
    );
    checks("solutions area rows are h3 under the pathway h2", rowsAreH3 >= 2, `found=${rowsAreH3}`);

    // Anchors from the homepage index must still resolve.
    await page.goto(base + "/solutions#website-improvement", { waitUntil: "load" });
    checks(
      "deep link to a solution anchor resolves",
      await page.locator("li#website-improvement").first().isVisible(),
    );

    await context.close();
  });

  /* =====================================================================
     4. /work — heading outline, statuses, proof, case study
     ===================================================================== */

  await withBrowser("work", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/work", { waitUntil: "load" });
    await page.waitForTimeout(500);

    const headings = await page.evaluate(() =>
      [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((h) => ({
        level: Number(h.tagName.slice(1)),
        text: h.textContent.trim().slice(0, 60),
      })),
    );
    const h1Count = headings.filter((h) => h.level === 1).length;
    checks("work has exactly one h1", h1Count === 1, `count=${h1Count}`);
    checks(
      "work project titles are h2",
      headings.filter((h) => h.level === 2).length >= 5,
      `h2s=${headings.filter((h) => h.level === 2).length}`,
    );

    let skips = 0;
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i].level - headings[i - 1].level > 1) skips += 1;
    }
    checks("work heading outline has no skipped levels", skips === 0, `skips=${skips}`);

    const statuses = await page.evaluate(() => {
      const badges = [...document.querySelectorAll("main span")].filter((s) =>
        ["Concept", "Prototype", "Deployed Demo", "Production Website"].includes(s.textContent.trim()),
      );
      return [...new Set(badges.map((b) => b.textContent.trim()))];
    });
    checks(
      "work shows only honest status labels",
      statuses.length > 0 && statuses.every((s) => allowedStatuses.includes(s)),
      statuses.join(", "),
    );
    checks("work labels at least one Concept and one Prototype", statuses.includes("Concept") && statuses.includes("Prototype"), statuses.join(", "));

    const proofLabels = await page.evaluate(() =>
      [...document.querySelectorAll("main dt")].map((dt) => dt.textContent.trim()),
    );
    for (const label of ["Purpose", "Contribution", "Delivered"]) {
      checks(`work proof label: ${label}`, proofLabels.filter((l) => l === label).length >= 5, `count=${proofLabels.filter((l) => l === label).length}`);
    }
    checks("work scope notes present", proofLabels.includes("What it is not"));

    // All five approved live URLs, correct attributes.
    const linkState = await page.evaluate((urls) =>
      urls.map((url) => {
        const a = document.querySelector(`a[href="${url}"]`);
        if (!a) return { url, found: false };
        return {
          url,
          found: true,
          target: a.getAttribute("target"),
          rel: a.getAttribute("rel"),
          name: (a.getAttribute("aria-label") || a.textContent || "").trim(),
          visible: Boolean(a.offsetWidth || a.offsetHeight),
          text: a.textContent.trim(),
        };
      }),
    liveUrls);
    for (const state of linkState) {
      checks(
        `work live link intact: ${state.url.replace("https://", "").split(".")[0]}`,
        state.found &&
          state.target === "_blank" &&
          /noopener/.test(state.rel || "") &&
          /noreferrer/.test(state.rel || "") &&
          state.visible &&
          state.name.length > 0,
        `${state.found ? "" : "missing"} target=${state.target} rel=${state.rel} text="${state.text}"`,
      );
    }

    // Media → live link → caption order (PR #10 behaviour).
    const order = await page.evaluate(() => {
      const figure = document.querySelector("main figure");
      if (!figure) return null;
      const kids = [...figure.children].map((el) => el.tagName.toLowerCase());
      const linkIndex = [...figure.querySelectorAll("a[href]")].length
        ? [...figure.children].findIndex((el) => el.matches("a[href]") || el.querySelector("a[href]"))
        : -1;
      const captionIndex = [...figure.children].findIndex((el) => el.tagName.toLowerCase() === "figcaption");
      return { kids, linkIndex, captionIndex };
    });
    checks(
      "project media → live link → caption order",
      Boolean(order) && order.linkIndex > -1 && order.captionIndex > -1 && order.linkIndex < order.captionIndex,
      order ? JSON.stringify(order) : "no figure",
    );

    checks(
      "work case study present",
      await page.getByRole("heading", { name: /D Connect Delivery Services/ }).first().isVisible(),
    );
    checks(
      "case study demonstrates list",
      await page.locator("h3:has-text('What this demonstrates')").first().isVisible(),
    );
    checks(
      "case study scope honesty",
      await page.locator("h3:has-text('What it is not')").first().isVisible(),
    );
    const caseStudyText = await page.locator("section[aria-labelledby='d-connect-delivery-services-case-study']").innerText();
    checks(
      "case study makes no payment/checkout claims",
      !/payment (is )?(processed|supported)|accept(s)? payments|checkout (is|works)/i.test(caseStudyText),
    );
    checks(
      "case study states the prototype limits",
      /no payment processing/i.test(caseStudyText) || /no real-time delivery tracking/i.test(caseStudyText),
    );

    await context.close();
  });

  /* =====================================================================
     5. Contact — two audiences, no exposed phone number
     ===================================================================== */

  await withBrowser("contact", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/contact", { waitUntil: "load" });
    await page.waitForTimeout(400);

    for (const heading of ["Two ways to start", "Project enquiries", "Professional opportunities"]) {
      checks(
        `contact audience: ${heading}`,
        await page.getByRole("heading", { name: heading, exact: true }).first().isVisible(),
      );
    }
    checks("contact WhatsApp CTA", await page.locator('a[href^="https://wa.me/"]').first().isVisible());

    // The approved wa.me destination may appear in href (it is the published
    // channel); the number itself must not be displayed or announced.
    const numberLeak = await page.evaluate(() => {
      const needles = ["08102505135", "0810 250 5135", "+2348102505135", "2348102505135", "0810 250 5135"];
      const text = document.body.innerText;
      const attributeLeak = [...document.querySelectorAll("*")]
        .flatMap((el) => ["aria-label", "title", "alt", "placeholder"].map((attr) => el.getAttribute(attr) || ""))
        .filter((value) => needles.some((needle) => value.includes(needle)));
      return {
        inText: needles.filter((n) => text.includes(n)),
        inAttributes: attributeLeak,
        telLinks: [...document.querySelectorAll('a[href^="tel:"]')].length,
      };
    });
    checks(
      "contact never displays the phone number",
      numberLeak.inText.length === 0 && numberLeak.inAttributes.length === 0 && numberLeak.telLinks === 0,
      `text=${numberLeak.inText.join(",")} attrs=${numberLeak.inAttributes.length} tel=${numberLeak.telLinks}`,
    );

    await context.close();
  });

  /* =====================================================================
     6. Structured data — valid JSON-LD, nothing fabricated
     ===================================================================== */

  await withBrowser("structured data", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });

    const raw = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script ? script.textContent : null;
    });
    checks("JSON-LD script present", Boolean(raw));

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      checks("JSON-LD parses", false, String(error.message));
    }
    if (parsed) {
      checks("JSON-LD parses", true);
      const graph = parsed["@graph"] || [];
      const types = graph.map((node) => node["@type"]);
      checks("JSON-LD has a Person", types.includes("Person"));
      checks("JSON-LD has a ProfessionalService", types.includes("ProfessionalService"));
      const flatten = JSON.stringify(parsed);
      const forbidden = ["aggregateRating", "review", "award", "priceRange", "telephone", "address", "foundingDate"];
      const found = forbidden.filter((key) => flatten.includes(`"${key}"`));
      checks("JSON-LD fabricates nothing", found.length === 0, found.join(", "));
      const service = graph.find((node) => node["@type"] === "ProfessionalService");
      const offers = service?.hasOfferCatalog?.itemListElement?.length || 0;
      checks("JSON-LD offer catalogue covers both pathways", offers === 2, `offers=${offers}`);
    }

    await context.close();
  });

  /* =====================================================================
     7. Fail-open reveals — content is never trapped hidden
     ===================================================================== */

  await withBrowser("fail-open", async (browser) => {
    // (a) Normal load: the controller reports in and reveals are armed.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: "load" });
      await page.waitForTimeout(600);
      const state = await page.evaluate(() => ({
        controller: document.documentElement.getAttribute("data-reveal-controller"),
        hidden: [...document.querySelectorAll(".reveal")].filter(
          (el) => el.getBoundingClientRect().top < window.innerHeight && Number(getComputedStyle(el).opacity) < 0.9,
        ).length,
      }));
      checks("reveal controller arms on normal load", state.controller === "ready", `controller=${state.controller}`);
      checks("above-the-fold content is visible after load", state.hidden === 0, `hidden=${state.hidden}`);
      await context.close();
    }

    // (b) JS chunks blocked: the inline bootstrap runs, the controller never
    //     does, the failsafe must reveal everything.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.route("**/_next/static/chunks/**", (route) => route.abort());
      await page.goto(base + "/", { waitUntil: "load" }).catch(() => {});
      await page.waitForTimeout(3600);
      const state = await page.evaluate(() => ({
        failsafe: document.documentElement.classList.contains("reveal-failsafe"),
        opacities: [...document.querySelectorAll(".reveal")].map((el) => Number(getComputedStyle(el).opacity)),
      }));
      const invisible = state.opacities.filter((o) => o < 0.9).length;
      checks("failsafe fires when the controller never loads", state.failsafe, `failsafe=${state.failsafe}`);
      checks(
        "content visible with JS chunks blocked",
        state.opacities.length > 0 && invisible === 0,
        `invisible=${invisible}/${state.opacities.length}`,
      );
      await context.close();
    }

    // (c) JavaScript disabled entirely.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: "load" });
      const state = await page.evaluate(() => ({
        opacities: [...document.querySelectorAll(".reveal")].map((el) => Number(getComputedStyle(el).opacity)),
        bodyText: document.body.innerText.length,
      })).catch(() => null);
      checks(
        "content visible without JavaScript",
        state ? state.opacities.every((o) => o >= 0.9) && state.bodyText > 500 : false,
        state ? `invisible=${state.opacities.filter((o) => o < 0.9).length}` : "evaluate failed",
      );
      await context.close();
    }

    // (d) Reduced motion keeps everything visible on /work.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(base + "/work", { waitUntil: "load" });
      await page.waitForTimeout(300);
      const invisible = await page.evaluate(
        () => [...document.querySelectorAll(".reveal")].filter((el) => Number(getComputedStyle(el).opacity) < 0.9).length,
      );
      checks("reduced motion keeps content visible", invisible === 0, `hidden=${invisible}`);
      await context.close();
    }
  });

  /* =====================================================================
     8. Theme toggle still works with the Build 08 changes
     ===================================================================== */

  await withBrowser("theme", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await context.newPage();
    await page.goto(base + "/work", { waitUntil: "load" });
    await page.waitForTimeout(400);
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.waitForTimeout(400);
    checks("theme toggles on /work", await page.evaluate(() => document.documentElement.classList.contains("dark")));
    await context.close();
  });

  /* =====================================================================
     9. One film plays end-to-end (facade → real playback)
     ===================================================================== */

  await withBrowser("film", async (browser) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/work", { waitUntil: "load" });
    await page.waitForTimeout(400);
    const button = page.getByRole("button", { name: /^Play video: D Connect website/ }).first();
    await button.scrollIntoViewIfNeeded();
    await button.focus();
    await page.keyboard.press("Enter");
    const state = await page
      .locator("video")
      .first()
      .evaluate(
        (video) =>
          new Promise((resolve) => {
            const done = () =>
              resolve({ ok: true, time: video.currentTime, duration: video.duration, width: video.videoWidth });
            video.addEventListener("playing", () => setTimeout(done, 900), { once: true });
            setTimeout(
              () => resolve({ ok: false, readyState: video.readyState, error: video.error && video.error.message }),
              12000,
            );
          }),
      );
    checks(
      "a project film decodes and plays",
      state.ok && state.width > 0 && state.duration > 0,
      JSON.stringify(state),
    );
    await context.close();
  });

  /* ===================================================================== */

  console.log(`\nArtifacts: ${artifacts}`);
  console.log(failures === 0 ? `\nALL ${log.length} CHECKS PASSED` : `\n${failures} CHECK(S) FAILED of ${log.length}`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((error) => {
  console.error("SUITE ERROR:", error);
  process.exit(1);
});
