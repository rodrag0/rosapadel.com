import { describe, expect, it } from "vitest";
import { getHardwareProducts, getProductLinks } from "./productCatalog";

describe("product display order", () => {
  it.each(["en", "es", "de"] as const)("leads with rosa vision in %s", (language) => {
    const hardware = getHardwareProducts(language);
    expect(hardware.map((product) => product.name)).toEqual(["rosa vision", "rosa portable"]);
    expect(hardware.map((product) => product.num)).toEqual(["01", "02"]);
    expect(getProductLinks(language).map((product) => product.href)).toEqual([
      "/products/vision",
      "/products/portable",
      "/products/coach",
    ]);
  });
});
