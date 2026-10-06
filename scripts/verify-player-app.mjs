import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = (process.argv[2] || "http://127.0.0.1:4185").replace(/\/$/, "");
const output = path.resolve(process.argv[3] || "review.local/player-app");
await mkdir(output, { recursive: true });
const manifest = await (await fetch(`${base}/rosa-app/demo/match.json`)).json();
assert.equal(manifest.duration, 120);
assert(manifest.shots.length > 10);
assert(manifest.shots.every((shot) => shot.time >= 0 && shot.time < manifest.duration));
assert.equal(manifest.exportAvailable, false);
const range = await fetch(`${base}/rosa-app/demo/replay.mp4`, { headers: { Range: "bytes=0-1023" } });
assert.equal(range.status, 206);
assert.equal((await range.arrayBuffer()).byteLength, 1024);
const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const errors = [], badResponses = [], mutations = [], report = [];

try {
  for (const [width, height, theme] of [[1440, 900, "light"], [390, 844, "dark"], [320, 740, "light"]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.url().startsWith(base) && response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });
    page.on("request", (request) => { if (!["GET", "HEAD"].includes(request.method()) && request.url().startsWith(base)) mutations.push(request.url()); });
    await page.route("**/*clarity.ms/**", (route) => route.abort());
    await page.addInitScript((theme) => {
      localStorage.setItem("rosa-language", "en");
      localStorage.setItem("rosa-theme", theme);
      localStorage.setItem("rosa-theme-manual", "true");
      localStorage.setItem("website-preview-rosa-theme", theme);
    }, theme);
    await page.goto(`${base}/rosa-app${width === 390 ? "/" : ""}`);
    await expect(page).toHaveTitle("rosa app");
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.png?v=rosa-2");
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow");
    const app = page;
    await expect(app.locator(".directory-replay .shot-finished")).toBeVisible({ timeout: 30000 });
    await page.screenshot({ path: path.join(output, `clubs-${width}-${theme}.png`) });
    assert.equal(await app.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    await app.locator(".directory-replay .shot-finished").click();
    await expect(app.getByLabel("Player", { exact: true })).toBeVisible();
    await app.getByRole("button", { name: /^Play .* by / }).first().click();
    const video = app.locator(".shot-video video");
    await expect.poll(() => video.evaluate((element) => element.readyState), { timeout: 60000 }).toBeGreaterThanOrEqual(2);
    await expect.poll(() => video.evaluate((element) => element.currentTime), { timeout: 30000 }).toBeGreaterThan(0);
    assert.equal(await video.evaluate((element) => Math.round(element.duration)), 120);
    assert.equal(await video.evaluate((element) => element.videoWidth), 1920);
    await app.getByRole("button", { name: "Save this clip", exact: true }).click();
    await expect(app.getByRole("button", { name: "Download", exact: true })).toBeDisabled();
    await page.screenshot({ path: path.join(output, `replay-${width}-${theme}.png`) });
    const saved = await app.evaluate(() => JSON.parse(localStorage.getItem("website-preview-rosa-match-001-highlights-v1")));
    assert.equal(saved.length, 1);
    await page.reload();
    const reloaded = page;
    await expect(reloaded.getByLabel("Player", { exact: true })).toBeVisible({ timeout: 30000 });
    assert.equal(await reloaded.evaluate(() => JSON.parse(localStorage.getItem("website-preview-rosa-match-001-highlights-v1")).length), 1);
    await reloaded.goto(`${base}/rosa-app#shot=${manifest.suggestions[0].id}`);
    await expect(reloaded.locator(".shot-playback-label")).toContainText("Lobs, bandejas");
    await reloaded.getByRole("button", { name: "Statistics", exact: true }).click();
    await reloaded.getByRole("button", { name: "Labeled shot counts" }).click();
    await expect(reloaded.locator(".shot-stat-total")).toContainText(String(manifest.shots.length));
    await page.screenshot({ path: path.join(output, `statistics-${width}-${theme}.png`) });
    await reloaded.getByRole("button", { name: "Heatmaps", exact: true }).click();
    await expect(reloaded.getByText(/Demo tracking/)).toBeVisible();
    const layout = await reloaded.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      brokenImages: [...document.images].filter((img) => img.getBoundingClientRect().width > 0 && img.complete && !img.naturalWidth).map((img) => img.src),
    }));
    assert.equal(layout.overflow, false);
    assert.deepEqual(layout.brokenImages, []);
    report.push({ width, theme, ...layout, standaloneRoute: "passed", replay: "1080p, 120 seconds", savedHighlights: "persisted", liveBackend: false });
    console.log(`PASS ${width} ${theme}`);
    await page.close();
  }
  for (const [route, title] of [["/", "rosa"], ["/tournament-tool", "Tournament Manager"], ["/americano-tool", "Americano Manager"], ["/league-tool", "Leagues"]]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, `${route} unavailable`);
    const html = await response.text();
    assert(!html.includes("<title>rosa app</title>"), `${route} incorrectly serves player app`);
    assert(html.match(/<title>(.*?)<\/title>/i)?.[1].includes(title), `${route} serves the wrong page`);
    report.push({ existingRoute: route, status: response.status });
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(badResponses, []);
  assert.deepEqual(mutations, []);
  await writeFile(path.join(output, "report.json"), JSON.stringify({ report, errors, badResponses, mutations }, null, 2));
} finally {
  await browser.close();
}
