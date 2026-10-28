"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { communities } from "@/content/site";
import { Reveal } from "./reveal";
import { ArrowCircle, Container, grid, SectionHeader, sectionY } from "./ui";

// Index list on the left; hovering or focusing a community swaps the large
// preview on the right. On mobile each row carries its own thumbnail.
export function Communities() {
  const [active, setActive] = useState(0);
  const current = communities[active];

  return (
    <section aria-labelledby="communities-title" className={sectionY}>
      <Container>
        <SectionHeader
          id="communities-title"
          label="Communities"
          title="Find your community"
          sub="We have designed and delivered homes in each of these communities — start with work near you."
          action={{ href: "/communities", label: "All communities" }}
        />

        <div className={`${grid} mt-8 gap-y-10 md:mt-16`}>
          <ul className="col-span-4 md:col-span-6">
            {communities.map((c, i) => (
              <li key={c.href} data-reveal="left" className="border-t border-ink/25 last:border-b">
                <Link
                  href={c.href}
                  aria-label={`Interior design in ${c.name}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-3 py-4 xs:grid-cols-[4rem_1fr_auto] xs:gap-x-4 md:grid-cols-[2.5rem_1fr_auto] md:py-6"
                >
                  <span className="relative aspect-square overflow-hidden rounded-md md:hidden">
                    <Image src={c.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className={`label hidden transition-colors md:block ${active === i ? "text-ink" : "text-ink/50"}`}>
                    0{i + 1}
                  </span>
                  <span>
                    <span
                      className={`block text-[clamp(1.25rem,1rem+1.2vw,1.5rem)] leading-[1.1] md:text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] md:leading-[1.05] font-medium uppercase tracking-[-0.04em] transition-[color,transform] duration-500 ease-out-quint md:group-hover:translate-x-2 ${
                        active === i ? "md:text-ink" : "md:text-ink/45"
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="label mt-1 block text-ink/70 max-lg:text-sm">{c.work}</span>
                  </span>
                  <ArrowCircle
                    className={`transition-colors ${active === i ? "md:bg-ink md:text-cream" : ""} group-hover:bg-ink group-hover:text-cream`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="col-span-4 hidden md:col-span-5 md:col-start-8 md:block">
            <div className="sticky top-[100px]">
              <Reveal from="clip" className="relative aspect-[4/5] overflow-hidden rounded-xl bg-chip">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.image}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={current.image} alt={current.alt} fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-6 text-cream">
                  <p className="text-2xl font-medium uppercase tracking-[-0.04em]">{current.name}</p>
                  <p className="label text-cream/85">{current.work}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
