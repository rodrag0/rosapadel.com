import { useEffect } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Hand,
  Monitor,
  Trophy,
  Tv,
} from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import ContactCTA from "@/components/rosa/ContactCTA";
import BrandText from "@/components/rosa/BrandText";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experienceCopy } from "@/lib/experienceCopy";
import { experienceMedia } from "@/lib/experienceMedia";

export default function Events() {
  const { language } = useLanguage();
  const { events: copy, products } = experienceCopy[language];
  const icons = [Hand, Monitor, Trophy, Tv];

  useEffect(() => {
    document.title = copy.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", copy.metaDescription);
  }, [copy.metaTitle, copy.metaDescription]);

  return (
    <main className="experience-page min-h-screen bg-background text-foreground">
      <Navbar />
      <section
        className="experience-hero experience-events-hero"
        aria-labelledby="events-heading"
      >
        <img
          className="experience-hero-image"
          src={experienceMedia.matchPoster}
          alt=""
          fetchPriority="high"
        />
        <div className="experience-hero-shade" />
        <div className="experience-container experience-hero-content">
          <p className="experience-eyebrow">{copy.label}</p>
          <h1 id="events-heading">{copy.title}</h1>
          <p className="experience-hero-body">{copy.body}</p>
          <div className="experience-actions">
            <a className="experience-button" href="#contact">
              {copy.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="experience-button experience-button-ghost"
              href="#formats"
            >
              {copy.secondary}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="experience-hero-note">{copy.note}</p>
        </div>
      </section>
      <div className="experience-value-band">
        <div className="experience-container experience-values">
          {copy.capabilities.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title}>
                <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="experience-section experience-container">
        <div className="experience-section-head">
          <div>
            <p className="experience-eyebrow">{copy.connectionLabel}</p>
            <h2>{copy.connectionTitle}</h2>
          </div>
          <p className="experience-intro">{copy.connectionBody}</p>
        </div>
        <ol className="experience-flow experience-connection">
          {copy.connection.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.title}>
                <div className="experience-step-heading">
                  <span>0{index + 1}</span>
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="formats" className="experience-section experience-band">
        <div className="experience-container">
          <p className="experience-eyebrow">{copy.formatLabel}</p>
          <h2 className="experience-heading-limit">{copy.formatTitle}</h2>
          <p className="experience-intro experience-format-intro">
            {copy.formatBody}
          </p>
          <Tabs defaultValue="tournaments" className="experience-format-tabs">
            <TabsList
              className="experience-tabs-list"
              aria-label={copy.formatLabel}
            >
              {copy.formats.map((format) => (
                <TabsTrigger key={format.id} value={format.id}>
                  {format.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {copy.formats.map((format) => (
              <TabsContent
                key={format.id}
                value={format.id}
                className="experience-format-panel"
              >
                <div>
                  <h3>{format.title}</h3>
                  <p>{format.body}</p>
                  <ul className="experience-checklist">
                    {format.points.map((point) => (
                      <li key={point}>
                        <Check size={17} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a className="experience-text-link" href="#contact">
                    {copy.primary}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
                <figure className="experience-schedule">
                  <div className="experience-schedule-heading">
                    <Trophy size={21} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p>{copy.example}</p>
                      <h4>{format.round}</h4>
                    </div>
                  </div>
                  <div
                    className="experience-table-scroll"
                    role="region"
                    aria-label={copy.example}
                    tabIndex={0}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">{copy.court}</th>
                          <th scope="col">{copy.match}</th>
                          <th scope="col">{copy.stage}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {format.rows.map((row) => (
                          <tr key={row.court}>
                            <td>{row.court}</td>
                            <td>{row.match}</td>
                            <td>{row.stage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <figcaption>{copy.exampleNote}</figcaption>
                </figure>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="experience-section experience-container">
        <p className="experience-eyebrow">{copy.compatibilityLabel}</p>
        <h2 className="experience-heading-limit">{copy.compatibilityTitle}</h2>
        <div className="experience-core-products experience-compatibility">
          {[
            {
              name: "Core HD",
              status: products.ready,
              statusClass: "experience-status-ready",
              body: copy.hdBody,
              href: "/products/core-hd",
            },
            {
              name: "rosa Vision",
              status: products.pilot,
              statusClass: "experience-status-pilot",
              body: copy.visionBody,
              href: "/products/vision",
            },
          ].map((product) => (
            <article key={product.name}>
              <div className="experience-product-heading">
                <h3>
                  <BrandText text={product.name} />
                </h3>
                <span className={`experience-status ${product.statusClass}`}>
                  {product.status}
                </span>
              </div>
              <p>{product.body}</p>
              <a className="experience-text-link" href={product.href}>
                {products.discover}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <p className="experience-footnote">{copy.ledNote}</p>
      </section>

      <section className="experience-section experience-band">
        <div className="experience-container experience-faq">
          <h2>{copy.faqTitle}</h2>
          <Accordion type="single" collapsible>
            {copy.faqs.map((faq, index) => (
              <AccordionItem key={faq.title} value={`faq-${index}`}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <ContactCTA editorial defaultObjective="tournaments" />
      <Footer />
    </main>
  );
}
