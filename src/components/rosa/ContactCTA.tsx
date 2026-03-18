import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  organization: z.string().trim().max(200).optional(),
  objective: z.string().max(100).optional(),
});

export default function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const parsed = formSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("org"),
      objective: formData.get("objective"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    let success = false;

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@rosapadel.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          organization: parsed.data.organization || "",
          objective: parsed.data.objective || "",
          _subject: "ROSA Demo Request",
          _template: "table",
          _captcha: "false",
          _replyto: parsed.data.email,
        }),
      });

      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      success = response.ok && result?.success !== false && result?.success !== "false";
    } catch {
      success = false;
    } finally {
      setSubmitting(false);
    }

    if (!success) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    form.reset();
    setAgreed(false);
    setSubmitted(true);
    toast.success("Thanks! We'll be in touch soon.");
  };

  return (
    <section ref={ref} className="py-24 md:py-32" id="contact">
      <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Upgrade Your <span className="text-primary text-glow">Facility</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get in touch to see <span className="text-primary font-semibold">rosa</span> in action. We'll walk you through the right tier for your club.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="p-12 rounded-2xl inner-glow bg-card text-center space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">{"\u2713"}</span>
            </div>
            <h3 className="text-2xl font-bold">We'll be in touch!</h3>
            <p className="text-muted-foreground">
              Thanks for your interest. Our team will reach out shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            className="space-y-6 p-8 rounded-2xl inner-glow bg-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" className="bg-secondary border-border" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@club.com" className="bg-secondary border-border" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="org">Club / Organization</Label>
              <Input id="org" name="org" placeholder="Your club or organization name" className="bg-secondary border-border" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">What are you looking for?</Label>
              <select
                id="objective"
                name="objective"
                className="flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select an option</option>
                <option value="scoring">Automated Scoring</option>
                <option value="tournaments">Tournament Experience</option>
                <option value="analytics">Player Analytics & Replay</option>
                <option value="full">Full Smart Court Setup</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(c) => setAgreed(!!c)}
                className="mt-0.5"
              />
              <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the processing of my data as outlined in the Privacy Policy.
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!agreed || submitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 box-glow h-12 text-base"
            >
              {submitting ? "Submitting..." : "Book a Demo"}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
