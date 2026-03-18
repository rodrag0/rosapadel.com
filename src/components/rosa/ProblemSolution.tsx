import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Film, BarChart3 } from "lucide-react";



export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* The Gap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">The Gap</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Basic scoring apps can't keep up. Pro systems cost a fortune.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Padel clubs are stuck choosing between unreliable free apps and
              expensive broadcast-grade setups designed for pro tours. Players
              get no analytics. Clubs miss revenue. Tournaments stay manual.
            </p>
          </motion.div>

          {/* Rosa fills it */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">rosa fills it</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              A modular smart padel court system that works on any budget.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Start with LED scoring, scale to HD replay and AI-powered
              vision analytics. Every tier is designed to give players a
              professional experience from the first match.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { icon: Target, label: "Live Scoring", desc: "Real-time score on court for every point" },
            { icon: Film, label: "Video Output", desc: "Full match video with score overlay and set stats" },
            { icon: BarChart3, label: "Match Insights", desc: "Heatmaps, shot breakdown, and player analytics" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center space-y-3 p-8 rounded-2xl inner-glow bg-card">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-semibold text-lg">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
