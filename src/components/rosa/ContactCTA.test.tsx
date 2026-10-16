import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteCopy } from "@/lib/siteCopy";
import ContactCTA from "./ContactCTA";

vi.mock("./LanguageProvider", () => ({ useLanguage: () => ({ copy: siteCopy.en }) }));
vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const fillReferral = () => {
  fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "  Test Referrer  " } });
  fireEvent.change(screen.getByLabelText(/Your contact phone/), { target: { value: "+52 222 555 0100" } });
  fireEvent.change(screen.getByLabelText(/Club you recommend/), { target: { value: "Test Club" } });
  fireEvent.change(screen.getByLabelText(/Club city and country/), { target: { value: "Puebla, Mexico" } });
};

describe("ContactCTA", () => {
  beforeEach(() => {
    vi.stubGlobal("ResizeObserver", class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: "true" }) }));
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("requires only the four referral fields and consent, without an email address", async () => {
    render(<ContactCTA />);
    expect(screen.getAllByRole("textbox").filter((input) => input.hasAttribute("required"))).toHaveLength(4);
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    fillReferral();
    const submit = screen.getByRole("button", { name: "Send recommendation" });
    expect(submit).toBeDisabled();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(submit);
    await screen.findByText("Recommendation received.");
    const payload = JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ requestType: "referral", name: "Test Referrer", phone: "+52 222 555 0100", club: "Test Club", location: "Puebla, Mexico", administrator: "", administratorPhone: "", website: "" });
    expect(payload).not.toHaveProperty("_replyto");
  });

  it("includes all optional club contact details when provided", async () => {
    render(<ContactCTA />);
    fillReferral();
    fireEvent.change(screen.getByLabelText(/Administrator \/ owner/), { target: { value: "Test Administrator" } });
    fireEvent.change(screen.getByLabelText(/Administrator contact phone/), { target: { value: "+52 (222) 555-0101" } });
    fireEvent.change(screen.getByLabelText(/Club website or Instagram/), { target: { value: "@testclub" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send recommendation" }));
    await screen.findByText("Recommendation received.");
    const payload = JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ administrator: "Test Administrator", administratorPhone: "+52 (222) 555-0101", website: "@testclub" });
  });

  it("rejects whitespace-only names and invalid phones before sending", () => {
    render(<ContactCTA />);
    fillReferral();
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send recommendation" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please complete this required field.");
    expect(screen.getByLabelText(/Full name/)).toHaveFocus();
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Test Referrer" } });
    fireEvent.change(screen.getByLabelText(/Your contact phone/), { target: { value: "hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send recommendation" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid phone number");
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([null, { success: false }])("keeps the filled form when the processor does not confirm success (%s)", async (result) => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => result } as Response);
    render(<ContactCTA />);
    fillReferral();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send recommendation" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Send recommendation" })).toBeEnabled());
    expect(screen.queryByText("Recommendation received.")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveValue("  Test Referrer  ");
  });

  it("preserves the separate demo request and its reply-to email", async () => {
    render(<ContactCTA />);
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Book a Demo" }), { button: 0, ctrlKey: false });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test Club Manager" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "manager@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Book a Demo" }));
    await screen.findByText("We'll be in touch!");
    const payload = JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ requestType: "demo", email: "manager@example.com", _replyto: "manager@example.com" });
    expect(payload).not.toHaveProperty("club");
  });
});
