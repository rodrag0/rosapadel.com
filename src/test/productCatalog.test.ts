import { describe, expect, it } from "vitest";
import { getProductLinks, hardwareProducts, productCatalog } from "@/lib/productCatalog";
import { languageOptions } from "@/lib/siteCopy";

describe("current commercial catalog", () => {
  it("contains only the two current hardware products", () => {
    expect(hardwareProducts.map(({ name }) => name)).toEqual(["rosa Vision", "rosa Portable"]);
    expect(hardwareProducts.map(({ href }) => href)).toEqual(["/products/vision", "/products/portable"]);
  });

  for (const { code } of languageOptions) {
    it(`keeps subscriptions separate from hardware in ${code}`, () => {
      expect(getProductLinks(code)).toHaveLength(3);
      expect(getProductLinks(code)[2].href).toBe("/subscriptions");
      expect(productCatalog[code].clubBody).toBeTruthy();
      expect(productCatalog[code].playerBody).toContain("Padel Chess Engine");
    });

    it(`has no retired products or invented prices in ${code}`, () => {
      const copy = JSON.stringify(productCatalog[code]);
      expect(copy).not.toMatch(/Core (HD|LED)|rosa Coach|€|\$/);
      for (const { id } of hardwareProducts) {
        expect(productCatalog[code][id].features).toHaveLength(4);
        expect(productCatalog[code][id].note).toBeTruthy();
      }
    });
  }
});
