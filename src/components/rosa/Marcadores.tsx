import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Zap, Users, Timer } from "lucide-react";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

// Same order as `gameModes.items` in siteCopy: normal, quick-match, league-mode, americana
const ICONS = [Trophy, Zap, Users, Timer] as const;

export default function Scoreboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.gameModes;

  return (
    <section id="scoreboard" ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-14 space-y-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{section.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold"><BrandText text={section.title} /></h2>
          <p className="text-muted-foreground leading-relaxed">{section.description}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {section.items.map((item, i) => {
            const Icon = ICONS[i] ?? Trophy;
            const rounds = "rounds" in item ? item.rounds : null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col min-h-[280px] rounded-2xl border border-border bg-card p-8 space-y-6 hover:border-primary/40 transition-colors duration-200"
              >
                {/* Icon + index */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>

                {/* Rounds (League Mode only) */}
                {rounds && (
                  <ul className="space-y-1.5 border-t border-border pt-4">
                    {rounds.map((round) => (
                      <li key={round} className="text-sm font-mono text-primary">
                        {round}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}