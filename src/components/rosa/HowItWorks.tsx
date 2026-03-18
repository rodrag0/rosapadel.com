import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Play, BarChart3 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Wrench,
    title: "Deploy on Court",
    description: "Core LED is plug-and-play — set it up on any padel court in under a minute. HD and Vision tiers are just as easy, no additional infrastructure needed.",
  },
  {
    num: "02",
    icon: Play,
    title: "Run Live Matches",
    description: "Players see real-time scoring. Spectators get clear visibility. Tournaments run without downtime.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Review & Improve",
    description: "Access instant replay, heatmaps, shot analytics, and match summaries. Share highlights directly.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold">Three Steps to Smart</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
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
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
