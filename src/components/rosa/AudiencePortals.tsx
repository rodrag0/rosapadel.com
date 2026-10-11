import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Building2, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

const ICONS = [Users, Building2, TrendingUp] as const;

export default function AudiencePortals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.audiencePortals;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/40">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-14 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{section.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold"><BrandText text={section.title} /></h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {section.items.map((item, i) => {
            const Icon = ICONS[i] ?? Users;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col min-h-[280px] rounded-2xl border border-border bg-card p-8 space-y-6 hover:border-primary/40 transition-colors duration-200"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Text */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>

                {/* CTA */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:opacity-80 transition-opacity">
                  <span aria-hidden>→</span> {item.cta}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
