import { ArrowUpRight, Monitor, Layers, Trophy } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import InvestorContactDialog from "@/components/rosa/InvestorContactDialog";
import Partners from "@/components/rosa/Partners";
import { HardwareCollection } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

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
        "rosa portable for LED scoring. rosa vision for the connected court.",
        "Match access, replay and review, with rosa coach as the AI layer in development.",
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
        "rosa portable para marcador LED. rosa vision para la cancha conectada.",
        "Acceso a partidos, replay y revisión, con rosa coach como capa de IA en desarrollo.",
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
        "rosa portable für den LED-Spielstand. rosa vision für den vernetzten Court.",
        "Match-Zugang, Replay und Review sowie rosa coach als KI-Ebene in Entwicklung.",
        "Turnier-, Americano- und Liga-Workflows im Club-Erlebnis.",
      ],
    },
  }[language];
  const icons = [Monitor, Layers, Trophy];
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <section className="studio-section studio-container detail-intro">
        <h1>{words.title}</h1>
        <p>{words.body}</p>
        <div className="studio-actions">
          <InvestorContactDialog />
          <a href="/#products" className="studio-link">
            <BrandText text="rosa vision & rosa portable" />
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <figure className="studio-container">
        <img
          src="/images/products/rosa-vision-court.webp"
          alt="rosa vision connected padel court"
          width="1600"
          height="900"
          className="product-photo"
        />
      </figure>
      <section className="studio-section studio-container">
        <div className="section-heading">
          <h2>{words.model}</h2>
          <p>{words.modelBody}</p>
        </div>
        <div className="feature-rows">
          {words.pillars.map((title, index) => {
            const Icon = icons[index];
            return (
              <div key={title}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>
                    <BrandText text={words.descriptions[index]} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <HardwareCollection />
      <section className="studio-section studio-container">
        <div className="section-heading">
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
      <section className="studio-section studio-contact">
        <div className="studio-container">
          <h2 className="text-4xl font-semibold">
            <BrandText text={words.contact} />
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {words.contactBody}
          </p>
          <div className="studio-actions !justify-start mt-8">
            <InvestorContactDialog />
            <a href="mailto:rodrigo@rosapadel.com" className="studio-link">
              rodrigo@rosapadel.com
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
