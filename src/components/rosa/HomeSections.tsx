import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  Hand,
  Instagram,
  Linkedin,
  Monitor,
  Play,
  RotateCcw,
  Trophy,
  Users,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";
import CourtPreview from "./CourtPreview";
import { experienceCopy } from "@/lib/experienceCopy";
import { experienceMedia } from "@/lib/experienceMedia";

export function ValueStrip() {
  const { language } = useLanguage();
  const icons = [Hand, RotateCcw, BarChart3, Trophy];
  return (
    <div className="experience-value-band">
      <div className="experience-container experience-values">
        {experienceCopy[language].values.map((item, index) => {
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
  );
}

export function ProductEcosystem() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].products;
  return (
    <section id="products" className="experience-section experience-container">
      <div className="experience-section-head">
        <div>
          <p className="experience-eyebrow">
            <BrandText text={copy.label} />
          </p>
          <h2>{copy.title}</h2>
        </div>
        <p className="experience-intro">{copy.body}</p>
      </div>
      <div className="experience-vision-feature">
        <div className="experience-vision-copy">
          <span className="experience-status experience-status-pilot">
            {copy.pilot}
          </span>
          <h3>
            <BrandText text="rosa Vision" />
          </h3>
          <p>{copy.vision}</p>
          <ul className="experience-checklist">
            {copy.visionFeatures.map((item) => (
              <li key={item}>
                <Check size={17} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a className="experience-text-link" href="/products/vision">
            {copy.discover}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <CourtPreview label={copy.illustration} />
      </div>
      <div className="experience-core-products">
        {[
          {
            name: "Core HD",
            href: "/products/core-hd",
            body: copy.coreHd,
            features: copy.coreHdFeatures,
          },
          {
            name: "Core LED",
            href: "/products/core-led",
            body: copy.coreLed,
            features: copy.coreLedFeatures,
          },
        ].map((product) => (
          <article key={product.name}>
            <div className="experience-product-heading">
              <Monitor size={25} strokeWidth={1.5} aria-hidden="true" />
              <h3>{product.name}</h3>
              <span className="experience-status experience-status-ready">
                {copy.ready}
              </span>
            </div>
            <p>{product.body}</p>
            <p className="experience-product-features">{product.features}</p>
            <a className="experience-text-link" href={product.href}>
              {copy.discover}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MatchFlow() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].flow;
  const icons = [Hand, RotateCcw, BarChart3];
  return (
    <section id="how-it-works" className="experience-section experience-band">
      <div className="experience-container">
        <p className="experience-eyebrow">{copy.label}</p>
        <h2>{copy.title}</h2>
        <ol className="experience-flow">
          {copy.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <li key={step.title}>
                <div className="experience-step-heading">
                  <span>0{index + 1}</span>
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>
                  <BrandText text={step.body} />
                </p>
              </li>
            );
          })}
        </ol>
        <p className="experience-footnote">{copy.note}</p>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const { language, copy: site } = useLanguage();
  const copy = experienceCopy[language].audiences;
  return (
    <section id="players" className="experience-section experience-container">
      <p className="experience-eyebrow">{copy.label}</p>
      <h2 className="experience-heading-limit">{copy.title}</h2>
      <div className="experience-audiences">
        {[
          {
            ...copy.clubs,
            label: site.nav.forClubs,
            icon: Building2,
            href: "/for-clubs",
          },
          {
            ...copy.players,
            label: experienceCopy[language].nav.players,
            icon: Users,
            href: "/products/vision",
          },
        ].map((item) => (
          <article key={item.label}>
            <p className="experience-audience-label">
              <item.icon size={23} strokeWidth={1.5} aria-hidden="true" />
              {item.label}
            </p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <ul className="experience-checklist">
              {item.points.map((point) => (
                <li key={point}>
                  <Check size={17} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <a className="experience-text-link" href={item.href}>
              <BrandText text={item.cta} />
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventsTeaser() {
  const { language } = useLanguage();
  const copy = experienceCopy[language].eventsTeaser;
  return (
    <section id="tournaments" className="experience-section experience-band">
      <div className="experience-container experience-events-teaser">
        <div>
          <p className="experience-eyebrow">{copy.label}</p>
          <h2>{copy.title}</h2>
          <p className="experience-intro">{copy.body}</p>
          <a className="experience-button" href="/events">
            {copy.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="experience-format-list">
          {copy.formats.map((format, index) => (
            <a key={format.title} href="/events#formats">
              <span className="experience-format-number">0{index + 1}</span>
              <div>
                <h3>{format.title}</h3>
                <p>{format.body}</p>
              </div>
              <ArrowUpRight size={21} aria-hidden="true" />
            </a>
          ))}
        </div>
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
            <div className="experience-video-error">
              <p>{copy.error}</p>
              <a href="#contact" className="experience-text-link">
                {copy.email}
                <ArrowUpRight size={18} aria-hidden="true" />
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
                <Play size={24} fill="currentColor" aria-hidden="true" />
                {copy.play}
              </span>
            </button>
          )}
        </div>
        <figcaption className="experience-video-caption">
          {copy.caption}
        </figcaption>
      </figure>
      <div className="experience-community">
        <div>
          <h3>{copy.social}</h3>
          <p>
            <BrandText text={copy.socialBody} />
          </p>
        </div>
        <div>
          <a
            href="https://www.instagram.com/rosa.padel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} aria-hidden="true" />
            Instagram
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/company/rosa-padel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} aria-hidden="true" />
            LinkedIn
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
