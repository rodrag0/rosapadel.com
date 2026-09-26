import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseURL = process.argv[2] || "http://127.0.0.1:4184";
const output = path.resolve(process.argv[3] || "review.local/court");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const report = [];
const errors = [];

// Decode rendered screenshots in the browser, avoiding a second image dependency.
async function pixels(page, before, after = before) {
  return page.evaluate(async ([first, second]) => {
    async function decode(encoded) {
      const image = new Image();
      image.src = `data:image/png;base64,${encoded}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      return { width: canvas.width, height: canvas.height, data: context.getImageData(0, 0, canvas.width, canvas.height).data };
    }
    const a = await decode(first), b = await decode(second);
    let pink = 0, changed = 0;
    const bounds = { left: a.width, right: 0, top: a.height, bottom: 0 };
    for (let i = 0; i < a.data.length; i += 4) {
      const [r, g, blue] = a.data.slice(i, i + 3);
      if (r > 100 && r > g * 1.6 && blue > 35 && r > blue * 1.1) {
        pink++;
        const x = (i / 4) % a.width, y = Math.floor(i / 4 / a.width);
        bounds.left = Math.min(bounds.left, x);
        bounds.right = Math.max(bounds.right, x);
        bounds.top = Math.min(bounds.top, y);
        bounds.bottom = Math.max(bounds.bottom, y);
      }
      if (Math.max(...[0, 1, 2].map((channel) => Math.abs(a.data[i + channel] - b.data[i + channel]))) > 12) changed++;
    }
    return { width: a.width, height: a.height, pink, changed, bounds };
  }, [before.toString("base64"), after.toString("base64")]);
}

try {
  for (const [width, height, theme, reducedMotion] of [
    [1440, 900, "dark", "no-preference"],
    [390, 844, "dark", "no-preference"],
    [1440, 900, "light", "reduce"],
    [320, 740, "light", "reduce"],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("**/*clarity.ms/**", (route) => route.abort());
    await page.addInitScript((theme) => {
      localStorage.setItem("rosa-language", "en");
      localStorage.setItem("rosa-theme", theme);
      localStorage.setItem("rosa-theme-manual", "true");
    }, theme);
    await page.goto(baseURL, { waitUntil: "networkidle" });
    const canvas = page.locator(".experience-court canvas");
    const control = page.locator(".court-motion-control");
    await expect(canvas).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1500);
    const key = `${width}-${theme}-${reducedMotion}`;
    await page.screenshot({ path: path.join(output, `${key}-page.png`) });
    const first = await canvas.screenshot({ path: path.join(output, `${key}-court.png`) });
    await page.waitForTimeout(1200);
    const second = await canvas.screenshot();
    const stats = await pixels(page, first, second);
    assert(stats.pink > 100, `${key}: blank court or missing pink geometry`);
    assert(stats.bounds.left > 4 && stats.bounds.right < stats.width - 5 && stats.bounds.top > 4 && stats.bounds.bottom < stats.height - 5, `${key}: court clipped`);
    if (reducedMotion === "reduce") {
      assert.equal(stats.changed, 0, `${key}: reduced-motion scene is moving`);
      await expect(control).toHaveAccessibleName("Play court animation");
    } else {
      assert(stats.changed > 100, `${key}: court is not moving`);
      await control.click();
      await expect(control).toHaveAccessibleName("Play court animation");
      await page.waitForTimeout(500);
      const paused = await canvas.screenshot();
      await page.waitForTimeout(800);
      assert.equal((await pixels(page, paused, await canvas.screenshot())).changed, 0, `${key}: pause did not freeze the court`);
    }
    await control.click();
    await expect(control).toHaveAccessibleName("Pause court animation");
    await page.waitForTimeout(400);
    const resumed = await canvas.screenshot();
    await page.waitForTimeout(1200);
    assert((await pixels(page, resumed, await canvas.screenshot())).changed > 100, `${key}: play did not resume`);
    report.push({ key, ...stats, playback: "passed" });
    console.log(key, JSON.stringify(stats));
    await page.close();
  }
  assert.deepEqual(errors, [], "Court browser errors");
  await writeFile(path.join(output, "report.json"), JSON.stringify({ report, errors }, null, 2));
  console.log("PASS: nonblank court, framing, animation, pause/resume and reduced motion on desktop/mobile in both themes.");
} finally {
  await browser.close();
}
