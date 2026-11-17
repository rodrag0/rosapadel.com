import { ArrowDown, ArrowUpRight } from "lucide-react";
import CourtsidePage, { DetailHero, DetailIntro, DetailLink, DetailMedia } from "@/components/rosa/CourtsidePage";
import ContactCTA from "@/components/rosa/ContactCTA";
import { CourtsideShare } from "@/components/rosa/CourtsideSections";
import { RealMatch } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";
import { visionContent } from "@/lib/visionContent";
import { courtsideCopy } from "@/lib/courtsideCopy";

export default function ProductVision() {
  const { copy, language } = useLanguage();
  const vision = visionContent[language];
  const words = {
    en: {
      court: "See it on court",
      media: ["ROSA TV · Scoring demonstration", "ROSA VAR · Review controls demonstration", "Final Expo 2026 · Replay and analysis", "ROSA player app · Demo data"],
    },
    es: {
      court: "Verlo en cancha",
      media: ["ROSA TV · Demostración del marcador", "VAR de ROSA · Demostración de controles", "Final Expo 2026 · Replay y análisis", "App ROSA para jugadores · Datos de demostración"],
    },
    de: {
      court: "Auf dem Court ansehen",
      media: ["ROSA TV · Spielstand-Demonstration", "ROSA VAR · Demo der Review-Steuerung", "Final Expo 2026 · Replay und Analyse", "ROSA-Spieler-App · Demodaten"],
    },
  }[language];
  const chapters = [
    { start: 0, src: "point-then-score.mp4", poster: "point-then-score.webp", width: 1280, height: 720 },
    { start: 2, src: "var-controls.mp4", poster: "var-controls.webp", width: 1280, height: 800 },
    { start: 4, src: "match-review.mp4", poster: "match-review.webp", width: 1080, height: 720 },
    { start: 6, src: "player-app-current.webp", poster: undefined, width: 1080, height: 800 },
  ];
  return (
    <CourtsidePage className="detail-vision-page">
      <DetailHero
        title="rosa vision"
        product="vision"
        variant="vision"
        image="/images/courtside/invicto-court.webp"
        alt={courtsideCopy[language].hero.alt}
        credit="Invicto Pádel · ROSA Vision"
        status={copy.productFamily.items[0].status}
      />
      <DetailIntro title={vision.tagline} actions={
        <>
          <a href="#contact" className="studio-button">{copy.hero.primaryCta}<ArrowUpRight size={16} aria-hidden="true" /></a>
          <DetailLink href="#match-preview">{words.court}</DetailLink>
        </>
      }>
        <p><BrandText text={vision.intro} /></p>
      </DetailIntro>
      <nav className="detail-jump-links studio-container" aria-label={copy.productFamily.items[0].name}>
        {chapters.map(({ start }) => (
          <a key={start} href={start === 4 ? "#analysis" : `#vision-${vision.features[start].id}`}>
            {vision.features[start].name}<ArrowDown size={15} aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="detail-chapters studio-container">
        {chapters.map(({ start, src, poster, width, height }, index) => (
          <section className="detail-chapter" key={start} id={start === 4 ? "analysis" : undefined} data-product-layer={start === 4 ? "ai" : undefined}>
            <div className="detail-chapter-copy">
              {vision.features.slice(start, start + 2).map(({ id, name, body }) => (
                <div id={`vision-${id}`} className="detail-chapter-feature scroll-mt-24" data-vision-feature={id} key={id}>
                  <h2>{name}</h2>
                  <p><BrandText text={body} /></p>
                </div>
              ))}
              {start === 4 && <p className="detail-qualification">{vision.analysisNote}</p>}
              {start === 6 && <DetailLink href="/rosa-app#page=club">{vision.app}</DetailLink>}
            </div>
            <DetailMedia
              src={`/images/courtside/${src}`}
              poster={poster ? `/images/courtside/${poster}` : undefined}
              width={width}
              height={height}
              alt={words.media[index]}
              caption={words.media[index]}
            />
          </section>
        ))}
      </div>
      <div className="studio-container detail-section">
        <p className="detail-qualification">{vision.competition}</p>
        <DetailLink href="/tournament-management">{copy.nav.newTab}</DetailLink>
      </div>
      <RealMatch id="match-preview" productPage />
      <CourtsideShare />
      <ContactCTA />
    </CourtsidePage>
  );
}
