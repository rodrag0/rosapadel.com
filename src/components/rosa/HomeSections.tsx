import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";
import AppScreenshot from "./AppScreenshot";
import EventApplications from "./EventApplications";
import { experienceCopy } from "@/lib/experienceCopy";
import { experienceMedia } from "@/lib/experienceMedia";
import { productPresentation } from "@/lib/productScreens";
import { hardwareProducts, productCatalog } from "@/lib/productCatalog";

export function ProductEcosystem() {
  const { language } = useLanguage();
  const copy = productCatalog[language];
  return (
    <section id="products" className="experience-section experience-container">
      <div className="experience-section-head">
        <div>
          <p className="experience-eyebrow">
            <BrandText text={copy.label} />
          </p>
          <h2>{copy.title}</h2>
        </div>
        <p className="experience-intro"><BrandText text={copy.body} /></p>
      </div>
      <div className="product-lineup">
        {hardwareProducts.map((product, index) => (
          <article key={product.name}>
            <span className="product-lineup-index">0{index + 1}</span>
            <h3>
              <BrandText text={product.name} />
            </h3>
            <p><BrandText text={copy[product.id].body} /></p>
            <ul className="player-capabilities">
              {copy[product.id].features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <div>
              <span className="product-lineup-note">{copy[product.id].note}</span>
              <a
                href={product.href}
                aria-label={`${copy.discover}: ${product.name}`}
                title={copy.discover}
              >
                <ArrowRight size={21} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="catalog-subscriptions">
        <div>
          <p className="experience-eyebrow">{copy.subscriptions}</p>
          <h3>{copy.subscriptionTitle}</h3>
          <p className="experience-intro">{copy.subscriptionBody}</p>
        </div>
        <a href="/subscriptions" className="experience-text-link">
          {copy.subscriptions}<ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function MatchFlow() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].flow;
  return (
    <section id="how-it-works" className="experience-section experience-band">
      <div className="experience-container">
        <p className="experience-eyebrow">{copy.label}</p>
        <h2>{copy.title}</h2>
        <ol className="experience-flow">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span className="flow-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>
                <BrandText text={step.body} />
              </p>
            </li>
          ))}
        </ol>
        <p className="experience-footnote">{copy.note}</p>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const { language } = useLanguage();
  const copy = productPresentation[language];
  return (
    <section
      id="players"
      className="experience-section experience-container player-story"
    >
      <div className="player-story-copy">
        <p className="experience-eyebrow">{copy.playerLabel}</p>
        <h2>{copy.playerTitle}</h2>
        <p className="experience-intro">{copy.playerBody}</p>
        <ul className="player-capabilities">
          {copy.playerFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <a href="/subscriptions#player" className="experience-text-link">
          <BrandText text="rosa Player" />
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <p className="experience-footnote">
          <BrandText text={copy.playerNote} />
        </p>
      </div>
      <AppScreenshot screen="player" mobile className="player-story-screen" />
    </section>
  );
}

export function EventsTeaser() {
  const { language } = useLanguage();
  const copy = productPresentation[language];
  return (
    <section id="tournaments" className="experience-section experience-band">
      <div className="experience-container">
        <div className="experience-section-head">
          <div>
            <p className="experience-eyebrow">
              {experienceCopy[language].eventsTeaser.label}
            </p>
            <h2>{copy.eventsTitle}</h2>
          </div>
          <p className="experience-intro">{copy.eventsBody}</p>
        </div>
        <EventApplications compact />
      </div>
    </section>
  );
}

export function MatchProof() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].proof;
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <section
      id="real-match"
      className="experience-section experience-container"
    >
      <div className="experience-section-head">
        <div>
          <p className="experience-eyebrow">{copy.label}</p>
          <h2>{copy.title}</h2>
        </div>
        <p className="experience-intro">
          <BrandText text={copy.body} />
        </p>
      </div>
      <figure>
        <div className="experience-match-video">
          {failed ? (
            <div className="experience-video-error" role="status">
              <p>{copy.error}</p>
              <a href="#contact" className="experience-text-link">
                {copy.email}
                <ArrowRight size={18} />
              </a>
            </div>
          ) : playing ? (
            <video
              controls
              autoPlay
              playsInline
              preload="none"
              poster={experienceMedia.matchPoster}
              aria-label={copy.videoLabel}
              onError={() => setFailed(true)}
              src={experienceMedia.matchVideo}
            />
          ) : (
            <button
              className="experience-play-video"
              onClick={() => setPlaying(true)}
              aria-label={copy.play}
            >
              <img
                src={experienceMedia.matchPoster}
                alt={copy.videoLabel}
                loading="lazy"
                width="1280"
                height="720"
              />
              <span>
                <Play size={20} fill="currentColor" aria-hidden="true" />
                {copy.play}
              </span>
            </button>
          )}
        </div>
        <figcaption className="experience-video-caption">
          {copy.caption}
        </figcaption>
      </figure>
    </section>
  );
}
