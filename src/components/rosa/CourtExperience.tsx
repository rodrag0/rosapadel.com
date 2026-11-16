import { Component, lazy, Suspense, type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

class CourtSceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function CourtExperience({ paused = false }: { paused?: boolean }) {
  const { theme } = useTheme();
  const { copy } = useLanguage();
  const fallback = (
    <img
      src="/images/products/rosa-vision-court.webp"
      alt=""
      width="1600"
      height="900"
      className="court-fallback"
      data-court-preview
    />
  );
  return (
    <div className="court-stage" role="img" aria-label={copy.hero.sceneAlt}>
      <CourtSceneBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          {typeof window !== "undefined" && window.WebGLRenderingContext ? (
            <Hero3DScene theme={theme} paused={paused} />
          ) : (
            fallback
          )}
        </Suspense>
      </CourtSceneBoundary>
    </div>
  );
}
