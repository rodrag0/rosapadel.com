import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "./LanguageProvider";
import { EventsShowcase, HardwareCollection } from "./StudioSections";
import ROICalculator from "./ROICalculator";
import HeroSection from "./HeroSection";

vi.mock("./ScrollDepth", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <figure className={className}>{children}</figure>,
}));

beforeEach(() => localStorage.setItem("rosa-language", "en"));
afterEach(cleanup);

describe("ROSA studio redesign", () => {
  it("leads with Vision including streaming, AI and coaching, without a separate Coach product", () => {
    const { container } = render(
      <LanguageProvider>
        <HardwareCollection />
      </LanguageProvider>,
    );
    const names = [...container.querySelectorAll(".hardware-row h3")].map(
      (node) => node.textContent,
    );
    expect(names).toEqual(["rosa vision", "rosa portable"]);
    expect(container.querySelector(".coach-line")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll(".hardware-vision .hardware-features li"),
    ).toHaveLength(8);
    expect(screen.getByText("Livestream with live score")).toBeVisible();
    expect(screen.getByText("AI match analysis")).toBeVisible();
    expect(screen.getByText("Integrated coaching tools")).toBeVisible();
    expect(screen.queryByText("rosa coach")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".hardware-row")).toHaveLength(2);
    expect(screen.getByText(/our connected-court system/)).toBeInTheDocument();
    expect(screen.getByText(/our connected-court system/)).toHaveTextContent(
      "alternative",
    );
    expect(
      screen.queryByText("Automated Tournament Management"),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".hardware-vision img")).toHaveAttribute(
      "src",
      "/images/products/rosa-vision-court.webp",
    );
  });

  it("retains a static product and match path when WebGL is unavailable", () => {
    const { container } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "vision",
    );
    expect(container.querySelector(".cinematic-intro")).toHaveAttribute(
      "data-motion",
      "static",
    );
    expect(container.querySelector(".intro-static-court")).toHaveAttribute(
      "src",
      "/images/products/rosa-vision-court.webp",
    );
    expect(
      screen.getByRole("link", { name: "See a real match" }),
    ).toHaveAttribute("href", "#real-match");
    expect(screen.getByText("Pre-sale")).toBeVisible();
  });

  it("switches between actual software captures and the corresponding working demo links", () => {
    const { container } = render(
      <LanguageProvider>
        <EventsShowcase />
      </LanguageProvider>,
    );
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "href",
      "/tournament-tool",
    );
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Americanos" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "href",
      "/americano-tool",
    );
    expect(
      container.querySelector('[role="tabpanel"][data-state="active"] img'),
    ).toHaveAttribute("src", "/images/software/americanoss.webp");
    expect(screen.getByText(/organizer records the scores/)).toBeVisible();
    expect(
      screen.queryByText(/control desk entering every score/),
    ).not.toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Leagues" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "href",
      "/league-tool",
    );
    expect(
      screen.getByText(/provisional phone scores do not change/),
    ).toBeVisible();
  });

  it("calculates user-selected court revenue without assuming a percentage uplift or a ROSA sale price", () => {
    const { container } = render(
      <LanguageProvider>
        <ROICalculator />
      </LanguageProvider>,
    );
    expect(container.querySelector("output")).toHaveTextContent("2,167");
    fireEvent.change(screen.getByRole("slider", { name: /Extra paid hours/ }), {
      target: { value: "2" },
    });
    expect(container.querySelector("output")).toHaveTextContent("4,333");
    expect(screen.getByText(/not a ROSA price or a forecast/)).toBeVisible();
    expect(screen.queryByText(/25%/)).not.toBeInTheDocument();
  });
});
