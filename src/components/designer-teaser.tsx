import Image from "next/image";
import { designerComparison, primaryCta } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { Container, ctaGroup, grid, PillLink } from "./ui";

// Pre-empts the main lost-deal reason: contractors offering design "free".
// Desktop sets the image beside a three-column table; tablets stack the image
// above it; phones turn each table row into a stacked, labelled comparison.
export function DesignerTeaser() {
  return (
    <section aria-labelledby="designer-title" className="py-8 md:py-12 lg:py-16">
      <Container>
        <Reveal from="scale" className="overflow-hidden rounded-xl bg-sand">
          <div className={`${grid} gap-y-0`}>
            <div className="relative col-span-4 min-h-[260px] overflow-hidden xs:min-h-[300px] md:col-span-12 md:min-h-[360px] lg:col-span-5">
              <Parallax speed={0.1}>
                <Image
                  src="/images/designer-banner.jpg"
                  alt="Living room with a green sectional, timber screens and layered lighting"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="label absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 backdrop-blur xs:top-5 xs:left-5">
                Designer or contractor?
              </p>
              <p className="absolute right-4 bottom-4 left-4 text-[clamp(1.375rem,1.1rem+1.3vw,2.25rem)] leading-[1.1] font-medium uppercase tracking-[-0.04em] text-cream xs:right-5 xs:bottom-5 xs:left-5">
                &ldquo;Free design&rdquo; is paid for in the build.
              </p>
            </div>

            <div className="col-span-4 px-4 py-8 xs:px-5 sm:p-10 md:col-span-12 lg:col-span-7 lg:p-12">
              <h2 id="designer-title" data-split className="heading-section max-w-[560px] text-balance">
                Ours is paid for by you — so it only answers to you
              </h2>

              <div role="table" aria-label="Contractor design compared with Moori" className="mt-8 text-[15px] md:mt-10 lg:text-[14px]">
                <div role="row" className="hidden grid-cols-[0.8fr_1fr_1fr] gap-x-4 border-b border-ink/30 pb-3 sm:grid">
                  <span role="columnheader" className="label text-ink/60">
                    &nbsp;
                  </span>
                  <span role="columnheader" className="label text-ink/60">Contractor &ldquo;free design&rdquo;</span>
                  <span role="columnheader" className="label">Moori</span>
                </div>
                {designerComparison.map((row) => (
                  <Reveal key={row.topic} from="right">
                    <div
                      role="row"
                      className="grid grid-cols-1 gap-y-3 border-b border-ink/20 py-5 sm:grid-cols-[0.8fr_1fr_1fr] sm:gap-x-4 sm:gap-y-1 sm:py-4"
                    >
                      <span role="rowheader" className="text-[14px] font-medium uppercase tracking-[-0.01em] sm:text-[13px]">
                        {row.topic}
                      </span>
                      <span role="cell" className="leading-[1.45] text-ink/60 sm:leading-[1.4]">
                        <span className="label mb-0.5 block text-ink/50 sm:hidden">Contractor</span>
                        {row.contractor}
                      </span>
                      <span role="cell" className="leading-[1.45] font-medium sm:leading-[1.4]">
                        <span className="label mb-0.5 block sm:hidden">Moori</span>
                        {row.moori}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className={`mt-8 md:mt-10 ${ctaGroup}`}>
                <PillLink href={primaryCta.href} tone="ink">
                  {primaryCta.label}
                </PillLink>
                <PillLink href="/why-a-designer" tone="outline">
                  Full comparison
                </PillLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
