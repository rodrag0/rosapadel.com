import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";
import rosaLogo from "@/assets/rosa-logo-dark.png";
import { experienceCopy } from "@/lib/experienceCopy";
import { experienceMedia } from "@/lib/experienceMedia";

export default function ExperienceHero() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].hero;
  return (
    <section className="experience-hero" aria-labelledby="vision-heading">
      <img
        className="experience-hero-image"
        src={experienceMedia.matchPoster}
        alt=""
        fetchPriority="high"
      />
      <div className="experience-hero-shade" />
      <div className="experience-container experience-hero-content">
        <p className="experience-eyebrow">{copy.label}</p>
        <h1 id="vision-heading" className="experience-wordmark">
          <img src={rosaLogo} alt="rosa" width="220" height="82" />
          <span>Vision</span>
        </h1>
        <p className="experience-hero-heading">{copy.title}</p>
        <p className="experience-hero-body">
          <BrandText text={copy.body} />
        </p>
        <div className="experience-actions">
          <a className="experience-button" href="#contact">
            {copy.primary}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="experience-button experience-button-ghost"
            href="#real-match"
          >
            <Play size={16} aria-hidden="true" />
            {copy.secondary}
          </a>
        </div>
        <p className="experience-hero-note">{copy.note}</p>
      </div>
      <div className="experience-hero-bottom experience-container">
        <span>
          <span className="experience-live-dot" />
          <BrandText text={copy.photo} />
        </span>
        <a
          href="#products"
          aria-label={experienceCopy[language].products.label}
        >
          <ArrowDown size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
