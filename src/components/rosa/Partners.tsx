import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";
import campusFoundersDark from "@/assets/campusfounders-logo-dark.svg";
import campusFoundersLight from "@/assets/campusfounders-logo-light.svg";

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const campusLogo = theme === "dark" ? campusFoundersDark : campusFoundersLight;

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <span className="text-sm font-mono uppercase tracking-widest text-primary">Backed By</span>
            <p className="text-muted-foreground text-lg">Building the future of padel</p>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="px-10 py-6 rounded-xl inner-glow bg-card">
              <img src={campusLogo} alt="Campus Founders" className="h-10 w-auto" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
