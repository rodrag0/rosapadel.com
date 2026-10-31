import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";

export default function HeroSection() {
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
  return (
    <section className="product-hero" aria-labelledby="hero-title">
      <div className="studio-container hero-intro">
        <div>
          <div className="hero-title-row">
            <h1 id="hero-title" className="hero-product-name">
              <img src={rosaLogoDark} alt="rosa" width="200" height="60" />
              <span>vision</span>
            </h1>
            <p className="product-availability">{words.status}</p>
          </div>
          <p className="hero-category">{words.intro}</p>
        </div>
        <div className="hero-summary">
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
      </div>
      <img
        className="hero-court-image"
        src="/images/products/rosa-vision-court.webp"
        alt={copy.hero.sceneAlt}
        width="1600"
        height="900"
        fetchPriority="high"
      />
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
