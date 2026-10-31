import { ArrowUpRight, Camera, Trophy, Monitor, Users } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ROICalculator from "@/components/rosa/ROICalculator";
import ContactCTA from "@/components/rosa/ContactCTA";
import { EventsShowcase } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

export default function ForClubs() {
  const { copy, language } = useLanguage();
  const words = {
    en: {
      title: "ROSA for clubs and venues.",
      body: "Connect the score, the match and the people around it. Build your club's ROSA setup around the way you play.",
      system: "Designed around your club.",
      systemBody:
        "Start with the court experience. Then choose the video, event and player services that fit your venue.",
      roi: "With 1 extra booked court hour a week, you could cover your rosa vision hardware investment in 6 months.*",
      assumptions: "Estimate assumptions",
      assumptionsBody:
        "Illustrative rosa vision scenario for one court, based on our commercial proposal: one additional paid court-hour each week for six months. Actual payback depends on your booking rate, operating costs and additional paid bookings.",
      exclusions:
        "Hardware only. TV, installation, taxes and software subscriptions are excluded. This is not an estimate of your club's overall profit.",
      reasons: [
        "Your identity on screen",
        "Matches worth keeping",
        "A place for competition",
        "A connected player experience",
      ],
      descriptions: [
        "Bring club and sponsor artwork to the match presentation.",
        "Explore replay, review and clips from real match footage.",
        "Connect your club's tournaments, Americanos and leagues.",
        "Give players a place to revisit their matches and moments.",
      ],
    },
    es: {
      title: "ROSA para clubes y sedes.",
      body: "Conecta el marcador, el partido y las personas que lo rodean. Configura ROSA alrededor de la manera de jugar en tu club.",
      system: "Diseñado alrededor de tu club.",
      systemBody:
        "Empieza con la experiencia en cancha. Después elige los servicios de video, eventos y jugadores para tu sede.",
      roi: "Con 1 hora extra de cancha reservada a la semana, podrías cubrir la inversión en hardware rosa vision en 6 meses.*",
      assumptions: "Supuestos de la estimación",
      assumptionsBody:
        "Escenario ilustrativo para una cancha rosa vision, basado en nuestra propuesta comercial: una hora adicional pagada por semana durante seis meses. El retorno real depende de la tarifa, los costos operativos y las reservas adicionales pagadas.",
      exclusions:
        "Solo hardware. No incluye TV, instalación, impuestos ni suscripciones. No es una estimación de la utilidad total de tu club.",
      reasons: [
        "Tu identidad en pantalla",
        "Partidos para conservar",
        "Un espacio para competir",
        "Una experiencia conectada",
      ],
      descriptions: [
        "Lleva la imagen de tu club y sus patrocinadores a la presentación del partido.",
        "Explora replay, revisión y clips a partir de grabaciones reales.",
        "Conecta los torneos, Americanos y ligas de tu club.",
        "Un espacio para que los jugadores vuelvan a sus partidos y momentos.",
      ],
    },
    de: {
      title: "ROSA für Clubs und Anlagen.",
      body: "Verbinde den Spielstand, das Match und die Menschen darum. Plane ROSA so, wie in deinem Club gespielt wird.",
      system: "Für deinen Club geplant.",
      systemBody:
        "Beginne mit dem Court-Erlebnis. Wähle dann passende Video-, Event- und Spielerdienste.",
      roi: "Mit einer zusätzlich gebuchten Court-Stunde pro Woche könnte sich deine rosa vision Hardware in6 Monaten amortisieren.*",
      assumptions: "Annahmen der Schätzung",
      assumptionsBody:
        "Illustratives Szenario für einen rosa vision Court auf Basis unseres Angebots: eine zusätzliche bezahlte Stunde pro Woche über sechs Monate. Die tatsächliche Amortisation hängt von Preisen, Betriebskosten und zusätzlichen bezahlten Buchungen ab.",
      exclusions:
        "Nur Hardware. TV, Installation, Steuern und Software-Abos sind nicht enthalten. Keine Schätzung des gesamten Clubgewinns.",
      reasons: [
        "Deine Identität auf dem Bildschirm",
        "Matches zum Aufbewahren",
        "Raum für Wettbewerb",
        "Ein vernetztes Spielerlebnis",
      ],
      descriptions: [
        "Zeige Club- und Sponsoren-Grafiken in der Match-Präsentation.",
        "Entdecke Replay, Review und Clips aus echtem Matchmaterial.",
        "Verbinde die Turniere, Americanos und Ligen deines Clubs.",
        "Ein Ort, an dem Spieler ihre Matches und Momente wiederfinden.",
      ],
    },
  }[language];
  const icons = [Monitor, Camera, Trophy, Users];
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="studio-container studio-section detail-intro">
        <h1>{words.title}</h1>
        <p>{words.body}</p>
        <div className="studio-actions">
          <a href="#contact" className="studio-button">
            {copy.hero.primaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="/#products" className="studio-link">
            {copy.hero.secondaryCta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <aside aria-label="Club hardware payback" className="club-estimate">
          <p className="!text-base !text-foreground !mt-0 font-medium">
            <BrandText text={words.roi} />
          </p>
          <details>
            <summary>{words.assumptions}</summary>
            <p>{words.assumptionsBody}</p>
            <p>{words.exclusions}</p>
          </details>
        </aside>
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
          <h2>{words.system}</h2>
          <p>{words.systemBody}</p>
        </div>
        <div className="feature-rows">
          {words.reasons.map((reason, index) => {
            const Icon = icons[index];
            return (
              <div key={reason}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{reason}</h3>
                  <p>{words.descriptions[index]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ROICalculator />
      <EventsShowcase />
      <ContactCTA />
      <Footer />
    </main>
  );
}
