import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { advanceIntroProgress } from "@/lib/introMotion";

export function useIntroProgress(
  scrollProgress: MotionValue<number>,
  active: boolean,
) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!active) return;
    let frame: number | undefined;
    let previousTime: number | undefined;
    const destination = () => {
      const value = scrollProgress.get();
      return Number.isFinite(value)
        ? Math.min(1, Math.max(0, value))
        : progress.get();
    };
    const tick = (time: number) => {
      frame = undefined;
      const target = destination();
      if (previousTime !== undefined)
        progress.set(
          advanceIntroProgress(progress.get(), target, time - previousTime),
        );
      previousTime = time;
      if (progress.get() !== target) frame = requestAnimationFrame(tick);
      else previousTime = undefined;
    };
    const start = () => {
      if (frame === undefined && progress.get() !== destination()) {
        previousTime = undefined;
        frame = requestAnimationFrame(tick);
      }
    };
    const unsubscribe = scrollProgress.on("change", start);
    start();
    return () => {
      unsubscribe();
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [active, progress, scrollProgress]);

  return progress;
}
