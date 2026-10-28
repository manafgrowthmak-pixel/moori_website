"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type RevealSpec = {
  from: (distance: number) => gsap.TweenVars;
  to: gsap.TweenVars;
};

// Starting and resting states for each data-reveal value set by <Reveal>.
const reveals: Record<string, RevealSpec> = {
  up: {
    from: (d) => ({ y: d, opacity: 0 }),
    to: { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
  },
  left: {
    from: (d) => ({ x: -d * 1.5, opacity: 0 }),
    to: { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
  },
  right: {
    from: (d) => ({ x: d * 1.5, opacity: 0 }),
    to: { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
  },
  fade: {
    from: () => ({ opacity: 0 }),
    to: { opacity: 1, duration: 1, ease: "power2.out" },
  },
  scale: {
    from: () => ({ scale: 0.94, opacity: 0 }),
    to: { scale: 1, opacity: 1, duration: 1.3, ease: "expo.out" },
  },
  // Image frames: a curtain lifts from the bottom edge.
  clip: {
    from: () => ({ clipPath: "inset(100% 0% 0% 0%)" }),
    to: { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" },
  },
  // Hairlines draw in from the left.
  line: {
    from: () => ({ scaleX: 0, transformOrigin: "left center" }),
    to: { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
  },
};

const START = "top 88%";

// One controller for the whole landing page. Sections stay server-rendered
// and only mark elements with data attributes:
//   data-reveal="up|left|right|fade|scale|clip|line"  — enters once; siblings
//     that enter together are staggered
//   data-split                                          — headline rises line by line
//   data-parallax="0.08"                                — image drifts inside its frame
// Nothing runs for visitors who prefer reduced motion.
export function ScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    const mm = gsap.matchMedia();

    // Line breaks and trigger positions depend on the final font metrics.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = window.innerWidth < 768 ? 28 : 48;
        // Below desktop, side slide-ins rise instead so nothing ever starts
        // outside the viewport (no off-canvas overflow on phones/tablets).
        const sideways = window.innerWidth >= 1024;

        for (const [type, base] of Object.entries(reveals)) {
          const els = gsap.utils.toArray<HTMLElement>(`[data-reveal="${type}"]`);
          if (!els.length) continue;
          const spec = !sideways && (type === "left" || type === "right") ? reveals.up : base;
          gsap.set(els, spec.from(distance));
          ScrollTrigger.batch(els, {
            start: START,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                ...spec.to,
                stagger: 0.09,
                overwrite: true,
                clearProps: "transform,opacity,clipPath,transformOrigin",
              }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: START, once: true },
            // Hand the heading back to React untouched once it has landed.
            onComplete: () => split.revert(),
          });
        });

        // Oversized and shifted so the drift never shows the frame's edge.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.08;
          gsap.fromTo(
            el,
            { yPercent: -speed * 100, scale: 1 + speed * 2 },
            {
              yPercent: speed * 100,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return null;
}
