"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export const FRAME_COUNT = 240;

export function framePath(index: number, size: "lg" | "sm" = "lg") {
  return `/frames/${size}/${String(index + 1).padStart(3, "0")}.webp`;
}

// Coarse-to-fine load order (every 16th frame, then 8th, 4th…) so a fast
// scroll always has a nearby frame to show while the rest stream in.
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

// Scrubs an image sequence on a canvas from a 0–1 progress value,
// drawing each frame with object-fit: cover.
export function FrameSequence({
  progress,
  drawnFrame,
  className = "",
}: {
  progress: MotionValue<number>;
  // Reports the frame actually on screen, so overlays stay locked to it.
  drawnFrame?: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const drawn = useRef(-1);
  const raf = useRef(0);

  const draw = useCallback(() => {
    raf.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const target = Math.round(progress.get() * (FRAME_COUNT - 1));
    // Nearest frame that has finished loading.
    let index = -1;
    for (let d = 0; d < FRAME_COUNT; d++) {
      if (frames.current[target - d]) { index = target - d; break; }
      if (frames.current[target + d]) { index = target + d; break; }
    }
    if (index < 0 || index === drawn.current) return;

    const img = frames.current[index]!;
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    drawn.current = index;
    drawnFrame?.set(index);
    canvas.style.opacity = "1";
  }, [progress, drawnFrame]);

  const requestDraw = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(draw);
  }, [draw]);

  useMotionValueEvent(progress, "change", requestDraw);

  // Keep the backing store matched to the element's layout size (transforms
  // such as the hero's shrink don't change it, so no reallocations mid-scroll).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn.current = -1;
      requestDraw();
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [requestDraw]);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const size = connection?.saveData ? "sm" : "lg";
    const queue = loadOrder(FRAME_COUNT);
    let cancelled = false;

    const next = () => {
      const i = queue.shift();
      if (i === undefined || cancelled) return;
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i, size);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames.current[i] = img;
          requestDraw();
        })
        .catch(() => {})
        .finally(next);
    };

    // A few parallel lanes; start after the poster has had its turn.
    const start = setTimeout(() => {
      for (let lane = 0; lane < 6; lane++) next();
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(start);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [requestDraw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 size-full opacity-0 ${className}`}
    />
  );
}
