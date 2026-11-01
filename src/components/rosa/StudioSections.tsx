import { ArrowUpRight, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "./LanguageProvider";
import { getHardwareProducts } from "@/lib/productCatalog";
import BrandText from "./BrandText";
import ScrollDepth from "./ScrollDepth";

export const MATCH_PREVIEW_URL =
  "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/preview-63527cc14d19.mp4";
export const MATCH_POSTER_URL =
  "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-4e7582d7a08e.webp";
export const MATCH_SHARE_URL =
  "https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384";

export function HardwareCollection() {
  const { copy, language } = useLanguage();
  const products = getHardwareProducts(language);
  const hierarchy = {
    en: {
      title: "The ROSA ecosystem.",
      body: "Built around rosa vision, our connected-court system. Choose rosa portable as the alternative for portable LED scoring.",
    },
    es: {
      title: "El ecosistema ROSA.",
      body: "ROSA vision es nuestro sistema principal para la cancha conectada. ROSA portable es la alternativa para un marcador LED portátil.",
    },
    de: {
      title: "Das ROSA-Ökosystem.",
      body: "ROSA vision ist unser Hauptsystem für den vernetzten Court. ROSA portable ist die Alternative für einen mobilen LED-Spielstand.",
    },
  }[language];
  return (
    <section
      id="products"
      className="studio-section studio-container scroll-mt-24"
    >
      <div className="section-heading">
        <h2>{hierarchy.title}</h2>
        <p>{hierarchy.body}</p>
      </div>
      <div className="hardware-collection">
        {products.map((product, index) => (
          <article
            key={product.href}
            className={`hardware-row hardware-${index === 0 ? "vision" : "portable"}`}
          >
            <div className="hardware-description">
              <div className="hardware-title">
                <h3>
                  <BrandText text={product.name} />
                </h3>
                <span className="product-availability">{product.status}</span>
              </div>
              <p className="hardware-tagline">{product.tagline}</p>
              <ul className="hardware-features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href={product.href} className="studio-link">
                {copy.productFamily.viewProduct}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <ScrollDepth
              className="hardware-visual"
              strength={index === 0 ? 1 : 0.6}
            >
              <a
                href={product.href}
                className="hardware-image"
                aria-label={product.name}
              >
                <img
                  src={
                    index === 0
                      ? "/images/products/rosa-vision-court.webp"
                      : "/images/products/rosa-portable.webp"
                  }
                  alt={product.name}
                  width={index === 0 ? 1600 : 1672}
                  height={index === 0 ? 900 : 941}
                  loading="lazy"
                />
              </a>
            </ScrollDepth>
          </article>
        ))}
      </div>
      <div className="coach-line">
        <div>
          <h3>
            <BrandText text="rosa coach" />
          </h3>
          <p>{copy.productFamily.aiLayer.body}</p>
        </div>
        <div>
          <span>{copy.productFamily.aiLayer.status}</span>
          <a className="studio-link" href="/products/coach">
            {copy.productFamily.aiLayer.cta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function RealMatch({
  id = "real-match",
  productPage = false,
}: {
  id?: string;
  productPage?: boolean;
}) {
  const { language } = useLanguage();
  const words = {
    en: {
      title: "The game speaks for itself.",
      body: "Scoring, match footage and your club's identity. Together, on court.",
      action: "Open full match",
      caption: "Final Expo 2026 · 18 October 2026 · Match preview",
      label:
        "Final Expo 2026 match preview: Tolito / Mati vs Argañaras / Pablo",
    },
    es: {
      title: "El juego habla por sí solo.",
      body: "Marcador, video y la identidad de tu club. Juntos, en la cancha.",
      action: "Abrir partido completo",
      caption: "Final Expo 2026 · 18 de octubre de 2026 · Vista previa",
      label: "Vista previa Final Expo 2026: Tolito / Mati vs Argañaras / Pablo",
    },
    de: {
      title: "Das Spiel spricht für sich.",
      body: "Spielstand, Video und die Identität deines Clubs. Gemeinsam auf dem Court.",
      action: "Ganzes Match öffnen",
      caption: "Final Expo 2026 · 18. Oktober 2026 · Match-Vorschau",
      label:
        "Final Expo 2026 Match-Vorschau: Tolito / Mati vs Argañaras / Pablo",
    },
  }[language];
  return (
    <section
      id={id}
      className={`real-match-band studio-section scroll-mt-24 ${productPage ? "product-match" : ""}`}
    >
      <div className="studio-container">
        <div className="section-heading">
          <h2>{words.title}</h2>
          <p>{words.body}</p>
        </div>
        <figure>
          <video
            controls
            playsInline
            preload="none"
            poster={MATCH_POSTER_URL}
            width="1280"
            height="720"
            aria-label={words.label}
          >
            <source src={MATCH_PREVIEW_URL} type="video/mp4" />
            <a href={MATCH_SHARE_URL}>Open the Final Expo 2026 match</a>
          </video>
          <figcaption>
            <div>
              <p>Tolito / Mati vs Argañaras / Pablo</p>
              <span>{words.caption}</span>
            </div>
            <a
              className="studio-link"
              href={MATCH_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play size={16} aria-hidden="true" />
              {words.action}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function MatchWorkflow() {
  const { copy, language } = useLanguage();
  const words = {
    en: {
      title: "The match doesn't end at match point.",
      body: "From the score on court to the moments you keep. Explore the ROSA player experience.",
      action: "Explore the player app",
      alt: "ROSA player app demonstration",
    },
    es: {
      title: "El partido no termina en el match point.",
      body: "Del marcador en cancha a los momentos que conservas. Conoce la experiencia de ROSA para jugadores.",
      action: "Explora la app de jugadores",
      alt: "Demostración de la app ROSA para jugadores",
    },
    de: {
      title: "Das Match endet nicht beim Matchball.",
      body: "Vom Spielstand auf dem Court bis zu den Momenten danach. Entdecke das ROSA-Spielerlebnis.",
      action: "Spieler-App entdecken",
      alt: "ROSA-Spieler-App Demonstration",
    },
  }[language];
  return (
    <section
      id="how-it-works"
      className="studio-section studio-container scroll-mt-24"
    >
      <div className="section-heading">
        <h2>{words.title}</h2>
        <p>{words.body}</p>
      </div>
      <div className="workflow-layout">
        <div className="workflow-list">
          {copy.howItWorks.steps.map((step) => (
            <div key={step.num}>
              <span className="workflow-number">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>
                  <BrandText text={step.description} />
                </p>
              </div>
            </div>
          ))}
          <a href="/rosa-app#page=club" className="studio-link">
            {words.action}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <ScrollDepth className="app-capture">
          <img
            src="/images/software/player.webp"
            alt={words.alt}
            width="1440"
            height="1000"
            loading="lazy"
          />
          <figcaption>
            ROSA app ·{" "}
            {
              {
                en: "Demo environment",
                es: "Entorno de demostración",
                de: "Demo-Umgebung",
              }[language]
            }
          </figcaption>
        </ScrollDepth>
      </div>
    </section>
  );
}

export function EventsShowcase({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { language } = useLanguage();
  const words = {
    en: {
      title: "Less control desk. More court time.",
      body: "Automate draws, schedules, rotations and standings. In tournaments and leagues, players can report their results by QR.",
      action: "Open demo",
      demo: "ROSA Expo showcase · Sample players",
      link: "Explore events & tournaments",
      names: ["Tournaments", "Americanos", "Leagues"],
      descriptions: [
        "Generate draws and schedules automatically. Players report by QR, without a control desk entering every score. Results require opponent confirmation, the configured deadline or organizer review.",
        "Generate rotations and calculate individual standings automatically. The organizer records the scores and supervises the event.",
        "Update standings and generate the next round automatically after official results are complete. Players report and confirm by QR; provisional phone scores do not change the official table.",
      ],
    },
    es: {
      title: "Menos mesa de control. Más tiempo en pista.",
      body: "Automatiza cuadros, calendarios, rotaciones y clasificaciones. En torneos y ligas, los jugadores pueden reportar sus resultados por QR.",
      action: "Abrir demo",
      demo: "ROSA Expo · Jugadores de muestra",
      link: "Conoce eventos y torneos",
      names: ["Torneos", "Americanos", "Ligas"],
      descriptions: [
        "Genera cuadros y calendarios automáticamente. Los jugadores reportan por QR, sin una mesa de control capturando cada marcador. Los resultados siguen la confirmación del rival, el plazo configurado o la revisión del organizador.",
        "Genera las rotaciones y calcula la clasificación individual automáticamente. El organizador registra los resultados y supervisa el evento.",
        "Actualiza clasificaciones y genera la siguiente ronda automáticamente al completar los resultados oficiales. Los jugadores reportan y confirman por QR; los marcadores provisionales no cambian la tabla oficial.",
      ],
    },
    de: {
      title: "Weniger Verwaltung. Mehr Zeit auf dem Court.",
      body: "Auslosungen, Spielpläne, Rotationen und Tabellen automatisieren. Bei Turnieren und Ligen können Spieler Ergebnisse per QR melden.",
      action: "Demo öffnen",
      demo: "ROSA Expo · Beispielspieler",
      link: "Events und Turniere entdecken",
      names: ["Turniere", "Americanos", "Ligen"],
      descriptions: [
        "Auslosungen und Spielpläne automatisch erstellen. Spieler melden per QR, ohne zentrale manuelle Erfassung jedes Ergebnisses. Gegnerbestätigung, die konfigurierte Frist oder die Organisation bestätigen Ergebnisse.",
        "Rotationen und individuelle Tabellen automatisch berechnen. Die Organisation erfasst Ergebnisse und betreut das Event.",
        "Tabellen und die nächste Runde nach vollständigen offiziellen Ergebnissen automatisch aktualisieren. Spieler melden und bestätigen per QR; vorläufige Spielstände ändern die offizielle Tabelle nicht.",
      ],
    },
  }[language];
  const tools = [
    { id: "tournaments", href: "/tournament-tool", imageHeight: 679 },
    { id: "americanoss", href: "/americano-tool", imageHeight: 712 },
    { id: "leagues", href: "/league-tool", imageHeight: 679 },
  ];
  return (
    <section
      className={`events-section studio-section ${standalone ? "events-standalone" : ""}`}
    >
      <div className="studio-container">
        <div className="section-heading">
          {standalone ? (
            <h1>
              {
                {
                  en: "Padel tournaments & events",
                  es: "Torneos y eventos de pádel",
                  de: "Padel-Turniere und Events",
                }[language]
              }
            </h1>
          ) : (
            <h2>{words.title}</h2>
          )}
          <p>{words.body}</p>
        </div>
        <Tabs defaultValue="tournaments" className="software-tabs">
          <TabsList className="software-tab-list" aria-label={words.link}>
            {tools.map((tool, index) => (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="software-tab"
              >
                {words.names[index]}
              </TabsTrigger>
            ))}
          </TabsList>
          {tools.map((tool, index) => (
            <TabsContent
              key={tool.id}
              value={tool.id}
              className="software-panel"
            >
              <div className="software-description">
                <p>{words.descriptions[index]}</p>
                <a href={tool.href} className="studio-link">
                  {words.action}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <ScrollDepth className="app-capture" strength={0.7}>
                <img
                  src={`/images/software/${tool.id}.webp`}
                  alt={`${words.demo}: ${words.names[index]}`}
                  width="1440"
                  height={tool.imageHeight}
                  loading="lazy"
                />
                <figcaption>
                  {words.demo} · {words.names[index]}
                </figcaption>
              </ScrollDepth>
            </TabsContent>
          ))}
        </Tabs>
        {!standalone && (
          <a href="/tournament-management" className="studio-link events-more">
            {words.link}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}

export function ClubInvitation() {
  const { language } = useLanguage();
  const words = {
    en: {
      title: "Your courts. Your club. Your ROSA.",
      body: "Keep the club at the center of the experience, with its identity on screen, matches worth revisiting and reasons to come back.",
      action: "ROSA for your club",
    },
    es: {
      title: "Tus canchas. Tu club. Tu ROSA.",
      body: "Tu club en el centro de la experiencia: su identidad en pantalla, partidos para volver a ver y motivos para regresar.",
      action: "ROSA para tu club",
    },
    de: {
      title: "Deine Courts. Dein Club. Dein ROSA.",
      body: "Dein Club steht im Mittelpunkt: seine Identität auf dem Bildschirm, Spiele zum Wiederansehen und Gründe zurückzukommen.",
      action: "ROSA für deinen Club",
    },
  }[language];
  return (
    <section className="club-invitation studio-section">
      <div className="studio-container">
        <h2>{words.title}</h2>
        <div>
          <p>{words.body}</p>
          <a href="/for-clubs" className="studio-link">
            {words.action}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
