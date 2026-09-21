import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Play, BarChart3, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";

const MATCH_DEMO_URL = "https://rosa-match-demo.vercel.app/";

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const icons = [Wrench, Play, BarChart3];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{copy.howItWorks.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{copy.howItWorks.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {copy.howItWorks.steps.map((step, i) => {
            const Icon = icons[i] ?? Wrench;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative space-y-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-5xl font-black text-primary/20">{step.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed"><BrandText text={step.description} /></p>

                {i < copy.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Button asChild variant="outline" className="border-primary/30 hover:border-primary">
            <a href={MATCH_DEMO_URL} target="_blank" rel="noopener noreferrer">
              {copy.howItWorks.demoLabel}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{copy.howItWorks.demoNote}</p>
        </div>
      </div>
    </section>
  );
}
