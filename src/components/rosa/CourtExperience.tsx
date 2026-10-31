import { lazy, Suspense } from "react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

export default function CourtExperience() {
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
      <Suspense fallback={fallback}>
        {typeof window !== "undefined" ? (
          <Hero3DScene theme={theme} />
        ) : (
          fallback
        )}
      </Suspense>
    </div>
  );
}
