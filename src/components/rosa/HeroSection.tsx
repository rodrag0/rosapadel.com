import { motion, AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { getSectionHref } from "@/lib/siteLinks";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

export default function HeroSection() {
  const { theme } = useTheme();
  const { copy, language } = useLanguage();
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const headline = copy.hero.headlines[index];
  const contactHref = getSectionHref(location.pathname, "contact");
  const productsHref = getSectionHref(location.pathname, "products");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % copy.hero.headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [copy.hero.headlines.length]);

  useEffect(() => {
    setIndex(0);
  }, [language]);

  return (
    <section>
      <div className="container mx-auto px-6 lg:px-12 pt-44 pb-12 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight relative min-h-[4.6em] sm:min-h-[4em] md:min-h-[2.4em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${language}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="block"
              >
                <>
                  {headline.prefix}
                  <span className="text-primary text-glow">{headline.accent}</span>
                  {headline.suffix}
                  <br />
                  {headline.secondLine}
                </>
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {copy.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow text-base px-8 h-12"
            >
              <a href={contactHref}>{copy.hero.primaryCta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary text-base px-8 h-12"
            >
              <a href={productsHref}>{copy.hero.secondaryCta}</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {copy.hero.badges.map((label) => (
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

      <div className="w-full h-[60vh] md:h-[70vh] relative">
        <Suspense fallback={null}>
          <Hero3DScene theme={theme} />
        </Suspense>
      </div>
    </section>
  );
}
