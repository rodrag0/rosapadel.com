import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProductVision from "./ProductVision";

vi.mock("@/components/rosa/Navbar", () => ({ default: () => null }));
vi.mock("@/components/rosa/Footer", () => ({ default: () => null }));
vi.mock("@/components/rosa/ContactCTA", () => ({ default: () => null }));

afterEach(cleanup);

describe("rosa vision match sample", () => {
  it("uses an owned Invicto preview and poster without expiring playback URLs", () => {
    render(<ProductVision />);
    const video = screen.getByLabelText("Invicto match preview: Crosio / Kloster vs Alem / Almada");
    expect(video.tagName).toBe("VIDEO");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("poster", "https://cloud.rosapadel.com/media/invicto-20261025/poster-b5238bdc7f05.webp");
    expect(video.querySelector("source")).toHaveAttribute("src", "https://cloud.rosapadel.com/media/invicto-20261025/preview-a2ab3377007c.mp4");
    expect(video.querySelector("source")).toHaveAttribute("type", "video/mp4");
  });

  it("clearly labels the sample and exposes a direct stable preview link", () => {
    render(<ProductVision />);
    expect(screen.getByText("Invicto · 25 October 2026 · Match preview")).toBeVisible();
    expect(screen.getByRole("link", { name: "Open preview" })).toHaveAttribute("href", "https://cloud.rosapadel.com/media/invicto-20261025/preview-a2ab3377007c.mp4");
    expect(screen.queryByRole("link", { name: "Watch the recorded match" })).not.toBeInTheDocument();
  });
});
