import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "./LanguageProvider";
import VisionFeatureGallery from "./VisionFeatureGallery";

beforeEach(() => localStorage.setItem("rosa-language", "en"));
afterEach(cleanup);
function gallery() {
  return render(
    <LanguageProvider>
      <VisionFeatureGallery />
    </LanguageProvider>,
  );
}

describe("Vision feature gallery", () => {
  it("selects real analysis media with an explicit evidence caption and without a separate Coach product", () => {
    gallery();
    const tab = screen.getByRole("tab", { name: "AI match analysis" });
    expect(tab).toHaveAttribute("href", "/products/vision#vision-analysis");
    fireEvent.click(tab);
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel").querySelector("img")).toHaveAttribute(
      "src",
      "/images/software/vision-shots.webp",
    );
    expect(
      screen.getByText("Final Expo 2026 · Saved shot classifications"),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View full image" }),
    ).toHaveAttribute("href", "/images/software/vision-shots.webp");
    expect(screen.queryByText("rosa coach")).not.toBeInTheDocument();
  });
  it("wraps previous/next and unmounts video when leaving replay", () => {
    const { container } = gallery();
    fireEvent.click(screen.getByRole("button", { name: "Previous feature" }));
    expect(
      screen.getByRole("tab", { name: "Club branding & sponsors" }),
    ).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("button", { name: "Next feature" }));
    expect(
      screen.getByRole("tab", { name: "Live scoring & court controls" }),
    ).toHaveAttribute("aria-selected", "true");
    fireEvent.click(
      screen.getByRole("tab", { name: "Match recording & replay" }),
    );
    const video = screen.getByRole("tabpanel").querySelector("video");
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("preload", "none");
    fireEvent.click(screen.getByRole("button", { name: "Next feature" }));
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });
  it("uses a labelled court fallback if media fails", () => {
    gallery();
    fireEvent.click(
      screen.getByRole("tab", { name: "Livestream with live score" }),
    );
    fireEvent.error(screen.getByRole("tabpanel").querySelector("img")!);
    expect(screen.getByRole("tabpanel").querySelector("img")).toHaveAttribute(
      "src",
      "/images/products/rosa-vision-court.webp",
    );
    expect(screen.getByText("ROSA Vision · Court installation")).toBeVisible();
  });
  it.each(["en", "es", "de"] as const)(
    "keeps all eight selectable capabilities and native detail anchors in %s",
    (language) => {
      localStorage.setItem("rosa-language", language);
      gallery();
      expect(screen.getAllByRole("tab")).toHaveLength(8);
      expect(
        screen
          .getAllByRole("tab")
          .every((tab) =>
            tab.getAttribute("href")?.startsWith("/products/vision#vision-"),
          ),
      ).toBe(true);
      expect(screen.getByRole("tabpanel")).toBeVisible();
    },
  );
});

describe("automatic feature rotation", () => {
  let visibility: (ratio: number) => void;
  const tick = (ms = 7000) =>
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  const active = () =>
    screen
      .getAllByRole("tab")
      .find((tab) => tab.getAttribute("aria-selected") === "true");
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          visibility = (ratio) =>
            callback(
              [
                {
                  isIntersecting: ratio > 0,
                  intersectionRatio: ratio,
                } as IntersectionObserverEntry,
              ],
              this as unknown as IntersectionObserver,
            );
        }
        observe() {
          visibility(1);
        }
        disconnect() {}
      },
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it("advances every seven seconds and wraps through all eight features", () => {
    gallery();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    tick(6999);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    tick(1);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
    for (let index = 0; index < 7; index++) tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
  });
  it("offers persistent pause and resume controls", () => {
    gallery();
    fireEvent.click(
      screen.getByRole("button", { name: "Pause automatic rotation" }),
    );
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    fireEvent.click(
      screen.getByRole("button", { name: "Resume automatic rotation" }),
    );
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("pauses on hover and grants a fresh interval on leaving", () => {
    const { container } = gallery();
    vi.spyOn(container.querySelector(".vision-gallery")!, "matches").mockReturnValue(true);
    tick(6000);
    fireEvent.pointerEnter(container.querySelector(".vision-gallery")!, {
      pointerType: "mouse",
    });
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    fireEvent.pointerLeave(container.querySelector(".vision-gallery")!);
    tick(6999);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    tick(1);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("ignores a stale pointer-enter after the rotation button swaps its icon", () => {
    const { container } = gallery();
    vi.spyOn(container.querySelector(".vision-gallery")!, "matches").mockReturnValue(false);
    fireEvent.pointerEnter(container.querySelector(".vision-gallery")!, { pointerType: "mouse" });
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("pauses for keyboard focus without moving it during rotation", () => {
    gallery();
    const tab = screen.getAllByRole("tab")[0];
    act(() => tab.focus());
    tick(30000);
    expect(active()).toBe(tab);
    expect(tab).toHaveFocus();
    fireEvent.blur(tab, { relatedTarget: document.body });
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("stops offscreen or hidden and resumes without catching up", () => {
    gallery();
    act(() => visibility(0));
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    act(() => visibility(1));
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("does not advance while the replay is playing", () => {
    gallery();
    fireEvent.click(
      screen.getByRole("tab", { name: "Match recording & replay" }),
    );
    const video = screen.getByRole("tabpanel").querySelector("video")!;
    fireEvent.play(video);
    fireEvent.click(screen.getByRole("tab", { name: "Match recording & replay" }));
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-replay");
    fireEvent.pause(video);
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-var");
  });
  it("resets the interval after manual selection, even for the same feature", () => {
    gallery();
    tick(6000);
    fireEvent.click(
      screen.getByRole("tab", { name: "Live scoring & court controls" }),
    );
    tick(6999);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    tick(1);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
  it("starts paused for reduced motion but permits explicit opt-in", () => {
    const original = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      ...original(query),
      matches: query.includes("prefers-reduced-motion"),
    }));
    gallery();
    tick(30000);
    expect(active()).toHaveAttribute("href", "/products/vision#vision-scoring");
    fireEvent.click(
      screen.getByRole("button", { name: "Resume automatic rotation" }),
    );
    tick();
    expect(active()).toHaveAttribute("href", "/products/vision#vision-stream");
  });
});
