import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Run against a local server or a branch preview; lead submissions are intercepted.
const baseURL = process.argv[2] || "http://127.0.0.1:4184";
const output = path.resolve(process.argv[3] || "review.local");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const report = [];
const errors = [];

async function newPage(viewport, language, theme, reducedMotion = "reduce") {
  const page = await browser.newPage({ viewport, reducedMotion });
  await page.addInitScript(({ language, theme }) => {
    localStorage.setItem("rosa-language", language);
    localStorage.setItem("rosa-theme", theme);
    localStorage.setItem("rosa-theme-manual", "true");
  }, { language, theme });
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*clarity.ms/**", route => route.abort());
  // A verification run must never send a lead to the real inbox.
  await page.route("https://formsubmit.co/**", route => route.fulfill({ status: 503, contentType: "application/json", body: '{"success":false}' }));
  return page;
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

try {
  for (const [width, height, language, theme] of [
    [1440, 900, "es", "dark"], [390, 844, "es", "dark"],
    [320, 740, "de", "light"], [768, 1024, "en", "light"],
    [1366, 768, "de", "dark"], [1920, 1080, "en", "dark"],
  ]) {
    const page = await newPage({ width, height }, language, theme);
    for (const route of ["/", "/events"]) {
      await page.goto(baseURL + route, { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toBeVisible();
      await scrollThrough(page);
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        heroBottom: document.querySelector(".experience-hero").getBoundingClientRect().bottom,
        brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
        escapedHeadings: [...document.querySelectorAll("h1,h2,h3")].filter(el => {
          const range = document.createRange(); range.selectNodeContents(el);
          const text = range.getBoundingClientRect(), box = el.getBoundingClientRect();
          return text.right > box.right + 2 || text.left < box.left - 2;
        }).map(el => el.textContent),
      }));
      assert.equal(metrics.overflow, false, `${width} ${language} ${route}: horizontal page overflow`);
      assert.deepEqual(metrics.brokenImages, [], "Broken image");
      assert.deepEqual(metrics.escapedHeadings, [], "Heading overflow");
      assert.equal(await page.locator('a[href*="rosa-match-demo.vercel.app"]').count(), 0);
      const key = `${route === "/" ? "home" : "events"}-${width}-${language}-${theme}`;
      await page.screenshot({ path: path.join(output, `${key}.png`), fullPage: true });
      report.push({ key, ...metrics });
      console.log(key, JSON.stringify(metrics));
      if (route === "/" && [1440, 390].includes(width)) {
        const canvas = page.locator(".experience-court canvas");
        await expect(canvas).toBeVisible();
        await canvas.scrollIntoViewIfNeeded();
        const screenshot = await canvas.screenshot({ path: path.join(output, `court-${width}.png`) });
        const pixels = await page.evaluate(async base64 => {
          const img = new Image(); img.src = `data:image/png;base64,${base64}`; await img.decode();
          const surface = document.createElement("canvas"); surface.width = img.width; surface.height = img.height;
          const ctx = surface.getContext("2d"); ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, img.width, img.height).data;
          const colors = new Set(); let visible = 0;
          for (let i = 0; i < data.length; i += 16) {
            colors.add(`${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`);
            if (Math.max(data[i], data[i + 1], data[i + 2]) > 45) visible++;
          }
          return { colors: colors.size, visibleFraction: visible / (data.length / 16) };
        }, screenshot.toString("base64"));
        assert(pixels.colors > 40 && pixels.visibleFraction > 0.025, `Blank court: ${JSON.stringify(pixels)}`);
        report.push({ canvas: width, ...pixels });
      }
    }
    await page.close();
  }

  const page = await newPage({ width: 390, height: 844 }, "es", "dark");
  await page.goto(baseURL);
  const menu = page.locator('button[aria-controls="site-mobile-menu"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator('#site-mobile-menu a[href="/events"]').click();
  await expect(page).toHaveURL(/\/events$/);
  await expect(page.locator("#objective")).toHaveValue("tournaments");

  await page.getByRole("tab", { name: "Ligas", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Jornada 4");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Americanos", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Ronda 2");
  await page.getByRole("button", { name: "¿El VAR decide automáticamente una jugada?" }).click();
  await expect(page.getByText("No. La revisión con vídeo", { exact: false })).toBeVisible();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  await page.locator("#name").fill("Website review");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#org").fill("Local verification only");
  await page.locator("#privacy").click();
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('[data-sonner-toast][data-type="error"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
  let submitted;
  await page.route("https://formsubmit.co/ajax/info@rosapadel.com", route => {
    submitted = route.request().postDataJSON();
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
  });
  await page.locator('button[type="submit"]').click();
  await expect(page.locator(".experience-form-success")).toBeVisible();
  assert.equal(submitted.objective, "tournaments");
  await page.goto(baseURL);
  await page.route("**/rosavstiebreak.mp4", route => route.abort());
  await page.getByRole("button", { name: "Ver el partido", exact: true }).click();
  await expect(page.locator(".experience-video-error")).toBeVisible();
  await page.close();

  const animated = await newPage({ width: 1440, height: 900 }, "en", "dark", "no-preference");
  await animated.goto(baseURL);
  await animated.locator(".experience-court").scrollIntoViewIfNeeded();
  const court = animated.locator(".experience-court canvas");
  await expect(court).toBeVisible();
  const first = await court.screenshot();
  await animated.waitForTimeout(800);
  const second = await court.screenshot();
  assert(!first.equals(second), "Court does not animate");
  await animated.close();
  assert.deepEqual(errors, [], "Browser errors");
  await writeFile(path.join(output, "report.json"), JSON.stringify({ report, errors, interactions: "passed", form: "intercepted; no real submission", motion: "passed" }, null, 2));
  console.log("PASS: responsive pages, canvas pixels, motion, tabs, menu, FAQ, form success/error, video fallback.");
} finally {
  await browser.close();
}
