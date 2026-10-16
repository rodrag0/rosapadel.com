import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SectionNavigation() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    let cancelled = false;
    const scrollToSection = () => {
      if (!cancelled) document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    };

    // The initial HTML has no sections; resolve deep links after React and fonts are ready.
    const frame = requestAnimationFrame(scrollToSection);
    void document.fonts.ready.then(scrollToSection);
    window.addEventListener("load", scrollToSection, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", scrollToSection);
    };
  }, [pathname, hash, key]);

  return null;
}
