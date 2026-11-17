import { ArrowUpRight } from "lucide-react";
import CourtsidePage, { DetailHero, DetailIntro } from "@/components/rosa/CourtsidePage";
import InvestorContactDialog from "@/components/rosa/InvestorContactDialog";
import Partners from "@/components/rosa/Partners";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";
import { courtsideCopy } from "@/lib/courtsideCopy";

const team = [
  {
    name: "Rodrigo Ponce",
    portrait: "rodrigo-ponce",
    role: "Co-founder & CEO",
  },
  {
    name: "Leandro Ponce",
    portrait: "leandro-ponce",
    role: "Co-founder & CFO",
  },
  {
    name: "Saul Ortiz de la Tejera",
    portrait: "saul-ortiz-de-la-tejera",
    role: "Co-founder & CTO",
  },
];

export default function Investors() {
  const { language } = useLanguage();
  const words = {
    en: {
      title: "rosa padel for investors.",
      body: "Court hardware, match software and club experiences. ROSA brings them together, one court at a time.",
      model: "Hardware at the court. Software across the club.",
      modelBody:
        "Two hardware products, with club and player services scoped separately.",
      team: "The people behind ROSA.",
      contact: "Interested in rosa?",
      contactBody:
        "We're open to conversations with investors, partners and distributors who believe in the padel opportunity.",
      pillars: ["Court hardware", "Software services", "Club events"],
      descriptions: [
        "rosa vision for the connected court. rosa portable as the LED scoring alternative.",
        "Vision brings together livestreams with live score, recording, replay, AI analysis and integrated coaching.",
        "Tournament, Americano and league workflows, connected to the club experience.",
      ],
    },
    es: {
      title: "rosa padel para inversionistas.",
      body: "Hardware en cancha, software de partido y experiencias de club. ROSA los reúne, una cancha a la vez.",
      model: "Hardware en cancha. Software en todo el club.",
      modelBody:
        "Dos productos de hardware, con servicios para clubes y jugadores por separado.",
      team: "Las personas detrás de ROSA.",
      contact: "¿Te interesa rosa?",
      contactBody:
        "Conversemos con inversionistas, socios y distribuidores que creen en la oportunidad del pádel.",
      pillars: [
        "Hardware en cancha",
        "Servicios de software",
        "Eventos del club",
      ],
      descriptions: [
        "rosa vision para la cancha conectada. rosa portable como alternativa de marcador LED.",
        "Vision reúne livestream con marcador, grabación, replay, análisis con IA y coaching integrado.",
        "Torneos, Americanos y ligas, conectados con la experiencia del club.",
      ],
    },
    de: {
      title: "rosa padel für Investoren.",
      body: "Court-Hardware, Match-Software und Club-Erlebnisse. ROSA verbindet sie, Court für Court.",
      model: "Hardware am Court. Software im ganzen Club.",
      modelBody:
        "Zwei Hardware-Produkte mit separat geplanten Club- und Spielerdiensten.",
      team: "Die Menschen hinter ROSA.",
      contact: "Interesse an rosa?",
      contactBody:
        "Wir sprechen mit Investoren, Partnern und Vertriebspartnern, die an die Padel-Chance glauben.",
      pillars: ["Court-Hardware", "Software-Dienste", "Club-Events"],
      descriptions: [
        "rosa vision für den vernetzten Court. rosa portable als Alternative für den LED-Spielstand.",
        "Vision verbindet Livestream mit Spielstand, Aufzeichnung, Replay, KI-Analyse und integriertes Coaching.",
        "Turnier-, Americano- und Liga-Workflows im Club-Erlebnis.",
      ],
    },
  }[language];
  return (
    <CourtsidePage className="detail-investors-page">
      <DetailHero title={words.title} variant="investors" image="/images/courtside/invicto-court.webp"
        alt={courtsideCopy[language].hero.alt} credit="Invicto Pádel · ROSA Vision" />
      <DetailIntro title={words.model} actions={
        <>
          <InvestorContactDialog />
          <a href="/#products" className="studio-link">
            <BrandText text="rosa vision & rosa portable" />
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </>
      }>
        <p>{words.body}</p>
      </DetailIntro>
      <section className="detail-section studio-container">
        <p className="detail-qualification">{words.modelBody}</p>
        <div className="detail-pillars">
          {words.pillars.map((title, index) => {
            return (
              <article key={title}>
                  <h3>{title}</h3>
                  <p>
                    <BrandText text={words.descriptions[index]} />
                  </p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="detail-section studio-container detail-investor-products" aria-label={words.pillars[0]}>
        {["vision", "portable"].map((name) => (
          <a key={name} href={`/products/${name}`}>
            <img src={`/images/products/rosa-${name === "vision" ? "vision-court" : "portable"}.webp`}
              alt={`rosa ${name}`} width="1600" height="900" loading="lazy" />
            <h3 className="studio-link"><BrandText text={`rosa ${name}`} /><ArrowUpRight size={19} aria-hidden="true" /></h3>
          </a>
        ))}
      </section>
      <section className="detail-section studio-container">
        <div className="detail-section-heading">
          <h2>{words.team}</h2>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name}>
              <img
                src={`/images/team/${member.portrait}.webp`}
                alt={member.name}
                width="1122"
                height="1402"
                loading="lazy"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
      <Partners />
      <section className="detail-investor-contact">
        <div className="studio-container">
          <h2>
            <BrandText text={words.contact} />
          </h2>
          <p>
            {words.contactBody}
          </p>
          <div className="studio-actions">
            <InvestorContactDialog />
            <a href="mailto:rodrigo@rosapadel.com" className="studio-link">
              rodrigo@rosapadel.com
            </a>
          </div>
        </div>
      </section>
    </CourtsidePage>
  );
}
