import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import campusFoundersDark from "@/assets/campusfounders-logo-dark.svg";
import campusFoundersLight from "@/assets/campusfounders-logo-light.svg";
import emprelatamDark from "@/assets/emprelatam-dark.png";
import emprelatamLight from "@/assets/emprelatam-light.png";
import BrandText from "./BrandText";

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const { copy } = useLanguage();

  const campusLogo = theme === "dark" ? campusFoundersDark : campusFoundersLight;
  const emprelatamLogo = theme === "dark" ? emprelatamDark : emprelatamLight;

  return (
    <section ref={ref} id="partners" aria-labelledby="partners-title" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="partners-title" className="text-sm font-mono uppercase tracking-widest text-primary">{copy.partners.label}</h2>

          <ul aria-label={copy.partners.label} className="-mx-6 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 md:mx-0 md:justify-center md:gap-16 md:px-0">
            <li className="flex h-32 w-64 shrink-0 snap-center items-center justify-center sm:w-80">
              <img src={campusLogo} alt="Campus Founders" width="527" height="120" loading="lazy" className="h-auto w-full object-contain" />
            </li>
            <li className="flex h-32 w-64 shrink-0 snap-center items-center justify-center sm:w-80">
              <img src={emprelatamLogo} alt="Startup acelerada por emprelatam" width="500" height="200" loading="lazy" className="h-auto w-full object-contain" />
            </li>
          </ul>
          <p className="text-lg text-muted-foreground"><BrandText text={copy.partners.body} /></p>
        </motion.div>
      </div>
    </section>
  );
}
