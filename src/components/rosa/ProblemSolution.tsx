import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Film, BarChart3 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const stats = [
    { icon: Target, ...copy.problemSolution.stats[0] },
    { icon: Film, ...copy.problemSolution.stats[1] },
    { icon: BarChart3, ...copy.problemSolution.stats[2] },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              {copy.problemSolution.gapLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {copy.problemSolution.gapTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.problemSolution.gapBody}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-primary">
              {copy.problemSolution.solutionLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {copy.problemSolution.solutionTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.problemSolution.solutionBody}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {stats.map((item, i) => {
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
