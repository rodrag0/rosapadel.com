import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { getIntroFrame } from "@/lib/introMotion";
import logoDark from "@/assets/rosa-logo-dark.png";
import logoLight from "@/assets/rosa-logo-light.png";
import iconDark from "@/assets/rosa-icon-dark.svg";
import iconLight from "@/assets/rosa-icon-light.svg";

const IntroScene = lazy(() => import("./IntroScene"));

function canAnimateIntro() {
  if (
    typeof window === "undefined" ||
    !window.WebGLRenderingContext ||
    !window.IntersectionObserver ||
    window.location.hash ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return false;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroSection() {
  const { copy, language } = useLanguage();
  const { theme } = useTheme();
  const target = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const idleTarget = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(canAnimateIntro);
  const [sceneReady, setSceneReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const animated = capable && !reducedMotion;
  const inView = useInView(animated ? sticky : idleTarget, { amount: 0.01 });
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const wordmarkOpacity = useTransform(
    scrollYProgress,
    (value) => getIntroFrame(value).wordmarkOpacity,
  );
  const wordmarkScale = useTransform(
    scrollYProgress,
    (value) => getIntroFrame(value).wordmarkScale,
  );
  const wordmarkY = useTransform(
    scrollYProgress,
    (value) => getIntroFrame(value).wordmarkY,
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    (value) => getIntroFrame(value).copyOpacity,
  );
  const copyY = useTransform(copyOpacity, [0, 1], [24, 0]);
  const [phase, setPhase] = useState("symbol");
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (target.current) target.current.dataset.progress = value.toFixed(3);
    setPhase(value < 0.3 ? "symbol" : value < 0.61 ? "wordmark" : "court");
  });
  useEffect(() => {
    const update = () =>
      setDocumentVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const ready = useCallback(() => setSceneReady(true), []);
  const fail = useCallback(() => setCapable(false), []);
  const words = {
    en: {
      intro: "The connected padel court.",
      body: "Live scoring. Replay. VAR.",
      status: "Pre-sale",
      explore: "Explore vision",
      match: "See a real match",
      next: "Explore products",
      scene: "ROSA symbol becoming the wordmark and connected padel court",
    },
    es: {
      intro: "La cancha de pádel conectada.",
      body: "Marcador en vivo. Replay. VAR.",
      status: "Preventa",
      explore: "Conoce vision",
      match: "Ver un partido real",
      next: "Explorar productos",
      scene:
        "El símbolo ROSA se transforma en el logotipo y la cancha de pádel conectada",
    },
    de: {
      intro: "Der vernetzte Padel-Court.",
      body: "Live-Spielstand. Replay. VAR.",
      status: "Vorverkauf",
      explore: "vision entdecken",
      match: "Ein echtes Match ansehen",
      next: "Produkte entdecken",
      scene: "Das ROSA-Symbol wird zum Logo und vernetzten Padel-Court",
    },
  }[language];
  const logo = theme === "dark" ? logoDark : logoLight;
  return (
    <section
      ref={target}
      className="cinematic-intro"
      data-motion={animated ? "scroll" : "static"}
      data-phase={phase}
      data-scene-ready={sceneReady}
      aria-labelledby="hero-title"
    >
      <div ref={sticky} className="intro-sticky">
        {animated && (
          <div className="intro-scene" role="img" aria-label={words.scene}>
            <SceneBoundary onFail={fail}>
              <Suspense fallback={null}>
                <IntroScene
                  progress={scrollYProgress}
                  theme={theme}
                  onReady={ready}
                  active={inView && documentVisible}
                  paused={paused}
                />
              </Suspense>
            </SceneBoundary>
          </div>
        )}
        <div className="intro-symbol-fallback" aria-hidden="true">
          <img
            src={theme === "dark" ? iconDark : iconLight}
            alt=""
            width="220"
            height="220"
          />
        </div>
        <motion.div
          className="intro-wordmark"
          aria-hidden="true"
          style={
            animated
              ? { opacity: wordmarkOpacity, scale: wordmarkScale, y: wordmarkY }
              : undefined
          }
        >
          <img src={logo} alt="" width="600" height="180" />
        </motion.div>
        <motion.div
          className="intro-product-copy"
          data-active={!animated || phase === "court"}
          style={animated ? { opacity: copyOpacity, y: copyY } : undefined}
        >
          <div className="intro-product-title">
            <h1 id="hero-title">
              <img src={logo} alt="rosa" width="200" height="60" />
              <span>vision</span>
            </h1>
            <p className="product-availability">{words.status}</p>
          </div>
          <p className="intro-category">{words.intro}</p>
          <p className="intro-description">{words.body}</p>
          <div className="studio-actions">
            <a href="/products/vision" className="studio-button">
              {words.explore}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="#real-match" className="studio-link">
              {words.match}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
        <img
          className="intro-static-court"
          data-court-preview
          src="/images/products/rosa-vision-court.webp"
          alt={copy.hero.sceneAlt}
          width="1600"
          height="900"
        />
        <div className="intro-baseline studio-container">
          <div className="brand-origins" data-brand-origin>
            <span>
              <img src="/images/flags/de.svg" alt="" width="20" height="15" />
              {copy.hero.origin.technology}
            </span>
            <span>
              <img src="/images/flags/mx.svg" alt="" width="20" height="15" />
              {copy.hero.origin.heart}
            </span>
          </div>
          <div className="intro-navigation">
            <a
              className="intro-chapter-cue"
              href="#products"
              aria-label={words.next}
            >
              <span>
                rosa <strong>vision</strong>
              </span>
              <span>{words.body}</span>
              <ArrowDown size={20} aria-hidden="true" />
            </a>
            {animated && (
              <button
                className="intro-motion-toggle"
                type="button"
                aria-pressed={paused}
                aria-label={
                  paused
                    ? {
                        en: "Resume motion",
                        es: "Reanudar movimiento",
                        de: "Bewegung fortsetzen",
                      }[language]
                    : {
                        en: "Pause motion",
                        es: "Pausar movimiento",
                        de: "Bewegung pausieren",
                      }[language]
                }
                title={
                  paused
                    ? {
                        en: "Resume motion",
                        es: "Reanudar movimiento",
                        de: "Bewegung fortsetzen",
                      }[language]
                    : {
                        en: "Pause motion",
                        es: "Pausar movimiento",
                        de: "Bewegung pausieren",
                      }[language]
                }
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? (
                  <Play size={17} aria-hidden="true" />
                ) : (
                  <Pause size={17} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
