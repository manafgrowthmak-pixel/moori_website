import Link from "next/link";
import { primaryCta, services } from "@/content/site";
import { Reveal } from "./reveal";
import { ArrowCircle, Container, grid, Hairline, PillLink, sectionY } from "./ui";

// Two-column index on desktop: a sticky intro on the left, numbered service
// rows on the right. Phones and tablets stack the intro above the rows.
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className={sectionY}>
      <Container>
        <Hairline />
        <Reveal from="fade" className="pt-4">
          <p className="label">Services</p>
        </Reveal>

        <div className={`${grid} mt-8 gap-y-10 md:mt-14 lg:gap-y-12`}>
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[110px]">
              <h2 id="services-title" data-split className="heading-section text-balance">
                What we design
              </h2>
              <Reveal from="left">
                <p className="mt-4 max-w-[480px] text-base leading-[1.5] text-ink/85 md:mt-6 lg:max-w-[340px] lg:text-[15px]">
                  End-to-end interior design, from the first conversation to the final styling — as
                  design only, or turnkey with execution.
                </p>
                <p className="mt-8 text-base font-medium tracking-[-0.01em] md:mt-10 lg:text-[15px]">Not sure which you need?</p>
                <PillLink href={primaryCta.href} tone="ink" className="mt-4 w-full sm:w-auto">
                  {primaryCta.label}
                </PillLink>
              </Reveal>
            </div>
          </div>

          <ol className="col-span-4 md:col-span-12 lg:col-span-8">
            {services.map((s, i) => (
              <li key={s.href} className="border-t border-ink/25 last:border-b">
                <Reveal from="right">
                  <Link
                    href={s.href}
                    className="group grid grid-cols-[1.75rem_1fr_auto] gap-x-3 gap-y-2 py-6 transition-colors xs:grid-cols-[2.25rem_1fr_auto] xs:gap-x-4 md:py-7 duration-300 hover:bg-sand/50 md:grid-cols-[3rem_1.1fr_1fr_auto] md:items-start md:px-4 md:py-9"
                  >
                    <span className="label pt-2 text-ink/60">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-[clamp(1.375rem,1.1rem+1.1vw,2.125rem)] leading-[1.12] md:leading-[1.1] tracking-[-0.04em] transition-transform duration-500 ease-out-quint group-hover:translate-x-1.5">
                      {s.title}
                    </h3>
                    <p className="col-start-2 col-end-4 text-base leading-[1.5] text-ink/85 md:col-start-3 md:col-end-4 md:pt-1.5 lg:text-[15px] lg:leading-[1.45]">
                      {s.body}
                    </p>
                    <ArrowCircle className="col-start-3 row-start-1 mt-1 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream md:col-start-4" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
