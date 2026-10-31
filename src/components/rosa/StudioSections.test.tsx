import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider } from "./LanguageProvider";
import { EventsShowcase, HardwareCollection } from "./StudioSections";
import ROICalculator from "./ROICalculator";

beforeEach(() => localStorage.setItem("rosa-language", "en"));
afterEach(cleanup);

describe("ROSA studio redesign", () => {
  it("keeps vision before portable and coach separate from the two hardware products", () => {
    const { container } = render(
      <LanguageProvider>
        <HardwareCollection />
      </LanguageProvider>,
    );
    const names = [...container.querySelectorAll(".hardware-row h3")].map(
      (node) => node.textContent,
    );
    expect(names).toEqual(["rosa vision", "rosa portable"]);
    expect(container.querySelector(".coach-line")).toHaveTextContent(
      "In development",
    );
    expect(container.querySelectorAll(".hardware-row")).toHaveLength(2);
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
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Leagues" }), {
      button: 0,
      ctrlKey: false,
    });
    expect(screen.getByRole("link", { name: "Open demo" })).toHaveAttribute(
      "href",
      "/league-tool",
    );
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
