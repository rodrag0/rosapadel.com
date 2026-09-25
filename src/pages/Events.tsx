import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ContactCTA from "@/components/rosa/ContactCTA";
import BrandText from "@/components/rosa/BrandText";
import AppScreenshot from "@/components/rosa/AppScreenshot";
import EventApplications from "@/components/rosa/EventApplications";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experienceCopy } from "@/lib/experienceCopy";
import { productPresentation } from "@/lib/productScreens";

export default function Events() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].events;
  const presentation = productPresentation[language];
  useEffect(() => {
    document.title = copy.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
  }, [copy.metaTitle, copy.metaDescription]);
  return (
    <main className="experience-page min-h-screen bg-background text-foreground">
      <Navbar />
      <section
        className="experience-hero experience-events-hero"
        aria-labelledby="events-heading"
      >
        <div className="hero-title">
          <h1 id="events-heading">{copy.title}</h1>
          <p className="hero-detail">{presentation.eventHeroBody}</p>
          <div className="experience-actions">
            <a className="experience-button" href="#contact">
              {copy.primary}
              <ArrowRight size={17} />
            </a>
            <a className="experience-text-link" href="#formats">
              {copy.secondary}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <AppScreenshot
          screen="venue"
          className="event-hero-screen"
          priority
          caption={false}
        />
        <p className="hero-caption">{presentation.eventCaption}</p>
      </section>
      <section id="formats" className="experience-section experience-container">
        <div className="experience-section-head">
          <h2>{presentation.eventScreens}</h2>
          <p className="experience-intro">
            <BrandText text={presentation.eventScreenBody} />
          </p>
        </div>
        <EventApplications />
      </section>
      <section className="experience-section experience-band">
        <div className="experience-container">
          <div className="experience-section-head">
            <h2>{presentation.integration}</h2>
            <p className="experience-intro"><BrandText text={presentation.integrationBody} /></p>
          </div>
          <ol className="score-connection">
            {presentation.flow.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <h3><BrandText text={step} /></h3>
                {index < 3 && <ArrowRight size={20} aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="connection-foot">
            <p><BrandText text={presentation.portableNote} /></p>
            <a href="/products/vision" className="experience-text-link">
              <BrandText text="rosa Vision" />
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="experience-section experience-container experience-faq">
        <h2>{copy.faqTitle}</h2>
        <Accordion type="single" collapsible>
          {copy.faqs.map((faq, index) => (
            <AccordionItem key={faq.title} value={`faq-${index}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent><BrandText text={faq.body} /></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <ContactCTA editorial defaultObjective="tournaments" />
      <Footer />
    </main>
  );
}
