import CourtsidePage, { DetailHero, DetailLink, DetailMedia } from "@/components/rosa/CourtsidePage";
import ContactCTA from "@/components/rosa/ContactCTA";
import { EventsShowcase } from "@/components/rosa/StudioSections";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import { visionContent } from "@/lib/visionContent";

export default function NewTab() {
  const { language } = useLanguage();
  const title = { en: "Padel tournaments & events", es: "Torneos y eventos de pádel", de: "Padel-Turniere und Events" }[language];
  const heading = { en: "On court. Connected.", es: "En cancha. Conectado.", de: "Auf dem Court. Vernetzt." }[language];
  return (
    <CourtsidePage className="detail-events-page">
      <DetailHero title={title} variant="events" image="/images/courtside/final-expo.webp"
        alt="Final Expo 2026 padel match with the ROSA live score" credit="Final Expo 2026 · ROSA" />
      <EventsShowcase showMore={false} />
      <section className="detail-section studio-container detail-event-connection">
        <div>
          <h2>{heading}</h2>
          <p>{visionContent[language].competition}</p>
          <DetailLink href="/products/vision">ROSA Vision</DetailLink>
        </div>
        <DetailMedia src="/images/courtside/invicto-check-in.webp" alt="Players checking in to a ROSA court with their phone"
          caption="Invicto Pádel · ROSA" width={1280} height={1707} />
      </section>
      <ContactCTA />
    </CourtsidePage>
  );
}
