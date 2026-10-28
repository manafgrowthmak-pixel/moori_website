"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Oversized wordmark that drifts sideways with scroll, as in the template.
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-22%"]);

  return (
    <div ref={ref} aria-hidden className="overflow-hidden pt-8 pb-6">
      <motion.p
        style={reduce ? undefined : { x }}
        className="text-[clamp(5rem,17vw,16rem)] leading-[0.95] font-extrabold tracking-[-0.055em] whitespace-nowrap"
      >
        Moori Interiors
      </motion.p>
    </div>
  );
}
