import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";

type ContactMode = "referral" | "demo";

const referralFields = [
  { name: "name", required: true, type: "text", autoComplete: "name" },
  { name: "phone", required: true, type: "tel", autoComplete: "tel" },
  { name: "club", required: true, type: "text", autoComplete: "off" },
  { name: "location", required: true, type: "text", autoComplete: "off" },
  { name: "administrator", required: false, type: "text", autoComplete: "off" },
  { name: "administratorPhone", required: false, type: "tel", autoComplete: "off" },
  { name: "website", required: false, type: "text", autoComplete: "off" },
] as const;

export default function ContactCTA() {
  const { copy, language } = useLanguage();
  const contact = copy.contact;
  const referral = contact.referral;
  const [mode, setMode] = useState<ContactMode>("referral");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formSchema = useMemo(() => {
    const phone = z.string().trim().max(40).refine(
      (value) => /^[+\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 7,
      referral.phoneError,
    );
    const required = z.string().trim().min(1, referral.requiredError).max(200);

    return z.discriminatedUnion("requestType", [
      z.object({
        requestType: z.literal("referral"),
        name: required.max(100),
        phone,
        club: required,
        location: required,
        administrator: z.string().trim().max(100),
        administratorPhone: z.string().trim().pipe(z.union([z.literal(""), phone])),
        website: z.string().trim().max(200),
      }),
      z.object({
        requestType: z.literal("demo"),
        name: z.string().trim().min(1, contact.validation.nameRequired).max(100),
        email: z.string().trim().email(contact.validation.emailInvalid).max(255),
        organization: z.string().trim().max(200),
        objective: z.enum(["", "scoring", "tournaments", "analytics", "full", "other"]),
      }),
    ]);
  }, [contact.validation, referral.phoneError, referral.requiredError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed || submitting) return;

    const form = event.currentTarget;
    const parsed = formSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.errors.map((error) => [error.path[0], error.message])));
      const firstError = parsed.error.errors[0];
      const input = form.elements.namedItem(String(firstError.path[0]));
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    let success = false;
    const data = parsed.data;

    try {
      // Both request types use the existing lead processor, not an automated payout system.
      const response = await fetch("https://formsubmit.co/ajax/info@rosapadel.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          ...(data.requestType === "demo" ? { _replyto: data.email } : {}),
          _subject: data.requestType === "referral" ? "rosa vision - Club Referral" : "rosa Demo Request",
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      success = response.ok && (result?.success === true || result?.success === "true");
    } catch {
      success = false;
    } finally {
      setSubmitting(false);
    }

    if (!success) {
      toast.error(contact.messages.genericError);
      return;
    }

    form.reset();
    setAgreed(false);
    setSubmitted(true);
  };

  const changeMode = (value: string) => {
    setMode(value as ContactMode);
    setErrors({});
    setAgreed(false);
    setSubmitted(false);
  };

  const tabClassName = "min-h-12 min-w-0 flex-1 whitespace-normal rounded-none border-b-2 border-transparent px-2 py-3 leading-snug data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none";

  return (
    <section className="studio-section studio-contact">
      <div className="studio-container contact-layout">
        <div className="contact-intro">
          <h2>{{ en: "Let's talk padel.", es: "Hablemos de pádel.", de: "Sprechen wir über Padel." }[language]}</h2>
          <p>{{ en: "Tell us about your club. We'll help you find the right ROSA setup for your courts and community.", es: "Cuéntanos sobre tu club. Te ayudamos a encontrar la configuración ROSA para tus canchas y tu comunidad.", de: "Erzähl uns von deinem Club. Gemeinsam finden wir die passende ROSA-Konfiguration für deine Courts und deine Community." }[language]}</p>
          <a href="mailto:info@rosapadel.com" className="studio-link">info@rosapadel.com</a>
        </div>
        <Tabs id="contact" value={mode} onValueChange={changeMode} className="scroll-mt-24">
          <TabsList aria-label={contact.modeLabel} className="mb-8 flex h-auto w-full rounded-none border-b border-border bg-transparent p-0">
            <TabsTrigger value="referral" disabled={submitting} className={tabClassName}>{referral.tab}</TabsTrigger>
            <TabsTrigger value="demo" disabled={submitting} className={tabClassName}>{contact.submit}</TabsTrigger>
          </TabsList>

          {(["referral", "demo"] as const).map((formMode) => (
            <TabsContent key={formMode} value={formMode} className="mt-0 space-y-8">
              {submitted ? (
                <div role="status" className="space-y-4 py-8">
                  <h2 className="text-3xl font-bold">{formMode === "referral" ? referral.successTitle : contact.successTitle}</h2>
                  <p className="text-muted-foreground">{formMode === "referral" ? referral.successBody : contact.successBody}</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    {formMode === "referral" ? referral.another : contact.submit}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h2 id={`contact-title-${formMode}`} className="text-3xl font-bold leading-tight md:text-4xl">
                      {formMode === "referral" ? (
                        <>{referral.title}<span className="text-primary">{referral.accent}</span></>
                      ) : `${contact.title}${contact.accent}`}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      <BrandText text={formMode === "referral" ? referral.body : contact.body} />
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} onChange={() => setErrors({})} aria-labelledby={`contact-title-${formMode}`} className="space-y-6">
                    <input type="hidden" name="requestType" value={formMode} />
                    {formMode === "referral" && <p className="text-sm">{referral.instructions}</p>}

                    <fieldset disabled={submitting} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                      {formMode === "referral" ? referralFields.map((field) => (
                        <div key={field.name} className={`min-w-0 space-y-2 ${field.name === "website" ? "sm:col-span-2" : ""}`}>
                          <Label htmlFor={`contact-${field.name}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-2 leading-snug sm:min-h-10">
                            <span>{referral.fields[field.name]}</span>
                            <span className="text-xs font-normal text-muted-foreground">{field.required ? referral.required : referral.optional}</span>
                          </Label>
                          <Input
                            id={`contact-${field.name}`}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            maxLength={field.type === "tel" ? 40 : field.name === "name" || field.name === "administrator" ? 100 : 200}
                            required={field.required}
                            aria-invalid={!!errors[field.name]}
                            aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                            className="h-12 bg-background text-base"
                          />
                          {errors[field.name] && <p id={`contact-${field.name}-error`} role="alert" className="text-sm text-destructive">{errors[field.name]}</p>}
                        </div>
                      )) : (
                        <>
                          {[
                            { name: "name", label: contact.fields.name, type: "text", required: true, autoComplete: "name", maxLength: 100 },
                            { name: "email", label: contact.fields.email, type: "email", required: true, autoComplete: "email", maxLength: 255 },
                            { name: "organization", label: contact.fields.organization, type: "text", required: false, autoComplete: "organization", maxLength: 200 },
                          ].map((field) => (
                            <div key={field.name} className={`min-w-0 space-y-2 ${field.name === "organization" ? "sm:col-span-2" : ""}`}>
                              <Label htmlFor={`contact-${field.name}`}>{field.label}</Label>
                              <Input id={`contact-${field.name}`} name={field.name} type={field.type} required={field.required} autoComplete={field.autoComplete} maxLength={field.maxLength} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined} className="h-12 bg-background text-base" />
                              {errors[field.name] && <p id={`contact-${field.name}-error`} role="alert" className="text-sm text-destructive">{errors[field.name]}</p>}
                            </div>
                          ))}
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="contact-objective">{contact.fields.objective}</Label>
                            <select id="contact-objective" name="objective" className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="">{contact.fields.objectivePlaceholder}</option>
                              {Object.entries(contact.objectives).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                            </select>
                          </div>
                        </>
                      )}
                    </fieldset>

                    {formMode === "referral" && <p className="text-xs leading-relaxed text-muted-foreground">{referral.contactNote}</p>}
                    <div className="flex items-start gap-3">
                      <Checkbox id="contact-privacy" checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)} disabled={submitting} className="mt-0.5" />
                      <Label htmlFor="contact-privacy" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                        {contact.consentPrefix}
                        <a href="/privacy-policy" className="text-primary underline underline-offset-4">{contact.consentLink}</a>
                        {contact.consentSuffix}
                      </Label>
                    </div>

                    <Button type="submit" size="lg" disabled={!agreed || submitting} className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90">
                      {submitting ? contact.submitting : formMode === "referral" ? referral.submit : contact.submit}
                    </Button>
                  </form>
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
