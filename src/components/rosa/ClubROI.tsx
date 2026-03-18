import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Clock, DollarSign } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "↑", label: "Player Retention", desc: "Smart courts drive higher rebooking and longer player engagement" },
  { icon: Clock, value: "Pro", label: "Match Experience", desc: "Live scoring, replays, and stats that elevate every tournament match" },
  { icon: DollarSign, value: "3+", label: "New Revenue Streams", desc: "Sponsorship displays, analytics subscriptions, premium events" },
];

export default function ClubROI() {
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
          <span className="text-sm font-mono uppercase tracking-widest text-primary">Club ROI</span>
          <h2 className="text-4xl md:text-5xl font-bold">Designed for Padel Players. Built for Clubs.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <span className="text-primary font-semibold">rosa</span> elevates the player experience while helping clubs grow.
            Better engagement, smoother operations, and new revenue opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl inner-glow bg-card space-y-4 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-mono text-4xl font-bold text-primary tabular-nums text-glow">{m.value}</p>
                <p className="font-semibold text-lg">{m.label}</p>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
