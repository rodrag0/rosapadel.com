import {
  ArrowUpRight,
  BrainCircuit,
  Camera,
  Monitor,
  Palette,
  Radio,
  ScanEye,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { RealMatch } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";
import { visionContent } from "@/lib/visionContent";

const featureIcons = {
  scoring: Monitor,
  stream: Radio,
  replay: Camera,
  var: ScanEye,
  analysis: BrainCircuit,
  coaching: TrendingUp,
  players: Users,
  club: Palette,
};

export default function ProductVision() {
  const { copy, language } = useLanguage();
  const vision = visionContent[language];
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
          <BrandText text={vision.intro} />
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
          {vision.features.map(({ id, name, body }) => {
            const Icon = featureIcons[id as keyof typeof featureIcons];
            return (
              <div key={id} id={`vision-${id}`} className="scroll-mt-24" data-vision-feature={id}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{name}</h3>
                  <p>
                    <BrandText text={body} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="vision-qualification">{vision.competition}</p>
        <a href="/tournament-management" className="studio-link">
          {copy.nav.newTab}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>
      <RealMatch id="match-preview" productPage />
      <section
        id="analysis"
        className="studio-section studio-container"
        data-product-layer="ai"
      >
        <div className="section-heading">
          <h2>{vision.analysisTitle}</h2>
          <p>{vision.analysisBody}</p>
        </div>
        <div className="vision-analysis-details">
          <div>
            <a href="/rosa-app#page=club" className="studio-link">
              {vision.app}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p>{vision.analysisNote}</p>
        </div>
      </section>
      <ContactCTA />
      <Footer />
    </main>
  );
}
