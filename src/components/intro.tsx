import Image from "next/image";
import { philosophy } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { Container, grid, TextLink } from "./ui";

function InlineImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <span
      className={`relative mx-[0.12em] inline-block h-[0.82em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
    </span>
  );
}

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-16 md:py-24 lg:py-36">
      <Container>
        <div className={`${grid} gap-y-6 md:gap-y-10`}>
          <Reveal from="fade" className="col-span-4 md:col-span-2">
            <p className="label">Studio</p>
          </Reveal>

          <div className="col-span-4 md:col-span-10">
            <h2
              id="intro-title"
              data-split
              className="text-[clamp(1.625rem,1.15rem+2vw,2rem)] leading-[1.1] font-medium uppercase tracking-[-0.04em] text-balance md:text-[clamp(2rem,1.1rem+3.2vw,4.25rem)] md:leading-[1.06] md:tracking-[-0.045em]"
            >
              Designed with you,{" "}
              <InlineImage src="/images/material-detail.jpg" alt="" />{" "}
              not for you. Minimal, material-led homes{" "}
              <InlineImage src="/images/bedroom-detail.jpg" alt="" className="max-sm:hidden" />{" "}
              shaped around your routines, your family and how you live.
            </h2>
          </div>
        </div>

        <div className={`${grid} mt-12 gap-y-10 md:mt-24 md:gap-y-12`}>
          <Reveal from="clip" className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-xl md:col-span-5 md:aspect-[4/5] lg:col-span-4 lg:col-start-3">
            <Parallax speed={0.1}>
              <Image
                src="/images/hero.jpg"
                alt="Warm, layered living room with a lounge chair and floor lamp"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </Reveal>

          <div className="col-span-4 flex flex-col justify-between gap-10 md:col-span-7 md:gap-12 lg:col-span-5 lg:col-start-8">
            <Reveal from="right">
              <p className="text-base leading-[1.55] tracking-[-0.01em] text-ink/90 md:text-[17px] md:leading-[1.5]">
                Moori is a collective, not one founder&rsquo;s signature style. Every client is
                matched with a designer whose depth fits their vision, and takes part in every key
                decision — in person or online, wherever you live.
              </p>
              <div className="mt-4 md:mt-6">
                <TextLink href="/studio">Meet the studio</TextLink>
              </div>
            </Reveal>

            <ol className="flex flex-col">
              {philosophy.map((p, i) => (
                <li key={p.title} className="border-t border-ink/25 py-5 last:border-b">
                  <Reveal from="right">
                    <div className="grid grid-cols-[2rem_1fr] gap-x-3 sm:grid-cols-[2.5rem_11rem_1fr] sm:gap-x-4 md:grid-cols-[2.5rem_1fr] xl:grid-cols-[2.5rem_11rem_1fr]">
                      <span className="label pt-1 text-ink/70">0{i + 1}</span>
                      <div>
                        <h3 className="text-xl font-medium uppercase tracking-[-0.03em]">{p.title}</h3>
                        <p className="label mt-1 text-ink/70">{p.sense}</p>
                      </div>
                      <p className="col-start-2 mt-2 text-base leading-[1.5] text-ink/85 sm:col-start-3 sm:mt-0 md:col-start-2 md:mt-3 lg:text-[15px] lg:leading-[1.45] xl:col-start-3 xl:mt-0">
                        {p.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
