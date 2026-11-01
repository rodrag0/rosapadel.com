import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ScrollDepth({
  children,
  className = "",
  strength = 1,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [32 * strength, -32 * strength],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [8 * strength, 0, -2 * strength],
  );
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.95, 1, 1]);
  return (
    <motion.figure
      ref={target}
      className={className}
      data-depth-media
      style={
        reduced ? undefined : { y, rotateX, scale, transformPerspective: 1400 }
      }
    >
      {children}
    </motion.figure>
  );
}
