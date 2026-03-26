import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Tv, Eye, Check } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function ProductLadder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const icons = [Monitor, Tv, Eye];

  return (
    <section ref={ref} className="py-24 md:py-32" id="products">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{copy.products.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{copy.products.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{copy.products.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {copy.products.items.map((product, i) => {
            const Icon = icons[i] ?? Monitor;

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 space-y-6 transition-shadow duration-300 ${
                  i === 1 ? "bg-card box-glow border border-primary/20" : "bg-card inner-glow"
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                    {copy.products.popular}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{product.tier}</span>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                  </div>
                </div>

                {"status" in product && product.status && (
                  <div className="inline-flex w-fit px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono uppercase tracking-[0.22em]">
                    {product.status}
                  </div>
                )}

                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                {"note" in product && product.note && (
                  <div className="rounded-xl border border-primary/15 bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {product.note}
                  </div>
                )}

                <ul className="space-y-2.5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
