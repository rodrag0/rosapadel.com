import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Pause,
  Play,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { visionContent } from "@/lib/visionContent";
import { MATCH_POSTER_URL, MATCH_PREVIEW_URL } from "@/lib/matchMedia";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";

const court = "/images/products/rosa-vision-court.webp";
const ROTATION_DELAY = 7000;
const media = {
  scoring: { src: court, width: 1600, height: 900, caption: "court" },
  stream: {
    src: MATCH_POSTER_URL,
    width: 1280,
    height: 720,
    caption: "recording",
  },
  replay: {
    src: MATCH_PREVIEW_URL,
    width: 1280,
    height: 720,
    caption: "recording",
    video: true,
  },
  var: { src: MATCH_POSTER_URL, width: 1280, height: 720, caption: "review" },
  analysis: {
    src: "/images/software/vision-shots.webp",
    width: 996,
    height: 801,
    caption: "shots",
  },
  coaching: {
    src: "/images/software/vision-movement.webp",
    width: 996,
    height: 605,
    caption: "movement",
  },
  players: {
    src: "/images/software/player.webp",
    width: 1440,
    height: 1000,
    caption: "demo",
  },
  club: {
    src: MATCH_POSTER_URL,
    width: 1280,
    height: 720,
    caption: "sponsors",
  },
} satisfies Record<
  string,
  {
    src: string;
    width: number;
    height: number;
    caption: string;
    video?: boolean;
  }
>;

const galleryCopy = {
  en: {
    label: "Explore Vision features",
    expand: "View full image",
    previous: "Previous feature",
    next: "Next feature",
    pause: "Pause automatic rotation",
    resume: "Resume automatic rotation",
    short: [
      "Scoring",
      "Livestream",
      "Replay",
      "VAR",
      "AI analysis",
      "Coaching",
      "Player app",
      "Your club",
    ],
    captions: {
      court: "ROSA Vision · Court installation",
      recording: "Final Expo 2026 · Recorded footage with score",
      review: "Real match footage · Video review context",
      shots: "Final Expo 2026 · Saved shot classifications",
      movement: "Real match analysis · Estimated positions and metrics",
      demo: "ROSA player app · Demo environment",
      sponsors: "Final Expo 2026 · Score and sponsor presentation",
    },
  },
  es: {
    label: "Explora las funciones de Vision",
    expand: "Ver imagen completa",
    previous: "Función anterior",
    next: "Siguiente función",
    pause: "Pausar rotación automática",
    resume: "Reanudar rotación automática",
    short: [
      "Marcador",
      "Livestream",
      "Replay",
      "VAR",
      "Análisis IA",
      "Coaching",
      "App de jugadores",
      "Tu club",
    ],
    captions: {
      court: "ROSA Vision · Instalación en cancha",
      recording: "Final Expo 2026 · Grabación con marcador",
      review: "Video de un partido real · Contexto de revisión",
      shots: "Final Expo 2026 · Clasificaciones de golpes guardadas",
      movement: "Análisis de un partido real · Posiciones y métricas estimadas",
      demo: "App ROSA para jugadores · Entorno de demostración",
      sponsors: "Final Expo 2026 · Marcador y patrocinadores",
    },
  },
  de: {
    label: "Vision-Funktionen entdecken",
    expand: "Bild vollständig ansehen",
    previous: "Vorherige Funktion",
    next: "Nächste Funktion",
    pause: "Automatischen Wechsel pausieren",
    resume: "Automatischen Wechsel fortsetzen",
    short: [
      "Spielstand",
      "Livestream",
      "Replay",
      "VAR",
      "KI-Analyse",
      "Coaching",
      "Spieler-App",
      "Dein Club",
    ],
    captions: {
      court: "ROSA Vision · Court-Installation",
      recording: "Final Expo 2026 · Aufzeichnung mit Spielstand",
      review: "Echtes Matchvideo · Kontext für Videoreview",
      shots: "Final Expo 2026 · Gespeicherte Schlagklassifikationen",
      movement:
        "Analyse eines echten Matches · Geschätzte Positionen und Metriken",
      demo: "ROSA-Spieler-App · Demo-Umgebung",
      sponsors: "Final Expo 2026 · Spielstand und Sponsoren",
    },
  },
};

function FeatureMedia({
  id,
  caption,
  name,
  onPlaybackChange,
}: {
  id: keyof typeof media;
  caption: string;
  name: string;
  onPlaybackChange: (playing: boolean) => void;
}) {
  const [failed, setFailed] = useState(false);
  const { language } = useLanguage();
  const selected = media[id];
  const fallbackCaption = galleryCopy[language].captions.court;
  return (
    <figure className="vision-feature-media">
      <div className="vision-media-stage" data-media={id}>
        {!failed && "video" in selected ? (
          <video
            controls
            playsInline
            preload="none"
            poster={MATCH_POSTER_URL}
            width={selected.width}
            height={selected.height}
            aria-label={name}
            onPlay={() => onPlaybackChange(true)}
            onPause={() => onPlaybackChange(false)}
            onEnded={() => onPlaybackChange(false)}
            onError={() => {
              setFailed(true);
              onPlaybackChange(false);
            }}
          >
            <source src={selected.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={failed ? court : selected.src}
            alt={failed ? fallbackCaption : caption}
            width={failed ? 1600 : selected.width}
            height={failed ? 900 : selected.height}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption>
        <span>{failed ? fallbackCaption : caption}</span>
        {(failed || !("video" in selected)) && (
          <a
            className="vision-media-expand"
            href={failed ? court : selected.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={galleryCopy[language].expand}
            title={galleryCopy[language].expand}
          >
            <Expand size={17} aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export default function VisionFeatureGallery() {
  const { copy, language } = useLanguage();
  const product = copy.productFamily.items[0];
  const vision = visionContent[language];
  const words = galleryCopy[language];
  const [active, setActive] = useState("scoring");
  const [enhanced, setEnhanced] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    () =>
      typeof document === "undefined" || document.visibilityState !== "hidden",
  );
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [interaction, setInteraction] = useState(0);
  const mobile = useIsMobile();
  const list = useRef<HTMLDivElement>(null);
  const display = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const index = vision.features.findIndex((feature) => feature.id === active);
  useEffect(() => setEnhanced(true), []);
  useEffect(() => {
    if (!display.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35] },
    );
    observer.observe(display.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () =>
      setDocumentVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", update);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => {
      if (preference.matches) setRotationEnabled(false);
    };
    preference.addEventListener("change", reduce);
    return () => {
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", reduce);
    };
  }, []);
  const rotating =
    enhanced &&
    rotationEnabled &&
    inView &&
    documentVisible &&
    !hovered &&
    !keyboardFocused &&
    !videoPlaying;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(
      () => setActive(vision.features[(index + 1) % vision.features.length].id),
      ROTATION_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, [rotating, index, vision.features, interaction]);
  useEffect(() => {
    if (!mobile || !list.current) return;
    const tab = list.current.querySelector<HTMLElement>(
      '[data-state="active"]',
    );
    if (tab)
      list.current.scrollTo({
        left: tab.offsetLeft - (list.current.clientWidth - tab.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, [active, mobile]);
  const select = (id: string) => {
    setActive(id);
    if (id !== active) setVideoPlaying(false);
    setInteraction((value) => value + 1);
  };
  const move = (direction: number) =>
    select(
      vision.features[
        (index + direction + vision.features.length) % vision.features.length
      ].id,
    );
  const startTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "touch" ||
      (event.target as HTMLElement).closest("video,button,a")
    )
      return;
    touch.current = { x: event.clientX, y: event.clientY };
  };
  const finishTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (!touch.current) return;
    const x = event.clientX - touch.current.x;
    const y = event.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(x) > 52 && Math.abs(x) > Math.abs(y) * 1.4)
      move(x < 0 ? 1 : -1);
  };
  return (
    <article
      className="hardware-row hardware-vision vision-gallery"
      data-rotation={rotationEnabled ? "automatic" : "paused"}
      data-rotating={rotating}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) =>
        setKeyboardFocused(event.target.matches(":focus-visible"))
      }
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setKeyboardFocused(false);
      }}
    >
      <header className="vision-gallery-heading">
        <div>
          <div className="hardware-title">
            <h3>
              <BrandText text={product.name} />
            </h3>
            <span className="product-availability">{product.status}</span>
          </div>
          <p className="hardware-tagline">{product.tagline}</p>
        </div>
        <p className="hardware-summary">{vision.intro}</p>
      </header>
      <Tabs
        value={active}
        onValueChange={select}
        orientation={mobile ? "horizontal" : "vertical"}
        className="vision-gallery-layout"
      >
        <div className="vision-feature-navigation">
          <TabsList
            ref={list}
            className="vision-feature-list"
            aria-label={words.label}
          >
            {vision.features.map((feature, position) => (
              <TabsTrigger
                asChild
                key={feature.id}
                value={feature.id}
                className="vision-feature-tab"
              >
                <a
                  href={`/products/vision#vision-${feature.id}`}
                  aria-label={feature.name}
                  onClick={(event) => {
                    if (
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.shiftKey &&
                      !event.altKey &&
                      event.button === 0
                    ) {
                      event.preventDefault();
                      select(feature.id);
                    }
                  }}
                >
                  <span className="vision-tab-full">{feature.name}</span>
                  <span className="vision-tab-short" aria-hidden="true">
                    {words.short[position]}
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div
          ref={display}
          className="vision-feature-display"
          onPointerDown={startTouch}
          onPointerUp={finishTouch}
          onPointerCancel={() => {
            touch.current = null;
          }}
        >
          {vision.features.map((feature) => {
            const selected = media[feature.id as keyof typeof media];
            const caption =
              words.captions[selected.caption as keyof typeof words.captions];
            return (
              <TabsContent
                key={feature.id}
                value={feature.id}
                className="vision-feature-panel"
              >
                <FeatureMedia
                  key={feature.id}
                  id={feature.id as keyof typeof media}
                  name={feature.name}
                  caption={caption}
                  onPlaybackChange={setVideoPlaying}
                />
                <div className="vision-feature-copy">
                  <h4>{feature.name}</h4>
                  <p>{feature.body}</p>
                </div>
              </TabsContent>
            );
          })}
          {enhanced && (
            <div className="vision-gallery-controls">
              <span aria-live={rotating ? "off" : "polite"} aria-atomic="true">
                {String(index + 1).padStart(2, "0")}{" "}
                <span aria-hidden="true">/</span> <span>08</span>
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setRotationEnabled((value) => !value);
                    setKeyboardFocused(false);
                  }}
                  aria-pressed={!rotationEnabled}
                  aria-label={rotationEnabled ? words.pause : words.resume}
                  title={rotationEnabled ? words.pause : words.resume}
                >
                  {rotationEnabled ? (
                    <Pause size={18} aria-hidden="true" />
                  ) : (
                    <Play size={18} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={words.previous}
                  title={words.previous}
                >
                  <ArrowLeft size={19} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={words.next}
                  title={words.next}
                >
                  <ArrowRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
        <a
          href={product.href}
          className="studio-link vision-gallery-product-link"
        >
          {copy.productFamily.viewProduct}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </Tabs>
    </article>
  );
}
