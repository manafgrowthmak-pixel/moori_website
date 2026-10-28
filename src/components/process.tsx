"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { Container, SectionHeader, sectionY } from "./ui";

const icons: Record<(typeof process)[number]["icon"], React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  bulb: (
    <>
      <path d="M8.5 14.5a5.5 5.5 0 1 1 7 0c-.8.6-1 1.3-1 2.2V17h-5v-.3c0-.9-.2-1.6-1-2.2Z" />
      <path d="M10 20h4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.3 4.6-5" />
    </>
  ),
};

// Four-step timeline: a hairline runs across the steps and fills as the
// section scrolls into view.
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className={sectionY}>
      <Container>
        <SectionHeader
          id="process-title"
          label="How we work"
          title="Four clear steps, with you at every one"
          sub="Timelines from our published fees. A designer — not a salesperson — leads you from the first conversation."
          action={{ href: "/process", label: "Our process in detail" }}
        />

        <ol ref={ref} className="relative mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-12 md:mt-14 lg:mt-20 lg:grid-cols-4 [&>*]:min-w-0">
          <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-ink/20 lg:block" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleX: fill }}
            className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-ink lg:block"
          />

          {process.map((step) => (
            <li key={step.step} className="relative">
              <Reveal from="right">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 grid size-[15px] place-items-center rounded-full border border-ink bg-cream">
                    <span className="size-[5px] rounded-full bg-ink" />
                  </span>
                  <span className="label relative z-10 -ml-3 bg-cream pr-3 pl-3">
                    {step.label}
                  </span>
                </div>

                <div className="group relative mt-4 aspect-[16/9] overflow-hidden rounded-xl sm:mt-6 sm:aspect-[4/3]">
                  <Parallax>
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.05]"
                    />
                  </Parallax>
                  <span className="absolute top-3 right-3 grid size-11 place-items-center rounded-lg bg-cream text-ink">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {icons[step.icon]}
                    </svg>
                  </span>
                </div>

                <h3 className="mt-5 text-2xl leading-[1.05] sm:mt-6 font-medium uppercase tracking-[-0.04em]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[420px] text-base leading-[1.5] text-ink/85 sm:mt-3 sm:max-w-[320px] lg:text-[15px] lg:leading-[1.45]">{step.body}</p>
                <p className="mt-4 inline-flex rounded-full bg-sand px-3 py-1.5 text-sm font-medium sm:mt-5 lg:text-[12px] uppercase tracking-[-0.01em]">
                  {step.timing}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
