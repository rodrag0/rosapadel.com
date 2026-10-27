import { motion, AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { getSectionHref } from "@/lib/siteLinks";
import BrandText from "./BrandText";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

export default function HeroSection() {
  const { theme } = useTheme();
  const { copy, language } = useLanguage();
  const location = useLocation();
  const [index, setIndex] = useState(0);

  const headline = copy.hero.headlines[index];
  const courtPreview = <img src="/images/products/rosa-vision-court.webp" alt={copy.hero.sceneAlt} width="1600" height="900" decoding="async" className="h-full w-full object-contain" data-court-preview />;
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
      <div className="container mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-12">
        
        {/* HERO CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-4 min-h-[70vh]">

          {/* LEFT - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="space-y-6 text-left lg:pr-8"
          >
            <p className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground" data-brand-origin>
              <span className="inline-flex items-center gap-2">
                <img src="/images/flags/de.svg" alt="" aria-hidden="true" width="24" height="18" className="h-auto w-6 shrink-0 ring-1 ring-foreground/10" />
                <span>{copy.hero.origin.technology}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <img src="/images/flags/mx.svg" alt="" aria-hidden="true" width="24" height="18" className="h-auto w-6 shrink-0 ring-1 ring-foreground/10" />
                <span>{copy.hero.origin.heart}</span>
              </span>
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight relative min-h-[4.6em] sm:min-h-[4em] md:min-h-[2.4em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${language}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="block"
                >
                  <>
                    {headline.prefix}
                    <span className="text-primary text-glow">
                      {headline.accent}
                    </span>
                    {headline.suffix}
                    <br />
                    {headline.secondLine}
                  </>
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              <BrandText text={copy.hero.subtitle} />
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 justify-start">
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

            {/* BADGES */}
            <div className="flex flex-wrap gap-3 justify-start">
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

          {/* RIGHT - 3D SCENE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="w-full h-[450px] md:h-[550px] lg:h-[650px] relative"
          >
            <Suspense fallback={courtPreview}>
              {typeof window !== "undefined" ? <Hero3DScene theme={theme} /> : courtPreview}
            </Suspense>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
