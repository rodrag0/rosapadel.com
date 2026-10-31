import { ArrowUpRight, WifiOff, Plug, Monitor, Tablet } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

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
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="product-page-hero studio-container">
        <div className="product-heading-line">
          <ProductTitle name="portable" />
          <span className="product-availability">{product.status}</span>
        </div>
        <p className="product-intro">
          {product.tagline} {copy.products.items[0].description}
        </p>
        <div className="studio-actions">
          <a href="#contact" className="studio-button">
            {copy.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="/products/vision" className="studio-link">
            <BrandText text="rosa vision" />
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <figure className="studio-container">
        <img
          src="/images/products/rosa-portable.webp"
          alt="rosa portable LED scoreboard with two wireless touchpads"
          width="1672"
          height="941"
          className="product-photo"
        />
      </figure>
      <section className="studio-section studio-container">
        <div className="section-heading">
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
        <div className="feature-rows">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactCTA />
      <Footer />
    </main>
  );
}
