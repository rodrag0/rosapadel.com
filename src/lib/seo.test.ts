import { describe, expect, it } from "vitest";
import { getPageMetadata, publicPagePaths, siteOrigin } from "./seo";

describe("public search metadata", () => {
  it("keeps each public route distinct instead of canonicalizing it to home", () => {
    const metadata = publicPagePaths.map(path => getPageMetadata(path));
    expect(metadata.map(page => page.canonical)).toEqual(publicPagePaths.map(path => siteOrigin + path));
    expect(new Set(metadata.map(page => page.title)).size).toBe(publicPagePaths.length);
    expect(metadata.every(page => page.description.length > 20 && page.robots === "index, follow")).toBe(true);
  });
  it("keeps tracking queries and trailing slashes out of canonical URLs", () => {
    expect(getPageMetadata("/products/vision/?utm_source=example#contact").canonical).toBe(siteOrigin + "/products/vision");
  });
  it("consolidates legacy product URLs into their current destination", () => {
    expect(getPageMetadata("/products/core-led").canonical).toBe(siteOrigin + "/products/portable");
    expect(getPageMetadata("/products/core-hd").canonical).toBe(siteOrigin + "/products/vision");
  });
  it("keeps shared match pages private from indexing and missing pages out of the homepage canonical", () => {
    expect(getPageMetadata("/match-session/matchi-live-score").robots).toBe("noindex, nofollow");
    expect(getPageMetadata("/missing-product")).toMatchObject({ canonical: null, robots: "noindex, nofollow" });
  });
  it("uses translated homepage titles without changing the canonical identity", () => {
    expect(getPageMetadata("/", "es").canonical).toBe(siteOrigin + "/");
    expect(getPageMetadata("/", "es").description).not.toBe(getPageMetadata("/", "en").description);
    expect(getPageMetadata("/", "de").description).not.toBe(getPageMetadata("/", "en").description);
  });
});
