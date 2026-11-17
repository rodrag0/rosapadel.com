import { ArrowUpRight, WifiOff, Plug, Monitor, Tablet } from "lucide-react";
import CourtsidePage, { DetailHero, DetailIntro, DetailLink, DetailMedia } from "@/components/rosa/CourtsidePage";
import ContactCTA from "@/components/rosa/ContactCTA";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";
import { visionContent } from "@/lib/visionContent";

export default function ProductPortable() {
  const { copy, language } = useLanguage();
  const product = copy.productFamily.items[1];
  const features = [
    {
      icon: Monitor,
      title: product.features[0],
      body: {
        en: "Points, games and sets on a dedicated courtside LED display.",
        es: "Puntos, juegos y sets en un marcador LED junto a la cancha.",
        de: "Punkte, Spiele und Sätze auf einer LED-Anzeige am Court.",
      }[language],
    },
    {
      icon: Tablet,
      title: product.features[1],
      body: {
        en: "Wireless touchpads keep point control with the players.",
        es: "Pads inalámbricos para que los jugadores controlen el marcador.",
        de: "Kabellose Pads geben den Spielern die Kontrolle über den Spielstand.",
      }[language],
    },
    {
      icon: WifiOff,
      title: product.features[2],
      body: {
        en: "Keep the score without a network connection.",
        es: "Lleva el marcador sin conexión a la red.",
        de: "Den Spielstand ohne Netzwerkverbindung führen.",
      }[language],
    },
    {
      icon: Plug,
      title: product.features[3],
      body: {
        en: "A scoring-focused setup. Ask us about placement and power for your court.",
        es: "Una configuración centrada en el marcador. Consulta el montaje y la alimentación para tu cancha.",
        de: "Eine Lösung für den Spielstand. Sprich mit uns über Montage und Stromversorgung.",
      }[language],
    },
  ];
  return (
    <CourtsidePage className="detail-portable-page">
      <DetailHero title="rosa portable" product="portable" variant="portable" image="/images/products/rosa-portable.webp"
        alt="rosa portable LED scoreboard with two wireless touchpads" credit="ROSA Portable" status={product.status} />
      <DetailIntro title={product.tagline} actions={
        <>
          <a href="#contact" className="studio-button">
            {copy.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <DetailLink href="/products/vision"><BrandText text="rosa vision" /></DetailLink>
        </>
      }>
        <p>{copy.products.items[0].description}</p>
      </DetailIntro>
      <section className="detail-section studio-container">
        <div className="detail-section-heading">
          <h2>
            {
              {
                en: "The score. Without the distractions.",
                es: "El marcador. Sin distracciones.",
                de: "Der Spielstand. Ohne Ablenkung.",
              }[language]
            }
          </h2>
          <p>
            {
              {
                en: "Portable scoring; camera, video and event management are not included.",
                es: "Marcador portátil; cámara, video y gestión de eventos no están incluidos.",
                de: "Mobiler Spielstand; Kamera, Video und Eventmanagement sind nicht enthalten.",
              }[language]
            }
          </p>
        </div>
        <div className="detail-capabilities">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <Icon size={22} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="detail-alternative">
        <div className="studio-container">
          <div>
            <h2>{copy.productFamily.items[0].tagline}</h2>
            <p>{visionContent[language].intro}</p>
            <DetailLink href="/products/vision"><BrandText text="rosa vision" /></DetailLink>
          </div>
          <DetailMedia src="/images/products/rosa-vision-court.webp" alt={copy.hero.sceneAlt} caption="ROSA Vision" width={1600} height={900} />
        </div>
      </section>
      <ContactCTA />
    </CourtsidePage>
  );
}
