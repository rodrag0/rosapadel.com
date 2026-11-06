import { describe, expect, it } from "vitest";
import { comparisonGuides, guideHubPath, reviewGuidePaths } from "./comparisonGuides";
import { getPageMetadata, getPageStructuredData, publicPagePaths, siteOrigin } from "./seo";

describe("review-only comparison guides", () => {
  it("keeps three distinct guide routes connected to the hub", () => {
    expect(comparisonGuides).toHaveLength(3);
    expect(new Set(reviewGuidePaths).size).toBe(4);
    expect(reviewGuidePaths).toContain(guideHubPath);
    for (const guide of comparisonGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(4);
      expect(guide.rows).toHaveLength(5);
      expect(guide.sources.every(source => source.url.startsWith("https://"))).toBe(true);
    }
  });
  it("does not expose drafts to indexing or the public sitemap", () => {
    for (const path of reviewGuidePaths) {
      expect(getPageMetadata(path)).toMatchObject({ robots: "noindex, nofollow", canonical: siteOrigin + path });
      expect(publicPagePaths as readonly string[]).not.toContain(path);
    }
    expect(getPageMetadata("/products/vision").robots).toBe("index, follow");
  });
  it("uses visible source-check dates without inventing publication, ratings or offers", () => {
    for (const guide of comparisonGuides) {
      const schema = JSON.stringify(getPageStructuredData(guide.path));
      expect(schema).toContain('"@type":"Article"');
      expect(schema).toContain('"@type":"BreadcrumbList"');
      expect(schema).toContain('"dateModified":"2026-10-27"');
      expect(schema).not.toMatch(/datePublished|AggregateRating|Offer|ReviewRating/);
    }
    expect(JSON.stringify(getPageStructuredData("/products/vision"))).not.toContain('"@type":"Article"');
  });
});
