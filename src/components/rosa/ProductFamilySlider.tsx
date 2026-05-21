import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/rosa/LanguageProvider";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.productFamily;

  function scroll(direction: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 356;
    container.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  }

  return (
    <section ref={ref} className="py-24 md:py-32" id="product-family">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{section.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{section.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">{section.subtitle}</p>
        </motion.div>

        {/* Slider wrapper */}
        <div className="relative">
          {/* Desktop scroll arrows */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            {section.items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex-none w-[320px] md:w-[340px] rounded-2xl border border-border bg-card p-7 space-y-5 hover:border-primary/40 hover:bg-secondary/60 transition-colors duration-200"
              >
                {/* Number + tier */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">{item.num}</span>
                  <span className="px-2 py-0.5 rounded border border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {item.tier}
                  </span>
                </div>

                {/* Name + tagline */}
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold leading-none tracking-tight">{item.name}</h3>
                  <p className="text-base text-muted-foreground">{item.tagline}</p>
                </div>

                {/* Status */}
                <StatusBadge statusType={item.statusType} label={item.status} />

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 rounded-lg border border-border text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  {section.viewProduct} <span aria-hidden>→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
