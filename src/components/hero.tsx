"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { primaryCta, proof } from "@/content/site";
import { FrameSequence, framePath } from "./frame-sequence";
import { HeroScenes } from "./hero-scenes";
import { ctaGroup, PillLink } from "./ui";

// Scroll story, in order:
//  1. the headline fades away,
//  2. the camera walks through the villa (240-frame sequence) — living room,
//     kitchen, then down the hallway — with one call to action per room,
//  3. desktop only — the card shrinks into the centre of a three-image strip,
//     the template's signature move.
// Desktop scroll budget: walkthrough 0.02 – 0.82, shrink 0.84 – 0.98.
const DESKTOP = { frames: [0.02, 0.82], shrink: [0.84, 0.98], sides: [0.86, 0.98] };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const desktopRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      desktopRef.current = mq.matches;
      setDesktop(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const animate = !reduce;
  const shrink = animate && desktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const frameProgress = useTransform(scrollYProgress, (v) => {
    const [a, b] = desktopRef.current ? DESKTOP.frames : [0.02, 1];
    return Math.min(1, Math.max(0, (v - a) / (b - a)));
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.05], [0, -40]);
  const scale = useTransform(scrollYProgress, DESKTOP.shrink, [1, 0.48]);
  const sideOpacity = useTransform(scrollYProgress, DESKTOP.sides, [0, 1]);
  const leftX = useTransform(scrollYProgress, DESKTOP.sides, [-60, 0]);
  const rightX = useTransform(scrollYProgress, DESKTOP.sides, [60, 0]);
  // Frame on screen (decides which room's message shows); messages step
  // aside as the card shrinks into the strip.
  const drawnFrame = useMotionValue(-1);
  const sceneOpacity = useTransform(scrollYProgress, (v) =>
    desktopRef.current ? Math.min(1, Math.max(0, (0.88 - v) / 0.04)) : 1,
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative h-[calc(100svh+2400px)] motion-reduce:h-auto lg:h-[calc(100svh+3600px)]"
    >
      <div className="sticky top-[66px] h-[calc(100svh-66px)] min-h-[440px] overflow-hidden md:min-h-[600px]">
        {shrink ? (
          <>
            <motion.div
              aria-hidden
              style={{ opacity: sideOpacity, x: leftX }}
              className="absolute top-1/2 left-[3.7%] aspect-[5/7] w-[17.4%] -translate-y-1/2 overflow-hidden rounded-lg"
            >
              <Image src="/images/yas-island-poolside.jpg" alt="" fill sizes="18vw" className="object-cover" />
            </motion.div>
            <motion.div
              aria-hidden
              style={{ opacity: sideOpacity, x: rightX }}
              className="absolute top-1/2 right-[3.7%] aspect-[5/7] w-[17.4%] -translate-y-1/2 overflow-hidden rounded-lg"
            >
              <Image src="/images/villa-window-seating.jpg" alt="" fill sizes="18vw" className="object-cover" />
            </motion.div>
          </>
        ) : null}

        <motion.div
          style={shrink ? { scale } : undefined}
          className="absolute inset-x-3 top-0 bottom-3 overflow-hidden rounded-xl bg-ink text-cream will-change-transform"
        >
          <Image
            src={framePath(0)}
            alt="Sunlit open-plan villa living room opening onto a terrace with the Dubai skyline"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          {animate ? <FrameSequence progress={frameProgress} drawnFrame={drawnFrame} /> : null}

          <motion.div
            style={animate ? { opacity: textOpacity } : undefined}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15"
          />

          {animate ? <HeroScenes frame={drawnFrame} opacity={sceneOpacity} /> : null}

          <motion.div
            style={animate ? { opacity: textOpacity, y: textY } : undefined}
            className="absolute inset-x-0 bottom-0 px-4 pb-5 xs:px-5 xs:pb-6 sm:px-10 sm:pb-8"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <h1
                id="hero-title"
                className="max-w-[820px] text-[clamp(2.125rem,1.4rem+3.4vw,2.5rem)] leading-[1.06] md:text-[clamp(2.6rem,1.4rem+4.2vw,5.25rem)] md:leading-[1.04] font-medium tracking-[-0.045em] text-balance"
              >
                Villa &amp; apartment interiors in Dubai, designed with you
              </h1>
              <div className="flex max-w-[460px] flex-col gap-5 md:gap-6 lg:pb-2">
                <p className="text-base leading-[1.35] tracking-[-0.01em] text-cream/90">
                  Minimal, material-led homes for families who want to be part of the design. Every
                  client is matched with a dedicated designer, from first sketch to handover.
                </p>
                <div className={ctaGroup}>
                  <PillLink href={primaryCta.href} tone="light">
                    {primaryCta.label}
                  </PillLink>
                  <PillLink href="/projects" tone="glass">
                    See our work
                  </PillLink>
                </div>
              </div>
            </div>
            <div className="mt-7 hidden h-px bg-cream/60 sm:block" />
            <ul
              aria-label="Recognition"
              className="mt-4 hidden flex-wrap gap-x-6 gap-y-1.5 text-[11px] font-medium sm:flex uppercase tracking-[0.02em] text-cream/85"
            >
              {proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
