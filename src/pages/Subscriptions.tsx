import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ContactCTA from "@/components/rosa/ContactCTA";
import BrandText from "@/components/rosa/BrandText";
import AppScreenshot from "@/components/rosa/AppScreenshot";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import { productCatalog } from "@/lib/productCatalog";
import { productPresentation } from "@/lib/productScreens";

export default function Subscriptions() {
  const { language } = useLanguage();
  const copy = productCatalog[language];
  useEffect(() => {
    document.title = `rosa padel | ${copy.subscriptions}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.subscriptionBody);
  }, [copy.subscriptions, copy.subscriptionBody]);

  return (
    <main className="experience-page min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="experience-hero experience-events-hero catalog-hero">
        <div className="hero-title">
          <h1>{copy.subscriptions}</h1>
          <p className="hero-statement">{copy.subscriptionTitle}</p>
          <p className="hero-detail">{copy.subscriptionBody}</p>
          <div className="experience-actions">
            <a href="#contact" className="experience-button">{copy.contact}<ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
      <section id="club" className="experience-section experience-container">
        <div className="experience-section-head">
          <div><p className="experience-eyebrow">{copy.clubAudience}</p><h2>{copy.clubName}</h2></div>
          <p className="experience-intro">{copy.clubBody}</p>
        </div>
        <AppScreenshot screen="venue" />
        <div className="connection-foot">
          <p>{copy.subscriptionNote}</p>
          <a href="/events" className="experience-text-link">{productPresentation[language].eventScreens}<ArrowRight size={18} /></a>
        </div>
      </section>
      <section id="player" className="experience-section experience-container player-story">
        <div className="player-story-copy">
          <p className="experience-eyebrow">{copy.playerAudience}</p>
          <h2><BrandText text="rosa Player" /></h2>
          <p className="experience-intro">{copy.playerBody}</p>
          <p className="experience-footnote">{productPresentation[language].playerNote}</p>
          <div className="connection-foot">
            <a href="#contact" className="experience-text-link">{copy.contact}<ArrowRight size={18} /></a>
          </div>
        </div>
        <AppScreenshot screen="player" mobile className="player-story-screen" />
      </section>
      <ContactCTA editorial />
      <Footer />
    </main>
  );
}
