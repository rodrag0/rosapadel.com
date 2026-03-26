import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users, Monitor, Zap } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Tournaments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const icons = [Monitor, Trophy, Users, Zap];

  return (
    <section ref={ref} className="py-24 md:py-32" id="tournaments">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{copy.tournaments.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{copy.tournaments.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{copy.tournaments.body}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {copy.tournaments.benefits.map((benefit, i) => {
            const Icon = icons[i] ?? Monitor;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl inner-glow bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 p-8 rounded-2xl inner-glow bg-card text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono uppercase tracking-[0.22em]">
              {copy.tournaments.futureLabel}
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
            <Monitor className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">{copy.tournaments.highlightTitle}</h3>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {copy.tournaments.highlightBody}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
