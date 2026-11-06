import { act, cleanup, renderHook } from "@testing-library/react";
import { motionValue } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIntroProgress } from "./useIntroProgress";

describe("paced intro lifecycle", () => {
  let callbacks: Map<number, FrameRequestCallback>;
  let id: number;
  let now: number;
  const frame = (elapsed = 16) => {
    now += elapsed;
    const pending = [...callbacks.values()];
    callbacks.clear();
    act(() => pending.forEach((callback) => callback(now)));
  };
  beforeEach(() => {
    callbacks = new Map();
    id = 0;
    now = 0;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callbacks.set(++id, callback);
      return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (frame: number) =>
      callbacks.delete(frame),
    );
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("schedules only while catching up, then stops at its target", () => {
    const source = motionValue(0);
    const { result } = renderHook(() => useIntroProgress(source, true));
    expect(callbacks.size).toBe(0);
    act(() => source.set(0.01));
    expect(callbacks.size).toBe(1);
    frame();
    frame();
    frame();
    frame();
    expect(result.current.get()).toBe(0.01);
    expect(callbacks.size).toBe(0);
  });
  it("follows the latest destination without queuing scroll events", () => {
    const source = motionValue(0);
    const { result } = renderHook(() => useIntroProgress(source, true));
    act(() => {
      source.set(1);
      source.set(0.8);
      source.set(0.5);
    });
    expect(callbacks.size).toBe(1);
    frame();
    frame();
    expect(result.current.get()).toBeCloseTo(0.004);
    act(() => source.set(0));
    frame();
    expect(result.current.get()).toBe(0);
    expect(callbacks.size).toBe(0);
  });
  it("stops when paused, offscreen or hidden and resumes without a time jump", () => {
    const source = motionValue(0);
    const { result, rerender } = renderHook(
      ({ active }) => useIntroProgress(source, active),
      { initialProps: { active: true } },
    );
    act(() => source.set(1));
    frame();
    frame();
    const before = result.current.get();
    rerender({ active: false });
    expect(callbacks.size).toBe(0);
    act(() => source.set(0.9));
    frame(10000);
    expect(result.current.get()).toBe(before);
    rerender({ active: true });
    frame();
    expect(result.current.get()).toBe(before);
    frame();
    expect(result.current.get()).toBeCloseTo(before + 0.004);
  });
  it("removes the scroll listener and pending frame when unmounted", () => {
    const source = motionValue(0);
    const { unmount } = renderHook(() => useIntroProgress(source, true));
    act(() => source.set(1));
    unmount();
    expect(callbacks.size).toBe(0);
    act(() => source.set(0.5));
    expect(callbacks.size).toBe(0);
  });
});
