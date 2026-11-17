import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/components/rosa/LanguageProvider";
import ProductPortable from "./ProductPortable";
import ForClubs from "./ForClubs";
import Investors from "./Investors";
import NewTab from "./NewTab";
import LegalPageLayout, { LegalSection } from "@/components/rosa/LegalPageLayout";

vi.mock("@/components/rosa/Navbar", () => ({ default: () => null }));
vi.mock("@/components/rosa/Footer", () => ({ default: () => null }));
vi.mock("@/components/rosa/ContactCTA", () => ({ default: () => <div id="contact">Contact form</div> }));
vi.mock("@/components/rosa/ScrollDepth", () => ({
  default: ({ children }: { children: React.ReactNode }) => <figure>{children}</figure>,
}));

beforeEach(() => {
  localStorage.setItem("rosa-language", "en");
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const wrap = (page: React.ReactNode) => render(<LanguageProvider>{page}</LanguageProvider>);

describe("Courtside detail pages", () => {
  it.each(["en", "es", "de"])("keeps Portable distinct from Vision in %s", (language) => {
    localStorage.setItem("rosa-language", language);
    const { container } = wrap(<ProductPortable />);
    expect(screen.getByRole("heading", { level: 1, name: "rosa portable" })).toBeVisible();
    expect(container.querySelectorAll(".detail-capabilities article")).toHaveLength(4);
    expect(container.querySelector(".detail-hero-photo")).toHaveAttribute("src", "/images/products/rosa-portable.webp");
    expect(container.querySelectorAll('a[href="/products/vision"]')).toHaveLength(2);
    expect(container.querySelector(".detail-hero video")).not.toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("retains the hardware-payback exclusions and all currency options", () => {
    wrap(<ForClubs />);
    expect(screen.getByText(/could cover your/)).toBeVisible();
    fireEvent.click(screen.getByText("Estimate assumptions"));
    expect(screen.getByText(/TV, installation, taxes and software subscriptions are excluded/)).toBeInTheDocument();
    expect(screen.getByText("Sponsorship income is not included.")).toBeVisible();
    for (const name of ["MXN", "EUR", "USD"]) expect(screen.getByRole("radio", { name })).toBeInTheDocument();
  });

  it("preserves the investor inquiry and actual founder portraits", () => {
    const { container } = wrap(<Investors />);
    expect(container.querySelectorAll(".team-grid article img")).toHaveLength(3);
    for (const name of ["Rodrigo Ponce", "Leandro Ponce", "Saul Ortiz de la Tejera"]) {
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
    }
    fireEvent.click(screen.getAllByRole("button", { name: /Get in touch/ })[0]);
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByLabelText("Email")).toBeVisible();
  });

  it("switches all three competition screenshots and demo links without changing result rules", () => {
    wrap(<NewTab />);
    expect(screen.getByRole("heading", { level: 1, name: "Padel tournaments & events" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute("href", "/tournament-tool");
    const select = (name: string) => fireEvent.mouseDown(screen.getByRole("tab", { name }), { button: 0, ctrlKey: false });
    select("Americanos");
    expect(screen.getByText(/organizer records the scores/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute("href", "/americano-tool");
    select("Leagues");
    expect(screen.getByText(/provisional phone scores do not change/)).toBeVisible();
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute("href", "/league-tool");
  });

  it("keeps legal wording and dates in the document layout", () => {
    wrap(<LegalPageLayout title="Privacy" description="Original notice" documentTitle="ROSA Privacy">
      <LegalSection title="Data handling"><p>Original legal content</p></LegalSection>
    </LegalPageLayout>);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy" })).toBeVisible();
    expect(screen.getByText("Original legal content")).toBeVisible();
    expect(screen.getByText(/2026-03-19/)).toBeVisible();
  });
});
