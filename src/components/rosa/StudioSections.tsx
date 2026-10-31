import { ArrowUpRight, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "./LanguageProvider";
import { getHardwareProducts } from "@/lib/productCatalog";
import BrandText from "./BrandText";

export const MATCH_PREVIEW_URL =
  "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/preview-63527cc14d19.mp4";
export const MATCH_POSTER_URL =
  "https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-4e7582d7a08e.webp";
export const MATCH_SHARE_URL =
  "https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384";

export function HardwareCollection() {
  const { copy, language } = useLanguage();
  const products = getHardwareProducts(language);
  return (
    <section
      id="products"
      className="studio-section studio-container scroll-mt-24"
    >
      <div className="section-heading">
        <h2>{copy.products.title}</h2>
        <p>{copy.products.subtitle}</p>
      </div>
      <div className="hardware-collection">
        {products.map((product, index) => (
          <article key={product.href} className="hardware-row">
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
            <a
              href={product.href}
              className="hardware-image"
              aria-label={product.name}
            >
              <img
                src={`/images/products/rosa-${index === 0 ? "vision-court" : "portable"}.webp`}
                alt={product.name}
                width={index === 0 ? 1600 : 1672}
                height={index === 0 ? 900 : 941}
                loading="lazy"
              />
            </a>
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
        <figure className="app-capture">
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
        </figure>
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
      title: "More play. Less organizing.",
      body: "Tournaments, Americanos and leagues. Give the competition a place of its own in your club.",
      action: "Open demo",
      demo: "ROSA demonstration",
      link: "Explore events & tournaments",
      names: ["Tournaments", "Americanos", "Leagues"],
      descriptions: [
        "Organize categories, pairs and the draw. Keep each court and round in view.",
        "Bring players together, generate rounds and follow the standings.",
        "Keep teams, fixtures and the league table together across the season.",
      ],
    },
    es: {
      title: "Más juego. Menos organización.",
      body: "Torneos, Americanos y ligas. Dale a la competición su propio espacio en tu club.",
      action: "Abrir demo",
      demo: "Demostración ROSA",
      link: "Conoce eventos y torneos",
      names: ["Torneos", "Americanos", "Ligas"],
      descriptions: [
        "Organiza categorías, parejas y cuadros. Mantén a la vista cada cancha y ronda.",
        "Reúne jugadores, genera rondas y sigue la clasificación.",
        "Equipos, jornadas y clasificación, juntos durante toda la temporada.",
      ],
    },
    de: {
      title: "Mehr spielen. Weniger organisieren.",
      body: "Turniere, Americanos und Ligen. Gib dem Wettbewerb einen eigenen Platz in deinem Club.",
      action: "Demo öffnen",
      demo: "ROSA-Demonstration",
      link: "Events und Turniere entdecken",
      names: ["Turniere", "Americanos", "Ligen"],
      descriptions: [
        "Kategorien, Paare und Spielplan organisieren. Courts und Runden im Blick behalten.",
        "Spieler zusammenbringen, Runden erstellen und die Tabelle verfolgen.",
        "Teams, Spieltage und Tabelle über die Saison zusammenhalten.",
      ],
    },
  }[language];
  const tools = [
    { id: "tournaments", href: "/tournament-tool" },
    { id: "americanoss", href: "/americano-tool" },
    { id: "leagues", href: "/league-tool" },
  ];
  return (
    <section
      className={`events-section studio-section ${standalone ? "events-standalone" : ""}`}
    >
      <div className="studio-container">
        <div className="section-heading">
          {standalone ? <h1>{{ en: "Padel tournaments & events", es: "Torneos y eventos de pádel", de: "Padel-Turniere und Events" }[language]}</h1> : <h2>{words.title}</h2>}
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
              <figure className="app-capture">
                <img
                  src={`/images/software/${tool.id}.webp`}
                  alt={`${words.demo}: ${words.names[index]}`}
                  width="1440"
                  height="1000"
                  loading="lazy"
                />
                <figcaption>
                  {words.demo} · {words.names[index]}
                </figcaption>
              </figure>
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
