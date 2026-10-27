import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { publicPagePaths, extraPagePaths, siteOrigin, getPageMetadata } from "../dist-ssr/entry-server.js";

for (const pathname of [...publicPagePaths, ...extraPagePaths]) {
  const file = pathname === "/" ? "dist/index.html" : `dist${pathname}/index.html`;
  const document = new JSDOM(await readFile(file, "utf8")).window.document;
  assert.equal(document.querySelectorAll("h1").length, 1, file);
  assert.ok(document.getElementById("root").textContent.trim().length > 100, `Missing initial content: ${file}`);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, file);
  assert.equal(document.querySelector('link[rel="canonical"]').href, siteOrigin + pathname, file);
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1, file);
  assert.equal(document.querySelectorAll('meta[name="robots"]').length, 1, file);
  assert.equal(document.querySelector('meta[name="robots"]').content, getPageMetadata(pathname).robots, file);
  assert.equal(document.querySelector('meta[property="og:url"]').content, siteOrigin + pathname, file);
  assert.ok(document.querySelector('script[type="application/ld+json"]'), file);
  assert.ok(!document.querySelector("template[data-msg]"), `Incomplete suspense boundary: ${file}`);
  if (pathname === "/") assert.ok(document.querySelector("img[data-court-preview]"), "The server-rendered home must include the court image fallback");
}
const sitemap = new JSDOM(await readFile("dist/sitemap.xml", "utf8"), { contentType: "text/xml" }).window.document;
const sitemapUrls = [...sitemap.querySelectorAll("url > loc")].map(element => element.textContent.trim());
assert.deepEqual(sitemapUrls.sort(), publicPagePaths.map(pathname => siteOrigin + pathname).sort(), "Sitemap must contain every indexable page and exclude private showcase routes");
const notFound = new JSDOM(await readFile("dist/404.html", "utf8")).window.document;
assert.equal(notFound.querySelector('meta[name="robots"]').content, "noindex, nofollow");
assert.equal(notFound.querySelector('link[rel="canonical"]'), null);
const routing = JSON.parse(await readFile("vercel.json", "utf8"));
assert.equal(routing.routes, undefined);
if (routing.cleanUrls) {
  assert.ok(routing.rewrites.every(route => !/\.html$/.test(route.source) && !/\.html$/.test(route.destination)), "cleanUrls cannot be combined with HTML rewrite paths");
}
assert.ok(!routing.rewrites.some(route => route.source.includes("*") || route.source.includes("(.*)")), "A wildcard rewrite would mask real 404s");
assert.ok(routing.redirects.some(route => route.source === "/products/core-hd" && route.destination === "/products/vision" && route.permanent));
console.log("Initial HTML content, metadata, schema and 404 build checks passed for 11 routes.");
