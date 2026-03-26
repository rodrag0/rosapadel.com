import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Play, History, Share2, MonitorPlay, Users, Clapperboard, Layers3 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function VisionEcosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.visionEcosystem;
  const playerIcons = [Camera, Play, History, Share2];
  const clubIcons = [MonitorPlay, Users, Clapperboard, Layers3];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/40">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-primary">{section.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold">{section.title}</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{section.body}</p>
          <div className="flex justify-center">
            <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-[0.24em] rounded-full border border-primary/20 bg-primary/10 text-primary">
              {section.status}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] bg-card inner-glow p-8 md:p-10 space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-mono uppercase tracking-widest text-primary">{section.playerTitle}</p>
              <h3 className="text-3xl font-bold leading-tight">{section.playerBody}</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {section.playerItems.map((item, index) => {
                const Icon = playerIcons[index] ?? Camera;

                return (
                  <div key={item.title} className="rounded-2xl bg-secondary/60 border border-border p-5 space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-background/70 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] bg-card inner-glow p-8 md:p-10 space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-mono uppercase tracking-widest text-primary">{section.clubTitle}</p>
              <h3 className="text-3xl font-bold leading-tight">{section.clubBody}</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {section.clubItems.map((item, index) => {
                const Icon = clubIcons[index] ?? MonitorPlay;

                return (
                  <div key={item.title} className="rounded-2xl bg-secondary/60 border border-border p-5 space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-background/70 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-[2rem] border border-primary/15 bg-gradient-to-r from-primary/10 via-card to-card p-8 md:p-10"
        >
          <div className="max-w-4xl space-y-3">
            <p className="text-sm font-mono uppercase tracking-widest text-primary">{section.footerTitle}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">{section.footerBody}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
