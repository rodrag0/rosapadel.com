import { ArrowUpRight, BarChart2, Video, Scan, TrendingUp } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ProductTitle from "@/components/rosa/ProductTitle";
import ContactCTA from "@/components/rosa/ContactCTA";
import { useLanguage } from "@/components/rosa/LanguageProvider";

export default function ProductCoach() {
  const { copy, language } = useLanguage();
  const words = {
    en: {
      title: "A closer look at your game.",
      body: "Planned analysis workflows for coaches and players. Features and availability depend on the enabled services; pilot outputs do not guarantee accuracy for every match.",
      app: "ROSA player app demonstration; not a guarantee of released coach features.",
      names: [
        "Shot analysis",
        "Tactical review",
        "Match progress",
        "Video and context",
      ],
      descriptions: [
        "Explore shot patterns in your recorded matches.",
        "Review court positions and heatmaps alongside the footage.",
        "Bring match summaries into a longer view of your game.",
        "Connect the moments on video with the match's information.",
      ],
    },
    es: {
      title: "Una mirada más cerca a tu juego.",
      body: "Flujos de análisis previstos para entrenadores y jugadores. Funciones y disponibilidad dependen de los servicios habilitados; los resultados piloto no garantizan precisión en cada partido.",
      app: "Demostración de la app de jugadores; no garantiza funciones de coach publicadas.",
      names: [
        "Análisis de golpes",
        "Revisión táctica",
        "Evolución del juego",
        "Video y contexto",
      ],
      descriptions: [
        "Explora patrones de golpes en tus partidos grabados.",
        "Revisa posiciones y mapas de calor junto al video.",
        "Conecta los resúmenes para ver tu juego a lo largo del tiempo.",
        "Relaciona los momentos del video con la información del partido.",
      ],
    },
    de: {
      title: "Dein Spiel genauer betrachtet.",
      body: "Geplante Analyse-Workflows für Trainer und Spieler. Funktionen und Verfügbarkeit hängen von den aktivierten Diensten ab; Pilotdaten garantieren keine Genauigkeit für jedes Match.",
      app: "Demonstration der Spieler-App; keine Garantie veröffentlichter Coach-Funktionen.",
      names: [
        "Schlaganalyse",
        "Taktische Auswertung",
        "Spielentwicklung",
        "Video und Kontext",
      ],
      descriptions: [
        "Schlagmuster in aufgezeichneten Matches entdecken.",
        "Court-Positionen und Heatmaps mit dem Video prüfen.",
        "Match-Zusammenfassungen über längere Zeit betrachten.",
        "Videomomente mit Match-Informationen verbinden.",
      ],
    },
  }[language];
  const icons = [Scan, BarChart2, TrendingUp, Video];
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="studio-container product-page-hero">
        <div className="product-heading-line">
          <ProductTitle name="coach" />
          <span className="text-sm text-muted-foreground">
            {copy.productFamily.aiLayer.status}
          </span>
        </div>
        <p className="product-intro">{copy.productFamily.aiLayer.body}</p>
        <div className="studio-actions">
          <a href="#contact" className="studio-button">
            {copy.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="/products/vision" className="studio-link">
            rosa vision
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <figure className="studio-container app-capture">
        <img
          src="/images/software/player.webp"
          alt={words.app}
          width="1440"
          height="1000"
        />
        <figcaption>{words.app}</figcaption>
      </figure>
      <section className="studio-section studio-container">
        <div className="section-heading">
          <h2>{words.title}</h2>
          <p>{words.body}</p>
        </div>
        <div className="feature-rows">
          {words.names.map((name, index) => {
            const Icon = icons[index];
            return (
              <div key={name}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{name}</h3>
                  <p>{words.descriptions[index]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ContactCTA />
      <Footer />
    </main>
  );
}
