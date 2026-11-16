import { useEffect, useRef, useState, type ReactNode } from "react";
import { Content as DialogSurface } from "@radix-ui/react-dialog";
import { ArrowDown, ArrowUpRight, Box, Maximize2, Pause, Play, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courtsideCopy } from "@/lib/courtsideCopy";
import { MATCH_PREVIEW_URL, MATCH_SHARE_URL } from "@/lib/matchMedia";
import rosaIconDark from "@/assets/rosa-icon-dark.svg";
import rosaLogoLight from "@/assets/rosa-logo-light.png";
import CourtExperience from "./CourtExperience";
import { useLanguage } from "./LanguageProvider";
import { RosaWordmark } from "./ProductTitle";

const matchStill = "/images/courtside/final-expo.webp";
const workflowMedia = [
  {
    id: "scan",
    src: "/images/courtside/invicto-check-in.webp",
    width: 1280,
    height: 1707,
    href: "https://cloud.rosapadel.com/help/index.html",
  },
  {
    id: "play",
    src: matchStill,
    width: 1280,
    height: 720,
    href: "/products/vision",
  },
  {
    id: "watch",
    src: "/images/courtside/match-review.webp",
    width: 1080,
    height: 720,
    href: MATCH_SHARE_URL,
  },
] as const;
const matchReview = "/images/courtside/match-review.mp4";
const SHARE_ROTATION_MS = 4000;
const statOverlays = [
  "/images/courtside/movement-overlay.png",
  "/images/courtside/heatmap-overlay.png",
] as const;

function MediaDialog({
  trigger,
  close,
  children,
  fullScreen = false,
}: {
  trigger: ReactNode;
  close: string;
  children: ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="courtside-dialog-overlay" />
        <DialogSurface
          className={`courtside-dialog ${fullScreen ? "courtside-dialog-full" : ""}`}
        >
          <DialogClose className="courtside-dialog-close" aria-label={close} title={close}>
            <X size={22} aria-hidden="true" />
          </DialogClose>
          {children}
        </DialogSurface>
      </DialogPortal>
    </Dialog>
  );
}

export function CourtsideHero() {
  const { language } = useLanguage();
  const words = courtsideCopy[language].hero;
  return (
    <section className="courtside-opening" id="real-match" aria-labelledby="courtside-title">
      <div className="courtside-frame">
        <figure className="courtside-poster-photo">
          <img
            className="courtside-frame-image"
            src="/images/courtside/invicto-court.webp"
            alt={words.alt}
            width="1280"
            height="1707"
          />
        </figure>
        <div className="courtside-poster-copy">
          <p className="courtside-subtitle">{words.line}</p>
          <p className="courtside-intro">{words.body}</p>
          <a href="#court-controls" className="courtside-poster-action">
            {words.court} <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
        <h1 className="courtside-poster-title" id="courtside-title">
          <span className="sr-only">rosa vision</span>
          <picture className="courtside-poster-mark" aria-hidden="true">
            <source media="(max-width: 820px)" srcSet={rosaLogoLight} />
            <RosaWordmark className="courtside-poster-logo" alt="" />
          </picture>
          <span className="courtside-poster-vision" aria-hidden="true">
            VISION<span className="courtside-poster-overprint">VISION</span>
          </span>
        </h1>
        <span className="courtside-poster-credit">Invicto Pádel</span>
      </div>
      <div className="courtside-film-strip">
        <div className="studio-container courtside-film-info">
          <MediaDialog
            close={words.close}
            trigger={
              <button className="courtside-replay" type="button" aria-label={`${words.play}: ${words.caption}`}>
                <span className="courtside-replay-icon">
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                </span>
                <span className="courtside-replay-label">{words.play}</span>
                <span className="courtside-replay-source">{words.caption}</span>
              </button>
            }
          >
            <div className="courtside-dialog-heading">
              <DialogTitle className="courtside-dialog-title">{words.video}</DialogTitle>
              <DialogDescription className="courtside-dialog-description">{words.caption}</DialogDescription>
            </div>
            <video
              className="courtside-dialog-video"
              poster={matchStill}
              aria-label={words.video}
              width="1280"
              height="720"
              autoPlay
              muted
              playsInline
              controls
            >
              <source src={MATCH_PREVIEW_URL} type="video/mp4" />
            </video>
            <div className="courtside-dialog-footer">
              <a href={MATCH_SHARE_URL} target="_blank" rel="noopener noreferrer">
                {words.full} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </MediaDialog>
          <div className="courtside-film-credit">
            <span>{words.credit}</span>
            <a href={MATCH_SHARE_URL} target="_blank" rel="noopener noreferrer">
              {words.caption} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
          <a href="#how-it-works" className="courtside-film-next" aria-label={words.how} title={words.how}>
            <span>{words.how}</span><ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CourtsideProof() {
  const { language } = useLanguage();
  const words = courtsideCopy[language].proof;
  const scoringClip = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = scoringClip.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previewStarted = false;
    let previewPlaying = false;

    const stopPreview = () => {
      if (previewPlaying && !video.paused) video.pause();
      previewPlaying = false;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.7) {
        stopPreview();
        return;
      }
      if (previewStarted || motion.matches || !video.paused || video.currentTime > 0) return;
      previewStarted = true;
      previewPlaying = true;
      void video.play().catch(() => { previewPlaying = false; });
    }, { threshold: 0.7 });

    const onMotionChange = () => { if (motion.matches) stopPreview(); };
    const onPause = () => { previewPlaying = false; };
    observer.observe(video);
    video.addEventListener("pause", onPause);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section id="court-controls" className="courtside-proof scroll-mt-24" aria-labelledby="courtside-proof-title">
      <div className="studio-container">
        <header className="courtside-proof-heading">
          <h2 id="courtside-proof-title">{words.title[0]}<br />{words.title[1]}</h2>
          <p>{words.body}</p>
        </header>
        <figure className="courtside-scoring-film">
          <figcaption>{words.caption}</figcaption>
          <video
            ref={scoringClip}
            aria-label={words.caption}
            aria-describedby="courtside-scoring-note"
            width="1280"
            height="720"
            poster="/images/courtside/point-then-score.webp"
            controls
            muted
            playsInline
            preload="none"
          >
            <source src="/images/courtside/point-then-score.mp4" type="video/mp4" />
          </video>
          <p id="courtside-scoring-note">{words.note}</p>
        </figure>
      </div>
    </section>
  );
}

export function CourtsideWorkflow() {
  const { language } = useLanguage();
  const words = courtsideCopy[language].workflow;
  return (
    <section
      id="how-it-works"
      className="courtside-workflow studio-section studio-container scroll-mt-24"
      aria-labelledby="courtside-workflow-title"
    >
      <header className="courtside-workflow-header">
        <h2 id="courtside-workflow-title">{words.title}</h2>
        <p>{words.intro}</p>
      </header>
      <Tabs defaultValue="scan" className="courtside-steps">
        <TabsList className="courtside-tablist" aria-labelledby="courtside-workflow-title">
          {workflowMedia.map(({ id }, index) => (
            <TabsTrigger key={id} value={id} className="courtside-tab">
              <span className="courtside-tab-number" aria-hidden="true">0{index + 1}</span>
              <span>{words.tabs[index]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {workflowMedia.map(({ id, src, width, height, href }, index) => {
          const step = words.steps[index];
          const external = href.startsWith("https://");
          return (
            <TabsContent key={id} value={id} className="courtside-step" data-step={id}>
              <div className="courtside-step-copy">
                <h3>{step.title}</h3>
                <ol>
                  {step.items.map((item) => <li key={item}>{item}</li>)}
                </ol>
                <div className="courtside-step-links">
                  <a
                    className="studio-link"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {step.action} <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  {id === "watch" && (
                    <a className="studio-link courtside-secondary-link" href="/rosa-app#page=club">
                      {words.player} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              <figure className="courtside-step-media">
                <div className="courtside-step-image">
                  {id === "watch" ? (
                    <video aria-label={step.alt} poster={src} width={width} height={height} controls playsInline preload="none">
                      <source src={matchReview} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={src} alt={step.alt} width={width} height={height} loading="lazy" />
                  )}
                </div>
                <figcaption>
                  <span>{step.caption}</span>
                  <a
                    href={id === "watch" ? matchReview : src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={id === "watch" ? words.openWalkthrough : words.inspect}
                    title={id === "watch" ? words.openWalkthrough : words.inspect}
                  >
                    <Maximize2 size={16} aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

export function CourtsideShare() {
  const { language } = useLanguage();
  const words = courtsideCopy[language].sharing;
  const [selected, setSelected] = useState(0);
  const [rotationEnabled, setRotationEnabled] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const story = useRef<HTMLDivElement>(null);
  const rotating = rotationEnabled && inView && pageVisible;

  useEffect(() => {
    if (!story.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
    }, { threshold: 0.35 });
    observer.observe(story.current);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setRotationEnabled(false);
    };
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    updateVisibility();
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(
      () => setSelected((selected + 1) % statOverlays.length),
      SHARE_ROTATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [rotating, selected]);

  return (
    <section id="share-stats" className="courtside-sharing scroll-mt-24" aria-labelledby="courtside-share-title">
      <div className="studio-container courtside-sharing-layout">
        <div className="courtside-sharing-copy">
          <h2 id="courtside-share-title">{words.title}</h2>
          <p>{words.body}</p>
          <div className="courtside-sharing-options" role="group" aria-label={words.samples}>
            {words.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className="courtside-sharing-option"
                aria-pressed={selected === index}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) setRotationEnabled(false);
                }}
                onClick={() => {
                  setSelected(index);
                  setRotationEnabled(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <a className="studio-link" href={MATCH_SHARE_URL} target="_blank" rel="noopener noreferrer">
            {words.action} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <figure className="courtside-sharing-figure">
          <div className="courtside-sharing-story" ref={story}>
            <img className="courtside-story-court" src={matchStill} alt="" width="1280" height="720" loading="lazy" />
            {statOverlays.map((src, index) => (
              <img
                key={src}
                className="courtside-sharing-overlay"
                src={src}
                alt={words.alt[index]}
                aria-hidden={selected !== index}
                width="1080"
                height="1350"
                loading="lazy"
              />
            ))}
            <div className="courtside-story-header">
              <div className="courtside-story-progress" aria-hidden="true">
                {statOverlays.map((src, index) => (
                  <span
                    className="courtside-story-segment"
                    key={src}
                    data-filled={index < selected || (index === selected && !rotating)}
                  >
                    {rotating && index === selected && (
                      <span className="courtside-story-timer" style={{ animationDuration: `${SHARE_ROTATION_MS}ms` }} />
                    )}
                  </span>
                ))}
              </div>
              <div className="courtside-story-profile">
                <span className="courtside-story-avatar">
                  <img src={rosaIconDark} width="22" height="22" loading="lazy" alt="" />
                </span>
                <strong>rosa.padel</strong>
                <button
                  className="courtside-sharing-rotation"
                  type="button"
                  aria-label={rotationEnabled ? words.pause : words.resume}
                  title={rotationEnabled ? words.pause : words.resume}
                  onClick={() => setRotationEnabled((enabled) => !enabled)}
                >
                  {rotationEnabled ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
          <figcaption>{words.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function CourtViewer() {
  const { language } = useLanguage();
  const words = courtsideCopy[language].court;
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className="courtside-dialog-heading">
        <DialogTitle className="courtside-dialog-title">{words.title}</DialogTitle>
        <DialogDescription className="courtside-dialog-description">
          {words.description}
        </DialogDescription>
      </div>
      <CourtExperience paused={paused} />
      <div className="courtside-dialog-footer">
        <button className="courtside-model-motion" type="button" onClick={() => setPaused(!paused)}>
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? words.play : words.pause}
        </button>
      </div>
    </>
  );
}

export function CourtsideStudio() {
  const { language } = useLanguage();
  const { court, hero } = courtsideCopy[language];
  return (
    <div className="courtside-studio studio-container">
      <div className="courtside-origins">
        <span><img src="/images/flags/de.svg" alt="" width="20" height="15" />{court.german}</span>
        <span><img src="/images/flags/mx.svg" alt="" width="20" height="15" />{court.mexican}</span>
      </div>
      <MediaDialog
        close={hero.close}
        fullScreen
        trigger={
          <button className="courtside-model-button" type="button" aria-label={court.open} title={court.open}>
            <Box size={19} aria-hidden="true" />
            <span className="courtside-model-label">{court.open}</span>
            <span className="courtside-model-short" aria-hidden="true">3D</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        }
      >
        <CourtViewer />
      </MediaDialog>
    </div>
  );
}
