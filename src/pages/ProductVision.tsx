import {
  ArrowUpRight,
  Camera,
  Monitor,
  Palette,
  Shield,
  Tablet,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { RealMatch } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

const features = [
  {
    icon: Monitor,
    name: "HD scoring",
    body: "Follow points, games and sets on the court display, alongside the match information.",
  },
  {
    icon: Tablet,
    name: "Pads through the glass",
    body: "Players update the score by touching the rosa pads through the glass. No phone is needed during play.",
  },
  {
    icon: Camera,
    name: "Replay & VAR",
    body: "Revisit a rally or review a disputed play with video. Players or a referee make the call.",
  },
  {
    icon: Shield,
    name: "Match setup & referee control",
    body: "Set up the match with QR or web access and give a referee control of the score when needed.",
  },
  {
    icon: Trophy,
    name: "Event management",
    body: "Explore connected tournament, league and Americano workflows for your club.",
  },
  {
    icon: Palette,
    name: "Your club on screen",
    body: "Bring your club identity, sponsors and event visuals to the scoring display.",
  },
];

export default function ProductVision() {
  const { copy, language } = useLanguage();
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="product-page-hero studio-container">
        <div className="product-heading-line">
          <ProductTitle name="vision" />
          <span className="product-availability">
            {copy.productFamily.items[0].status}
          </span>
        </div>
        <p className="product-intro">
          <BrandText text={copy.products.items[1].description} />{" "}
          {copy.productFamily.items[0].tagline}
        </p>
        <div className="studio-actions">
          <a href="#contact" className="studio-button">
            {copy.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="#match-preview" className="studio-link">
            {
              {
                en: "See it on court",
                es: "Verlo en cancha",
                de: "Auf dem Court ansehen",
              }[language]
            }
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <figure className="studio-container">
        <img
          src="/images/products/rosa-vision-court.webp"
          alt={copy.hero.sceneAlt}
          width="1600"
          height="900"
          className="product-photo"
        />
      </figure>
      <section className="studio-section studio-container">
        <div className="section-heading">
          <h2>
            {
              {
                en: "One connected match experience.",
                es: "Una experiencia de partido conectada.",
                de: "Ein vernetztes Spielerlebnis.",
              }[language]
            }
          </h2>
          <p>{copy.productFamily.items[0].tagline}</p>
        </div>
        <div className="feature-rows">
          {features.map(({ icon: Icon, name, body }) => (
            <div key={name}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>{name}</h3>
                <p>
                  <BrandText text={body} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <a href="/tournament-management" className="studio-link">
          {copy.nav.newTab}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
      <RealMatch id="match-preview" productPage />
      <section
        className="studio-section studio-container"
        data-product-layer="ai"
      >
        <div className="coach-line">
          <div>
            <h2 className="text-3xl font-semibold">
              <BrandText text="rosa coach" />
            </h2>
            <p>{copy.productFamily.aiLayer.body}</p>
          </div>
          <div>
            <span>{copy.productFamily.aiLayer.status}</span>
            <a href="/products/coach" className="studio-link">
              {copy.productFamily.aiLayer.cta}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <ContactCTA />
      <Footer />
    </main>
  );
}
