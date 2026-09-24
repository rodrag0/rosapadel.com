import { useEffect } from "react";
import Navbar from "@/components/rosa/Navbar";
import ExperienceHero from "@/components/rosa/ExperienceHero";
import {
  ValueStrip,
  ProductEcosystem,
  MatchFlow,
  AudienceSection,
  EventsTeaser,
  MatchProof,
} from "@/components/rosa/HomeSections";
import Partners from "@/components/rosa/Partners";
import ContactCTA from "@/components/rosa/ContactCTA";
import Footer from "@/components/rosa/Footer";
import { useLanguage } from "@/components/rosa/LanguageProvider";

const Index = () => {
  const { copy } = useLanguage();

  useEffect(() => {
    document.title = copy.meta.homeTitle;

    const description =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const element = document.createElement("meta");
        element.setAttribute("name", "description");
        document.head.appendChild(element);
        return element;
      })();

    description.setAttribute("content", copy.meta.homeDescription);
  }, [copy.meta.homeDescription, copy.meta.homeTitle]);

  return (
    // The section order is the sales narrative; keep it intentional when adding or moving sections.
    <main className="experience-page min-h-screen bg-background text-foreground">
      <Navbar />
      <ExperienceHero />
      <ValueStrip />
      <ProductEcosystem />
      <MatchFlow />
      <AudienceSection />
      <EventsTeaser />
      <MatchProof />
      <Partners />
      <ContactCTA editorial />
      <Footer />
    </main>
  );
};

export default Index;
