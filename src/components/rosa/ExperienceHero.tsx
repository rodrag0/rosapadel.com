import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import AppScreenshot from "./AppScreenshot";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";
import { productPresentation } from "@/lib/productScreens";

export default function ExperienceHero() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const copy = productPresentation[language];
  return (
    <section className="experience-hero" aria-labelledby="vision-heading">
      <div className="hero-title">
        <h1 id="vision-heading" className="experience-wordmark">
          <img
            src={theme === "dark" ? rosaLogoDark : rosaLogoLight}
            alt="rosa"
            width="190"
            height="71"
          />
          <span>Vision</span>
        </h1>
        <p className="hero-statement">{copy.hero}</p>
        <p className="hero-detail">{copy.body}</p>
        <div className="experience-actions">
          <a className="experience-button" href="#products">
            {copy.cta}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="experience-text-link" href="#real-match">
            {copy.film}
            <Play size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-product-stage">
        <AppScreenshot
          screen="player"
          className="hero-desktop-screen"
          priority
          caption={false}
        />
        <AppScreenshot
          screen="player"
          className="hero-phone-screen"
          mobile
          priority
          caption={false}
        />
      </div>
      <p className="hero-caption">
        {copy.pilot}
        <span aria-hidden="true"> · </span>
        {copy.screens}
      </p>
    </section>
  );
}
