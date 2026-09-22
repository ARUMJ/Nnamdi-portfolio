// Standalone browser checks. Install Playwright in a separate tooling directory;
// no capture/test dependencies are added to the production app.
// NODE_PATH=/path/to/tooling/node_modules node tests/build04-media.cjs
// Optional: BASE_URL, CHROMIUM_EXECUTABLE_PATH, MEDIA_TEST_ARTIFACTS.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const base = process.env.BASE_URL || "http://localhost:3000";
const films = [
  {
    slug: "prince-m-furnishing-concept",
    title: "Prince M Furnishing Concept",
    prefix: "Prince M website",
  },
  {
    slug: "d-connect-delivery-services",
    title: "D-Connect Delivery Services",
    prefix: "D-Connect website",
  },
  {
    slug: "purenest-cleaning-co",
    title: "PureNest Cleaning Co.",
    prefix: "PureNest fictional",
  },
  { slug: "stayora", title: "Stayora", prefix: "Stayora frontend demo" },
  {
    slug: "pnk-clarean-peekan",
    title: "PNK / Clarean Peekan",
    prefix: "PNK / Clarean development preview",
  },
];
const artifacts =
  process.env.MEDIA_TEST_ARTIFACTS ||
  fs.mkdtempSync(path.join(os.tmpdir(), "build04-"));
fs.mkdirSync(artifacts, { recursive: true });
const launch = () =>
  chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
      : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
(async () => {
  const b = await launch();
  const log = [];
  const checks = (name, info) => {
    log.push({ name, ...info });
    console.log(name, info);
  };
  // Route smoke tests, error monitoring, layout and media policy.
  for (const width of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width, height: 900 } });
    for (const route of ["/", "/solutions", "/work", "/about", "/contact"]) {
      const page = await ctx.newPage();
      const errors = [],
        bad = [],
        videos = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("response", (r) => {
        if (r.status() >= 400) bad.push(r.url());
      });
      page.on("request", (r) => {
        if (r.url().endsWith(".mp4")) videos.push(r.url());
      });
      const response = await page.goto(base + route);
      await page.waitForTimeout(1000);
      assert.equal(response.status(), 200);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.deepEqual(errors, []);
      assert.deepEqual(bad, []);
      if (route !== "/") assert.equal(videos.length, 0);
      if (width === 390) {
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .click();
        await page.keyboard.press("Escape");
        assert.equal(
          await page
            .getByRole("button", { name: "Open menu", exact: true })
            .getAttribute("aria-expanded"),
          "false",
        );
      }
      checks("route", { width, route, passed: true });
      await page.close();
    }
    await ctx.close();
    const reduced = await b.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await reduced.newPage();
    const mp4 = [];
    page.on("request", (r) => {
      if (r.url().endsWith(".mp4")) mp4.push(r.url());
    });
    await page.goto(base);
    await page.waitForTimeout(700);
    for (const article of await page.locator("article").all()) {
      await article.scrollIntoViewIfNeeded();
      const img = article.locator("img");
      await img.evaluate((e) => e.decode());
      assert(
        await img.evaluate(
          (e) => e.naturalWidth > 0 && e.getBoundingClientRect().height > 100,
        ),
      );
      assert(
        await article.getByRole("button", { name: /^Play video:/ }).isVisible(),
      );
    }
    assert.equal(await page.locator("article").count(), films.length);
    assert.deepEqual(mp4, []);
    assert.equal(await page.locator("video").count(), 0);
    checks("reduced-motion", { width, passed: true });
    await reduced.close();
  }
  // Every final media reference and byte-range serving.
  const p = await b.newPage();
  for (const { slug } of films)
    for (const file of [
      "showcase.mp4",
      "showcase-poster.jpg",
      "desktop.jpg",
      "mobile.jpg",
    ]) {
      const r = await p.request.get(`${base}/media/projects/${slug}/${file}`);
      assert.equal(r.status(), 200);
      checks("asset", {
        slug,
        file,
        status: r.status(),
        bytes: (await r.body()).length,
      });
    }
  const range = await p.request.get(
    base + "/media/projects/prince-m-furnishing-concept/showcase.mp4",
    { headers: { Range: "bytes=0-1023" } },
  );
  assert.equal(range.status(), 206);
  checks("range", {
    status: range.status(),
    length: (await range.body()).length,
  });
  await p.close();
  // Real-time complete decode/playback, one desktop/mobile context per film.
  for (const { prefix: name } of films) {
    await Promise.all(
      [1440, 390].map(async (width) => {
        const ctx = await b.newContext({ viewport: { width, height: 900 } });
        const p = await ctx.newPage();
        await p.goto(base + "/work");
        const button = p.getByRole("button", {
          name: new RegExp("Play video: " + name),
        });
        await button.scrollIntoViewIfNeeded();
        await button.focus();
        await p.keyboard.press("Enter");
        const v = p.locator("video");
        await v.evaluate(
          (v) =>
            new Promise((resolve, reject) => {
              const timer = setTimeout(
                () => reject(new Error("Playback timeout")),
                30000,
              );
              v.addEventListener(
                "ended",
                () => {
                  clearTimeout(timer);
                  resolve();
                },
                { once: true },
              );
              v.addEventListener(
                "error",
                () => reject(new Error(v.error.message)),
                { once: true },
              );
            }),
        );
        const result = await v.evaluate((v) => ({
          ended: v.ended,
          time: v.currentTime,
          duration: v.duration,
          muted: v.muted,
          controls: v.controls,
          inline: v.playsInline,
          videoWidth: v.videoWidth,
          height: v.videoHeight,
          quality: v.getVideoPlaybackQuality().toJSON?.() ?? {
            total: v.getVideoPlaybackQuality().totalVideoFrames,
            dropped: v.getVideoPlaybackQuality().droppedVideoFrames,
          },
        }));
        assert.equal(result.ended, true);
        assert.equal(result.muted, true);
        assert.equal(result.controls, true);
        assert.equal(result.inline, true);
        assert.equal(result.duration, 21);
        assert.equal(result.videoWidth, 1280);
        assert.equal(result.height, 800);
        checks("complete-playback", { name, width, ...result });
        await ctx.close();
      }),
    );
  }
  // Test every project's complete fallback chain, with deliberate request failures.
  for (const film of films) {
    for (const mode of ["poster", "still", "placeholder"]) {
      const ctx = await b.newContext();
      const p = await ctx.newPage();
      await p.route("**/*.mp4", (r) => r.abort());
      if (mode !== "poster")
        await p.route("**/_next/image?**", (r) => {
          const url = decodeURIComponent(r.request().url());
          if (
            url.includes("showcase-poster.jpg") ||
            (mode === "placeholder" && url.includes("/media/projects/"))
          )
            return r.abort();
          return r.continue();
        });
      await p.goto(base + "/work");
      const article = p
        .locator("article")
        .filter({
          has: p.getByRole("heading", { name: film.title, exact: true }),
        });
      await article.getByRole("button", { name: /^Play video:/ }).click();
      await p.waitForTimeout(600);
      if (mode === "placeholder") {
        assert(
          await article
            .getByText("Image unavailable", { exact: true })
            .isVisible(),
        );
      } else {
        const img = article.locator("img");
        assert.equal(await img.count(), 1);
        const src = decodeURIComponent(await img.getAttribute("src"));
        assert(
          src.includes(
            mode === "poster" ? "showcase-poster.jpg" : "desktop.jpg",
          ),
        );
        assert(
          await img.evaluate(
            (e) =>
              e.complete &&
              e.naturalWidth > 0 &&
              e.getBoundingClientRect().height > 100,
          ),
        );
      }
      checks("failure-chain", { project: film.slug, mode, passed: true });
      await ctx.close();
    }
  }
  // Ambient refusal and no-codec fallback.
  for (const mode of ["blocked", "no-codec"]) {
    const ctx = await b.newContext();
    const p = await ctx.newPage();
    await p.addInitScript((mode) => {
      if (mode === "blocked")
        HTMLMediaElement.prototype.play = function () {
          return Promise.reject(new DOMException("Blocked", "NotAllowedError"));
        };
      else
        HTMLMediaElement.prototype.canPlayType = function () {
          return "";
        };
    }, mode);
    await p.goto(base);
    await p.waitForTimeout(800);
    if (mode === "blocked")
      assert(
        await p
          .getByRole("button", { name: /Play video: Prince M/ })
          .first()
          .isVisible(),
      );
    else assert.equal(await p.locator("video").count(), 0);
    assert(
      await p
        .locator("img")
        .first()
        .evaluate((e) => e.complete),
    );
    checks(mode, { passed: true });
    await ctx.close();
  }
  // Scroll all Work frames to inspect settled reveals and zero video fetches.
  for (const width of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width, height: 900 } });
    const p = await ctx.newPage();
    const errors = [],
      requests = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("request", (r) => {
      if (r.url().endsWith(".mp4")) requests.push(r.url());
    });
    await p.goto(base + "/work");
    for (const article of await p.locator("article").all()) {
      await article.scrollIntoViewIfNeeded();
      await p.waitForTimeout(350);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
    }
    await p.waitForTimeout(800);
    await p.screenshot({
      path: `${artifacts}/work-reviewed-${width}.png`,
      fullPage: true,
    });
    assert.deepEqual(requests, []);
    assert.deepEqual(errors, []);
    assert.equal(
      await p.getByText("Media coming soon", { exact: true }).count(),
      0,
    );
    assert.equal(
      await p.getByRole("button", { name: /^Play video:/ }).count(),
      films.length,
    );
    checks("work-scroll", {
      width,
      errors,
      videoRequests: requests.length,
      films: films.length,
    });
    await ctx.close();
  }
  // Mobile navigation actually follows a link, retaining WhatsApp URL.
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    await p.goto(base);
    await p.getByRole("button", { name: "Open menu", exact: true }).click();
    await p
      .getByRole("navigation", { name: "Mobile", exact: true })
      .getByRole("link", { name: "Work", exact: true })
      .click();
    await p.waitForURL("**/work");
    assert.equal(
      await p
        .getByRole("button", { name: "Open menu", exact: true })
        .getAttribute("aria-expanded"),
      "false",
    );
    assert(
      (await p.locator('a[href="https://wa.me/2348102505135"]').count()) > 0,
    );
    checks("mobile-navigation", { passed: true });
    await ctx.close();
  }
  // Homepage initial traffic and actual geometry stay stable while video starts.
  {
    const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
    await p.goto(base);
    await p.waitForTimeout(1200);
    const before = await p.locator("video").first().boundingBox();
    await p.waitForTimeout(1000);
    const after = await p.locator("video").first().boundingBox();
    assert.deepEqual(before, after);
    checks(
      "initial-network",
      await p.evaluate(() => ({
        videoCount: document.querySelectorAll("video").length,
        playing: [...document.querySelectorAll("video")].filter(
          (v) => !v.paused,
        ).length,
        resources: performance.getEntriesByType("resource").length,
        transferBytes: performance
          .getEntriesByType("resource")
          .reduce((a, r) => a + r.transferSize, 0),
        mp4: performance
          .getEntriesByType("resource")
          .filter((r) => r.name.includes(".mp4"))
          .map((r) => r.name),
        posterSizes: performance
          .getEntriesByType("resource")
          .filter((r) => r.name.includes("showcase-poster"))
          .map((r) => r.transferSize),
      })),
    );
    const video = p.locator("video").first();
    await p.evaluate(() => scrollTo({ top: 1800, behavior: "instant" }));
    await p.waitForTimeout(400);
    assert(await video.evaluate((v) => v.paused));
    await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await p.waitForTimeout(600);
    assert.equal(await video.evaluate((v) => v.paused), false);
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await p.waitForTimeout(200);
    assert(await video.evaluate((v) => v.paused));
    checks("ambient-visibility", {
      offscreenPause: true,
      resume: true,
      hiddenPause: true,
    });
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForTimeout(300);
    assert.equal(await p.locator("video").count(), 0);
    checks("dynamic-reduced-motion", { passed: true });
    await p.close();
  }
  fs.writeFileSync(`${artifacts}/results.json`, JSON.stringify(log, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
