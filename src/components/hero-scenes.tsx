"use client";

import { motion, useMotionValueEvent, type MotionValue } from "motion/react";
import { useCallback, useRef } from "react";
import { heroScenes } from "@/content/site";
import { ctaGroup, PillLink } from "./ui";

const line =
  "opacity-0 translate-y-4 transition-[opacity,translate] duration-700 ease-out-quint group-data-[shown=true]:opacity-100 group-data-[shown=true]:translate-y-0";

// One conversion beat per room of the walkthrough, held still in a prominent
// spot (left and vertically centred on desktop, low and full width on mobile).
// The frame on screen decides which beat shows; each fades up line by line.
export function HeroScenes({
  frame,
  opacity,
}: {
  frame: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const shade = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const f = Math.round(frame.get());
    let anyShown = false;
    heroScenes.forEach((scene, i) => {
      const shown = f >= scene.frames[0] && f <= scene.frames[1];
      const block = blocks.current[i];
      if (block) {
        block.dataset.shown = String(shown);
        // Hidden beats leave the tab order and can't be clicked.
        block.inert = !shown;
      }
      anyShown ||= shown;
    });
    if (shade.current) shade.current.style.opacity = anyShown ? "1" : "0";
  }, [frame]);

  useMotionValueEvent(frame, "change", update);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 overflow-hidden text-cream">
      {/* Shade under the text column so it reads on pale walls */}
      <div
        ref={shade}
        aria-hidden
        style={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-opacity duration-700 md:bg-gradient-to-r md:from-black/65 md:via-black/30 md:to-transparent"
      />

      {heroScenes.map((scene, i) => (
        <div
          key={scene.id}
          ref={(el) => {
            blocks.current[i] = el;
          }}
          data-shown="false"
          inert
          className="group absolute inset-x-4 bottom-24 flex flex-col xs:inset-x-5 sm:inset-x-10 md:top-1/2 md:right-auto md:bottom-auto md:max-w-[560px] md:-translate-y-1/2"
        >
          <p className={`label text-cream/80 ${line}`}>{scene.room}</p>
          <p
            className={`mt-3 text-[clamp(1.75rem,1.2rem+2.6vw,2.25rem)] leading-[1.04] md:text-[clamp(2rem,1.1rem+3.2vw,4rem)] md:leading-[1.02] font-medium uppercase tracking-[-0.045em] text-balance delay-75 ${line}`}
          >
            {scene.title}
          </p>
          <p className={`mt-3 max-w-[440px] text-base leading-[1.45] text-cream/90 md:mt-4 md:text-[17px] delay-150 ${line}`}>
            {scene.body}
          </p>
          <div
            className={`mt-6 delay-200 md:mt-7 ${ctaGroup} group-data-[shown=true]:pointer-events-auto ${line}`}
          >
            <PillLink href={scene.cta.href} tone="light">
              {scene.cta.label}
            </PillLink>
            <PillLink href={scene.link.href} tone="glass">
              {scene.link.label}
            </PillLink>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
