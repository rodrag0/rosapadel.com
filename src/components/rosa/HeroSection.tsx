import { Suspense, lazy } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

export default function HeroSection() {
  const { theme } = useTheme();
  const { copy, language } = useLanguage();
  const words = {
    en: {
      intro: "The connected padel court.",
      body: "Live scoring. Replay. VAR.",
      status: "Pre-sale",
      explore: "Explore vision",
      match: "See a real match",
      next: "The ROSA ecosystem",
    },
    es: {
      intro: "La cancha de pádel conectada.",
      body: "Marcador en vivo. Replay. VAR.",
      status: "Preventa",
      explore: "Conoce vision",
      match: "Ver un partido real",
      next: "El ecosistema ROSA",
    },
    de: {
      intro: "Der vernetzte Padel-Court.",
      body: "Live-Spielstand. Replay. VAR.",
      status: "Vorverkauf",
      explore: "vision entdecken",
      match: "Ein echtes Match ansehen",
      next: "Das ROSA-Ökosystem",
    },
  }[language];
  const fallback = (
    <img
      src="/images/products/rosa-vision-court.webp"
      alt={copy.hero.sceneAlt}
      width="1600"
      height="900"
      className="court-fallback"
      data-court-preview
    />
  );
  return (
    <section className="product-hero" aria-labelledby="hero-title">
      <div className="studio-container hero-intro">
        <div className="hero-title-row">
          <h1 id="hero-title" className="hero-product-name">
            <img
              src={theme === "dark" ? rosaLogoDark : rosaLogoLight}
              alt="rosa"
              width="200"
              height="60"
            />
            <span>vision</span>
          </h1>
          <p className="product-availability">{words.status}</p>
        </div>
        <p className="hero-category">{words.intro}</p>
        <p className="hero-description">{words.body}</p>
        <div className="studio-actions">
          <a href="/products/vision" className="studio-button">
            {words.explore}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="#real-match" className="studio-link">
            {words.match}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="court-stage" role="img" aria-label={copy.hero.sceneAlt}>
        <Suspense fallback={fallback}>
          {typeof window !== "undefined" ? (
            <Hero3DScene theme={theme} />
          ) : (
            fallback
          )}
        </Suspense>
      </div>
      <div className="studio-container hero-baseline">
        <div className="brand-origins" data-brand-origin>
          <span>
            <img src="/images/flags/de.svg" alt="" width="20" height="15" />
            {copy.hero.origin.technology}
          </span>
          <span>
            <img src="/images/flags/mx.svg" alt="" width="20" height="15" />
            {copy.hero.origin.heart}
          </span>
        </div>
        <a href="#products" className="studio-link">
          {words.next}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
