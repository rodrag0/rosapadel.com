import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import InvestorContactDialog from "./InvestorContactDialog";

function openAndFill() {
  render(<InvestorContactDialog />);
  fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));
  fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "  Test Investor  " } });
  fireEvent.change(screen.getByLabelText("Email", { exact: true }), { target: { value: "investor@example.com" } });
  fireEvent.change(screen.getByLabelText("Your inquiry"), { target: { value: "I'd like to discuss a partnership." } });
}

describe("InvestorContactDialog", () => {
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
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("opens the inquiry form without launching an email application", () => {
    openAndFill();
    expect(screen.getByRole("dialog", { name: "Let's talk." })).toBeVisible();
    expect(screen.getByText("Get in touch").tagName).toBe("BUTTON");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("requires consent and sends investor inquiries with a reply-to email", async () => {
    openAndFill();
    const button = screen.getByRole("button", { name: "Send inquiry" });
    expect(button).toBeDisabled();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(button);
    await screen.findByText("Inquiry received.");
    const payload = JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ requestType: "investor", name: "Test Investor", email: "investor@example.com", organization: "", message: "I'd like to discuss a partnership.", _replyto: "investor@example.com" });
    expect(payload).not.toHaveProperty("club");
  });

  it("rejects whitespace-only inquiries and focuses the invalid field", () => {
    openAndFill();
    fireEvent.change(screen.getByLabelText("Your inquiry"), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Tell us a little about your inquiry.");
    expect(screen.getByLabelText("Your inquiry")).toHaveFocus();
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([null, { success: false }])("preserves the inquiry when the processor does not confirm success (%s)", async (result) => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => result } as Response);
    openAndFill();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Your inquiry")).toHaveValue("I'd like to discuss a partnership.");
    expect(screen.getByRole("button", { name: "Send inquiry" })).toBeEnabled();
    expect(screen.queryByText("Inquiry received.")).not.toBeInTheDocument();
  });

  it("shows a retry state on a network failure", async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError("Failed to fetch"));
    openAndFill();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please try again or email"));
    expect(screen.getByLabelText("Full name")).toHaveValue("  Test Investor  ");
  });

  it("stops waiting after 15 seconds without discarding the inquiry", async () => {
    vi.mocked(fetch).mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    }));
    openAndFill();
    fireEvent.click(screen.getByRole("checkbox"));
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    await act(async () => { await vi.advanceTimersByTimeAsync(15000); });
    expect(screen.getByRole("alert")).toHaveTextContent("Please try again or email");
    expect(screen.getByLabelText("Your inquiry")).toHaveValue("I'd like to discuss a partnership.");
  });
});
