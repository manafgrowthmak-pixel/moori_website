"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { Container, grid, SectionHeader, sectionY } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="grid size-12 place-items-center rounded-full border border-ink/40 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream active:scale-95"
    >
      <svg viewBox="0 0 16 16" className={`size-4 ${dir === "prev" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  const go = (d: number) => setActive((a) => (a + d + testimonials.length) % testimonials.length);

  return (
    <section aria-labelledby="voices-title" className={sectionY}>
      <Container>
        <SectionHeader
          id="voices-title"
          label="Client voices"
          title="In our clients' own words"
          sub="Four homeowners on being heard, budgets kept in the open and managing a home from abroad."
        />

        <div className={`${grid} mt-8 gap-y-8 md:mt-12 lg:mt-16 lg:gap-y-10`}>
          <Reveal from="clip" className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-xl bg-chip md:col-span-12 md:aspect-[16/9] lg:col-span-5 lg:aspect-[4/5]">
            <Parallax>
              <AnimatePresence initial={false}>
                <motion.div
                  key={t.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </Parallax>
            <span className="label absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 backdrop-blur">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </Reveal>

          <Reveal from="right" className="col-span-4 flex flex-col md:col-span-12 lg:col-span-6 lg:col-start-7">
            <svg viewBox="0 0 32 24" className="h-6 w-8" fill="currentColor" aria-hidden>
              <path d="M0 24V13.7C0 5.9 4.4 1.3 12.2 0l1.2 2.9C9 4.3 7.1 7 7 11h6v13H0Zm18.6 0V13.7C18.6 5.9 23 1.3 30.8 0L32 2.9c-4.4 1.4-6.3 4.1-6.4 8.1h6V24H18.6Z" />
            </svg>

            <div aria-live="polite" className="flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={t.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex h-full flex-col"
                >
                  <p className="label mt-6 text-ink/70 md:mt-8">{t.title}</p>
                  <blockquote className="mt-4 text-[clamp(1.375rem,1rem+1.2vw,2.25rem)] leading-[1.22] tracking-[-0.035em]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-ink/25 pt-5 md:mt-10">
                    <span>
                      <span className="block text-[17px] font-medium tracking-[-0.02em]">{t.name}</span>
                      <span className="mt-1 block text-[15px] text-ink/75 lg:text-sm">{t.context}</span>
                    </span>
                    <Link href={t.href} className="inline-flex min-h-12 items-center text-sm font-medium uppercase tracking-[-0.02em] underline underline-offset-4 lg:min-h-0">
                      {t.linkLabel}
                    </Link>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex min-w-0 items-center justify-between gap-4 md:mt-10 md:gap-6">
              <div role="tablist" aria-label="Choose a testimonial" className="flex min-w-0 flex-1 gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Testimonial from ${item.name}`}
                    onClick={() => setActive(i)}
                    className="group min-h-12 min-w-0 flex-1 py-3 lg:min-h-0"
                  >
                    <span className="block h-px w-full bg-ink/20">
                      <span
                        className={`block h-px bg-ink transition-[width] duration-500 ease-out-quint ${i === active ? "w-full" : "w-0 group-hover:w-1/3"}`}
                      />
                    </span>
                    <span className={`label mt-2 block truncate text-left transition-colors max-sm:hidden ${i === active ? "text-ink" : "text-ink/50"}`}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex shrink-0 gap-2">
                <NavButton dir="prev" onClick={() => go(-1)} />
                <NavButton dir="next" onClick={() => go(1)} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
