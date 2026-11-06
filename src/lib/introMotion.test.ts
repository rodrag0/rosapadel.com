import { describe, expect, it } from "vitest";
import {
  advanceIntroProgress,
  getIntroFrame,
  INTRO_SEQUENCE_SECONDS,
  transitionAt,
} from "./introMotion";

describe("intro playback speed limit", () => {
  it.each([30, 60, 120, 144])(
    "takes at least four seconds for a full jump at %i fps",
    (fps) => {
      let progress = 0;
      const elapsed = 1000 / fps;
      for (let frame = 0; frame < fps * INTRO_SEQUENCE_SECONDS - 1; frame++)
        progress = advanceIntroProgress(progress, 1, elapsed);
      expect(progress).toBeLessThan(1);
      expect(progress).toBeCloseTo(1 - elapsed / 4000);
      expect(advanceIntroProgress(progress, 1, elapsed)).toBeCloseTo(1);
    },
  );
  it("bounds reverse playback by the same speed", () => {
    expect(advanceIntroProgress(0.8, 0, 16)).toBeCloseTo(0.796);
    expect(advanceIntroProgress(0.2, 1, 16)).toBeCloseTo(0.204);
  });
  it("does not overshoot nearby destinations or add a forced delay", () => {
    expect(advanceIntroProgress(0.2, 0.201, 16)).toBe(0.201);
    expect(advanceIntroProgress(0.2, 0.199, 16)).toBe(0.199);
    expect(advanceIntroProgress(0.2, 0.2, 16)).toBe(0.2);
  });
  it("caps stalled frames instead of catching up in one jump", () => {
    expect(advanceIntroProgress(0.2, 1, 10000)).toBeCloseTo(0.216);
    expect(advanceIntroProgress(0.8, 0, 10000)).toBeCloseTo(0.784);
  });
  it("clamps scroll bounds and ignores invalid or negative elapsed time", () => {
    expect(advanceIntroProgress(-1, 2, 16)).toBeCloseTo(0.004);
    expect(advanceIntroProgress(0.2, 1, -16)).toBe(0.2);
    expect(advanceIntroProgress(0.2, 1, NaN)).toBe(0.2);
    expect(advanceIntroProgress(0.2, NaN, 16)).toBe(0.2);
  });
});

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
