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
    const names = container.querySelectorAll(".hardware-row h3");
    expect(names[0]).toHaveAccessibleName("rosa vision");
    expect(names[1]).toHaveAccessibleName("rosa portable");
    expect(container.querySelectorAll(".hardware-wordmark[alt='rosa']")).toHaveLength(2);
    expect(container.querySelector(".coach-line")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('.hardware-vision [role="tab"]'),
    ).toHaveLength(8);
    expect(
      screen.getByRole("tab", { name: "Livestream with live score" }),
    ).toBeVisible();
    expect(
      screen.getByRole("tab", { name: "AI match analysis" }),
    ).toBeVisible();
    expect(
      screen.getByRole("tab", { name: "Integrated coaching tools" }),
    ).toBeVisible();
    expect(screen.queryByText("rosa coach")).not.toBeInTheDocument();
    expect(container.querySelectorAll(".hardware-row")).toHaveLength(2);
    expect(screen.getByText(/our connected-court system/)).toBeInTheDocument();
    expect(screen.getByText(/our connected-court system/)).toHaveTextContent(
      "alternative",
    );
    expect(
      screen.queryByText("Automated Tournament Management"),
    ).not.toBeInTheDocument();
    expect(container.querySelector(".vision-media-stage img")).toHaveAttribute(
      "src",
      "/images/products/rosa-vision-court.webp",
    );
  });

  it("shows the VAR control demo and the current player app in their feature tabs", () => {
    const { container } = render(
      <LanguageProvider>
        <HardwareCollection />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Video review & VAR" }));
    const review = container.querySelector('[data-media="var"] video');
    expect(review).toHaveAttribute("poster", "/images/courtside/var-controls.webp");
    expect(review?.querySelector("source")).toHaveAttribute(
      "src",
      "/images/courtside/var-controls.mp4",
    );
    expect(screen.getByText(/where gesture detection is enabled/i)).toBeVisible();

    fireEvent.click(screen.getByRole("tab", { name: "Player app, clips & reports" }));
    expect(container.querySelector('[data-media="players"] img')).toHaveAttribute(
      "src",
      "/images/courtside/player-app-current.webp",
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

  it("keeps separate hourly rates for MXN, EUR and USD and excludes sponsorship income", () => {
    const { container } = render(
      <LanguageProvider>
        <ROICalculator />
      </LanguageProvider>,
    );
    const monthly = container.querySelector("output");
    expect(screen.getByRole("radio", { name: "MXN" })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "EUR" }));
    expect(monthly).toHaveTextContent("€108");
    fireEvent.change(screen.getByRole("slider", { name: /Court-hour revenue \(EUR\)/ }), {
      target: { value: "60" },
    });
    expect(monthly).toHaveTextContent("€260");
    fireEvent.click(screen.getByRole("radio", { name: "USD" }));
    expect(monthly).toHaveTextContent("$130");
    fireEvent.click(screen.getByRole("radio", { name: "MXN" }));
    expect(monthly).toHaveTextContent("MX$2,167");
    fireEvent.click(screen.getByRole("radio", { name: "EUR" }));
    expect(monthly).toHaveTextContent("€260");
    expect(screen.getByText("Sponsorship income is not included.")).toBeVisible();
  });
});
