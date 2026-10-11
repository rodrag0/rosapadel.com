import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function ClubROI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const icons = [TrendingUp, Clock, DollarSign];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{copy.clubRoi.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{copy.clubRoi.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{copy.clubRoi.body}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {copy.clubRoi.metrics.map((metric, i) => {
            const Icon = icons[i] ?? TrendingUp;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl inner-glow bg-card space-y-4 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-mono text-4xl font-bold text-primary tabular-nums text-glow">{metric.value}</p>
                <p className="font-semibold text-lg">{metric.label}</p>
                <p className="text-sm text-muted-foreground">{metric.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
