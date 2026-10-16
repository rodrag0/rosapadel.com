import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  organization: z.string().trim().max(200),
  message: z.string().trim().min(1, "Tell us a little about your inquiry.").max(4000),
});

export default function InvestorContactDialog() {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed || submitting) return;
    const form = event.currentTarget;
    const parsed = inquirySchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.errors.map((error) => [error.path[0], error.message])));
      const input = form.elements.namedItem(String(parsed.error.errors[0].path[0]));
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setErrors({});
    setSendError("");
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@rosapadel.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...parsed.data,
          requestType: "investor",
          _replyto: parsed.data.email,
          _subject: "rosa - Investor, Partner or Distributor Inquiry",
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      if (!response.ok || (result?.success !== true && result?.success !== "true")) throw new Error("Inquiry not confirmed");
      form.reset();
      setAgreed(false);
      setSubmitted(true);
    } catch {
      setSendError("Your inquiry could not be sent. Please try again or email rodrigo@rosapadel.com.");
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (submitting) return;
      setOpen(value);
      if (!value) {
        setAgreed(false);
        setSubmitted(false);
        setErrors({});
        setSendError("");
      }
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="h-12 rounded-lg px-8 text-base">Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-11/12 overflow-y-auto rounded-lg sm:p-8">
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="text-2xl leading-tight">{submitted ? "Inquiry received." : "Let's talk."}</DialogTitle>
          <DialogDescription>{submitted ? "Thank you. Our team will follow up with you by email." : "For investors, partners and distributors. Tell us how you'd like to work together."}</DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div role="status" className="flex items-center gap-3 py-8">
            <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
            <p className="text-sm">Your inquiry has been sent to our team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onChange={() => { setErrors({}); setSendError(""); }} aria-label="Investor inquiry" className="space-y-6">
            <fieldset disabled={submitting} className="space-y-4">
              {[
                { name: "name", label: "Full name", type: "text", autoComplete: "name", required: true, maxLength: 100 },
                { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, maxLength: 255 },
                { name: "organization", label: "Organization (optional)", type: "text", autoComplete: "organization", required: false, maxLength: 200 },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={`investor-${field.name}`}>{field.label}</Label>
                  <Input id={`investor-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required={field.required} maxLength={field.maxLength} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `investor-${field.name}-error` : undefined} className="h-12 text-base" />
                  {errors[field.name] && <p id={`investor-${field.name}-error`} role="alert" className="text-sm text-destructive">{errors[field.name]}</p>}
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="investor-message">Your inquiry</Label>
                <Textarea id="investor-message" name="message" required maxLength={4000} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "investor-message-error" : undefined} className="text-base" />
                {errors.message && <p id="investor-message-error" role="alert" className="text-sm text-destructive">{errors.message}</p>}
              </div>
            </fieldset>
            <div className="flex items-start gap-3">
              <Checkbox id="investor-privacy" checked={agreed} onCheckedChange={(value) => setAgreed(value === true)} disabled={submitting} className="mt-0.5" />
              <Label htmlFor="investor-privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">
                I agree to the <a href="/privacy-policy" className="text-primary underline underline-offset-4">privacy policy</a> and consent to being contacted about this inquiry.
              </Label>
            </div>
            {sendError && <p role="alert" className="text-sm text-destructive">{sendError}</p>}
            <Button type="submit" disabled={!agreed || submitting} className="h-12 w-full text-base">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {submitting ? "Sending..." : "Send inquiry"}
            </Button>
          </form>
        )}
        <a href="mailto:rodrigo@rosapadel.com" className="break-all text-sm text-muted-foreground underline underline-offset-4">rodrigo@rosapadel.com</a>
      </DialogContent>
    </Dialog>
  );
}
