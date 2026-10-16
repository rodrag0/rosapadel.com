import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Brain } from "lucide-react";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

function StatusBadge({ statusType, label }: { statusType: string; label: string }) {
  const colorMap: Record<string, { dot: string; badge: string }> = {
    available: {
      dot: "bg-green-500",
      badge: "border-green-500/30 bg-green-500/10 text-green-400",
    },
    pilot: {
      dot: "bg-yellow-400",
      badge: "border-yellow-400/30 bg-yellow-400/10 text-yellow-400",
    },
    coming: {
      dot: "bg-muted-foreground/40",
      badge: "border-border bg-secondary text-muted-foreground",
    },
  };

  const colors = colorMap[statusType] ?? colorMap.coming;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-[0.18em] ${colors.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
      {label}
    </span>
  );
}

export default function ProductFamilySlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.productFamily;

  return (
    <section ref={ref} className="py-24 md:py-32" id="products">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">
            <BrandText text={section.label} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">{section.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            <BrandText text={section.subtitle} />
          </p>
        </motion.div>

        {/* Product columns: 1 column on mobile, 2 columns from md up */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {section.items.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-secondary/60 transition-colors duration-200"
            >
              {/* Info */}
              <div className="flex flex-1 flex-col space-y-6 p-8 md:p-10">
                {/* Number + tier */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-muted-foreground/60 tabular-nums">{item.num}</span>
                  <span className="px-2.5 py-1 rounded border border-border text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                    {item.tier}
                  </span>
                </div>

                {/* Name + tagline */}
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold leading-none tracking-tight">
                    <BrandText text={item.name} />
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground">{item.tagline}</p>
                </div>

                {/* Status */}
                <StatusBadge statusType={item.statusType} label={item.status} />

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-base font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  {section.viewProduct} <span aria-hidden>→</span>
                </a>
              </div>

              <div className="px-8 pb-8 md:px-10 md:pb-10">
                {item.href === "/products/vision" ? (
                  <img src="/images/products/rosa-vision-court.webp" alt={item.name} width="1600" height="900" loading="lazy" decoding="async" className="aspect-video w-full rounded-lg object-contain" />
                ) : (
                  <div className="aspect-[16/10] w-full rounded-lg border border-dashed border-border bg-secondary/30" aria-hidden />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 items-start gap-6 border-t border-border pt-8 md:grid-cols-[auto_1fr_auto]" data-product-layer="ai">
          <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground">{section.aiLayer.tier} · {section.aiLayer.status}</p>
            <h3 className="text-2xl font-bold"><BrandText text={section.aiLayer.name} /></h3>
            <p className="max-w-2xl leading-relaxed text-muted-foreground"><BrandText text={section.aiLayer.body} /></p>
          </div>
          <a href={section.aiLayer.href} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <BrandText text={section.aiLayer.cta} /><ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
