import { motion, AnimatePresence } from "framer-motion";
import { Suspense, lazy, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

const headlines = [
  <>The <span className="text-primary text-glow">Pro</span> Experience.<br />Any Court.</>,
  <>The <span className="text-primary text-glow">Smartest</span> Court<br />On Earth.</>,
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Hero text content */}
      <div className="container mx-auto px-6 lg:px-12 pt-44 pb-12 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight relative h-[3.2em] md:h-[2.2em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="block"
              >
                {headlines[index]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Professional padel scoring, instant replay, and match analytics —
            designed for players, built for any court.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow text-base px-8 h-12">
              Book a Demo
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-base px-8 h-12">
              See Products
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {["Live Scoring", "Instant Replay", "Match Analytics"].map((label) => (
              <span
                key={label}
                className="px-4 py-1.5 text-sm font-medium rounded-full inner-glow bg-secondary text-secondary-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D Court */}
      <div className="w-full h-[60vh] md:h-[70vh] relative">
        <Suspense fallback={null}>
          <Hero3DScene theme={theme} />
        </Suspense>
      </div>
    </section>
  );
}
