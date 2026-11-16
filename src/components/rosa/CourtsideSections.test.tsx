import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import rosaIconDark from "@/assets/rosa-icon-dark.svg";
import { MATCH_PREVIEW_URL, MATCH_SHARE_URL } from "@/lib/matchMedia";
import { LanguageProvider } from "./LanguageProvider";
import { CourtsideHero, CourtsideProof, CourtsideShare, CourtsideWorkflow } from "./CourtsideSections";

beforeEach(() => localStorage.setItem("rosa-language", "en"));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Courtside homepage", () => {
  it("keeps the full replay link available and loads the rally only on demand", () => {
    const { container } = render(
      <LanguageProvider>
        <CourtsideHero />
      </LanguageProvider>,
    );
    const heading = screen.getByRole("heading", { level: 1, name: "rosa vision" });
    expect(heading).toBeVisible();
    expect(heading.querySelector(".courtside-poster-mark img")).toHaveAttribute("alt", "");
    expect(screen.getByRole("link", { name: "Final Expo 2026" })).toHaveAttribute("href", MATCH_SHARE_URL);
    expect(container.querySelector("video")).not.toBeInTheDocument();

    expect(screen.getByRole("img", { name: /Invicto/ })).toHaveAttribute("src", "/images/courtside/invicto-court.webp");
    expect(screen.getByRole("link", { name: "See a point counted" })).toHaveAttribute("href", "#court-controls");
    fireEvent.click(screen.getByRole("button", { name: /Watch the rally/ }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("video source")).toHaveAttribute("src", MATCH_PREVIEW_URL);
    expect(within(dialog).getByRole("link", { name: "Watch the full match" })).toHaveAttribute("href", MATCH_SHARE_URL);
  });

  it("keeps the pad touch and TV update together in one controllable demo", () => {
    const { container } = render(
      <LanguageProvider>
        <CourtsideProof />
      </LanguageProvider>,
    );
    expect(screen.getByText(/TV demo with sample players/)).toBeVisible();
    expect(container.querySelectorAll("video")).toHaveLength(1);
    const video = container.querySelector("video");
    expect(video?.querySelector("source")).toHaveAttribute("src", "/images/courtside/point-then-score.mp4");
    expect(video?.controls && video.muted && video.preload === "none").toBe(true);
  });

  it("shows the real scanner, then distinguishes a livestream from a recorded replay", () => {
    render(
      <LanguageProvider>
        <CourtsideWorkflow />
      </LanguageProvider>,
    );
    const tab = (name: string) => screen.getByRole("tab", { name });
    const select = (name: string) => fireEvent.mouseDown(tab(name), { button: 0, ctrlKey: false });

    expect(tab("Scan")).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByRole("tabpanel")).getByRole("img", { name: /Invicto/ })).toHaveAttribute("src", "/images/courtside/invicto-check-in.webp");

    select("Play");
    expect(screen.getByText(/does not save the full match/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Explore ROSA Vision" })).toHaveAttribute("href", "/products/vision");

    select("Watch back");
    expect(screen.getByRole("tabpanel").querySelector("video source")).toHaveAttribute("src", "/images/courtside/match-review.mp4");
    expect(screen.getByRole("heading", { name: "Find it in My matches." })).toBeVisible();
    expect(screen.getByText(/once the recording has uploaded/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Open the recorded match" })).toHaveAttribute("href", MATCH_SHARE_URL);
    expect(screen.getByRole("link", { name: "Explore the player app demo" })).toHaveAttribute("href", "/rosa-app#page=club");
  });

  it("lets visitors switch between genuine movement and heatmap overlays", () => {
    const { container } = render(<LanguageProvider><CourtsideShare /></LanguageProvider>);
    expect(screen.getByText("rosa.padel")).toBeVisible();
    expect(container.querySelector(".courtside-story-avatar img")).toHaveAttribute("src", rosaIconDark);
    expect(screen.getByRole("img", { name: /movement stats for Tolito/ })).toHaveAttribute("src", "/images/courtside/movement-overlay.png");
    fireEvent.click(screen.getByRole("button", { name: "Heatmap" }));
    expect(screen.getByRole("button", { name: "Heatmap" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: /court presence heatmap/ })).toHaveAttribute("src", "/images/courtside/heatmap-overlay.png");
  });

  it("rotates overlays every four visible seconds and lets visitors pause", () => {
    vi.useFakeTimers();
    let setVisible: (isIntersecting: boolean) => void = () => {};
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) {
        setVisible = (isIntersecting) => callback(
          [{ isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      }
      observe() {}
      disconnect() {}
    });

    const { container } = render(<LanguageProvider><CourtsideShare /></LanguageProvider>);
    const movement = screen.getByRole("button", { name: "Movement" });
    const heatmap = screen.getByRole("button", { name: "Heatmap" });
    const advance = (ms: number) => act(() => { vi.advanceTimersByTime(ms); });
    advance(4000);
    expect(movement).toHaveAttribute("aria-pressed", "true");

    act(() => setVisible(true));
    expect(container.querySelector(".courtside-story-timer")).toHaveStyle({ animationDuration: "4000ms" });
    advance(3999);
    expect(movement).toHaveAttribute("aria-pressed", "true");
    advance(1);
    expect(heatmap).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Pause overlay rotation" }));
    advance(8000);
    expect(heatmap).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector(".courtside-story-timer")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play overlay rotation" }));
    advance(4000);
    expect(movement).toHaveAttribute("aria-pressed", "true");
    act(() => setVisible(false));
    advance(4000);
    expect(movement).toHaveAttribute("aria-pressed", "true");
  });
});
