import { Component, lazy, Suspense, useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { experienceMedia } from "@/lib/experienceMedia";

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
export default function CourtPreview({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "160px", once: true });
  const inViewport = useInView(ref, { margin: "80px" });
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  return (
    <figure className="experience-court-figure">
      <div ref={ref} className="experience-court" role="img" aria-label={label}>
        {visible ? (
          <SceneBoundary label={label}>
            <Suspense fallback={<CourtFallback label={label} />}>
              <CourtScene theme={theme} reducedMotion={!!reducedMotion || !inViewport} />
            </Suspense>
          </SceneBoundary>
        ) : (
          <CourtFallback label={label} />
        )}
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
