import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
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
