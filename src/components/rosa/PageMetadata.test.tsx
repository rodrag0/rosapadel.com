import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Link, MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "./LanguageProvider";
import PageMetadata from "./PageMetadata";

beforeEach(() => { document.head.innerHTML = ""; localStorage.clear(); });
afterEach(cleanup);

describe("metadata across client navigation", () => {
  it("restores indexing when moving from a shared match to a product", async () => {
    render(<LanguageProvider><MemoryRouter initialEntries={["/match-session/matchi-live-score"]}>
      <PageMetadata /><Link to="/products/vision">View vision</Link>
    </MemoryRouter></LanguageProvider>);
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    fireEvent.click(screen.getByText("View vision"));
    await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.rosapadel.com/products/vision"));
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    expect(document.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(document.title).toContain("Scoring, Video and Replay");
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute("content", "https://www.rosapadel.com/products/vision");
  });
  it("removes a stale canonical for an unknown route", async () => {
    render(<LanguageProvider><MemoryRouter initialEntries={["/products/portable"]}>
      <PageMetadata /><Link to="/missing-page">Missing page</Link>
    </MemoryRouter></LanguageProvider>);
    fireEvent.click(screen.getByText("Missing page"));
    await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toBeNull());
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  });
});
