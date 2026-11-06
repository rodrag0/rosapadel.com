import { describe, expect, it } from "vitest";
import { getIntroFrame, transitionAt } from "./introMotion";

describe("ROSA logo-to-court choreography", () => {
  it("begins with the complete symbol and no court or wordmark", () => {
    const frame = getIntroFrame(0);
    expect(frame.symbolOpacity).toBe(1);
    expect(frame.separation).toBe(0);
    expect(frame.wordmarkOpacity).toBe(0);
    expect(frame.court).toBe(0);
  });
  it("resolves into the official wordmark before entering the court", () => {
    const frame = getIntroFrame(0.44);
    expect(frame.symbolOpacity).toBe(0);
    expect(frame.wordmarkOpacity).toBe(1);
    expect(frame.spin).toBeCloseTo(Math.PI * 2);
    expect(frame.court).toBe(0);
  });
  it("ends with readable product content and the complete court", () => {
    const frame = getIntroFrame(1);
    expect(frame.court).toBe(1);
    expect(frame.copyOpacity).toBe(1);
    expect(frame.wordmarkOpacity).toBe(0);
    expect(frame.symbolOpacity).toBe(0);
  });
  it("clamps out-of-range scroll values and eases assembly", () => {
    expect(getIntroFrame(-1)).toEqual(getIntroFrame(0));
    expect(getIntroFrame(2)).toEqual(getIntroFrame(1));
    expect(getIntroFrame(0.16).separation).toBeGreaterThan(0.9);
    expect(transitionAt(0.2, 0.4, 0.3)).toBeCloseTo(0.5);
  });
});
