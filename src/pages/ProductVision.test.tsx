import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductVision from "./ProductVision";

vi.mock("@/components/rosa/Navbar", () => ({ default: () => null }));
vi.mock("@/components/rosa/Footer", () => ({ default: () => null }));
vi.mock("@/components/rosa/ContactCTA", () => ({ default: () => null }));

afterEach(cleanup);

describe("rosa vision match sample", () => {
  it("uses the retained Final Expo preview and poster without signed playback URLs", () => {
    render(<ProductVision />);
    const video = screen.getByLabelText("Final Expo 2026 match preview: Tolito / Mati vs Argañaras / Pablo");
    expect(video.tagName).toBe("VIDEO");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("poster", "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-6cb993f3d3ea.webp");
    expect(video.querySelector("source")).toHaveAttribute("src", "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/preview-b450dc716753.mp4");
    expect(video.querySelector("source")).toHaveAttribute("type", "video/mp4");
  });

  it("labels the correct match and links the CTA to its public share page", () => {
    render(<ProductVision />);
    expect(screen.getByText("Tolito / Mati vs Argañaras / Pablo")).toBeVisible();
    expect(screen.getByText("Final Expo 2026 · 18 October 2026 · Match preview")).toBeVisible();
    const link = screen.getByRole("link", { name: "Open preview" });
    expect(link).toHaveAttribute("href", "https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText("Crosio / Kloster vs Alem / Almada")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Watch the recorded match" })).not.toBeInTheDocument();
  });

  it("uses native playback without duplicate score or sponsor overlays", () => {
    const { container } = render(<ProductVision />);
    expect(container.querySelectorAll("#match-preview video")).toHaveLength(1);
    expect(container.querySelector("#match-preview iframe")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open the Final Expo 2026 match" })).toHaveAttribute("href", "https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384");
    expect(container.querySelector("#match-preview")).not.toHaveTextContent("YOUR SPONSOR HERE");
  });
});
