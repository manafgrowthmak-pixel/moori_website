import type { ReactNode } from "react";

export type RevealFrom = "up" | "left" | "right" | "fade" | "scale" | "clip";

// Marks content for the page's GSAP scroll reveals (see scroll-animations.tsx).
// Siblings that enter the viewport together are staggered automatically.
export function Reveal({
  children,
  className,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
}) {
  return (
    <div data-reveal={from} className={className}>
      {children}
    </div>
  );
}

// Wraps a `fill` image so it drifts inside its frame as the frame scrolls by.
// The frame must be positioned and clip its overflow.
export function Parallax({ children, speed = 0.08 }: { children: ReactNode; speed?: number }) {
  return (
    <div data-parallax={speed} className="absolute inset-0 will-change-transform">
      {children}
    </div>
  );
}
