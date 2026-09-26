import { Component, lazy, Suspense, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";
import { experienceMedia } from "@/lib/experienceMedia";
import { productPresentation } from "@/lib/productScreens";

const CourtScene = lazy(() => import("./Hero3DScene"));
function CourtFallback({ label }: { label: string }) {
  return (
    <img
      className="experience-court-fallback"
      src={experienceMedia.matchPoster}
      alt={label}
      loading="lazy"
    />
  );
}
class SceneBoundary extends Component<
  { children: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <CourtFallback label={this.props.label} />
    ) : (
      this.props.children
    );
  }
}
export default function CourtPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [playback, setPlayback] = useState<"auto" | "paused" | "playing">("auto");
  const visible = useInView(ref, { margin: "160px", once: true });
  const inViewport = useInView(ref, { margin: "80px" });
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const copy = productPresentation[language];
  const playing = playback === "playing" || (playback === "auto" && !reducedMotion);
  const controlLabel = playing ? copy.pauseCourt : copy.playCourt;
  return (
    <figure className="experience-court-figure">
      <div ref={ref} className="experience-court" role="img" aria-label={copy.courtLabel}>
        {visible ? (
          <SceneBoundary label={copy.courtFallback}>
            <Suspense fallback={<CourtFallback label={copy.courtFallback} />}>
              <CourtScene
                theme={theme}
                reducedMotion={!playing || !inViewport}
                fallback={<CourtFallback label={copy.courtFallback} />}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          <CourtFallback label={copy.courtFallback} />
        )}
      </div>
      <figcaption className="hero-caption"><BrandText text={copy.courtCaption} /></figcaption>
      <button
        type="button"
        className="court-motion-control"
        aria-label={controlLabel}
        title={controlLabel}
        onClick={() => setPlayback(playing ? "paused" : "playing")}
      >
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      </button>
    </figure>
  );
}
