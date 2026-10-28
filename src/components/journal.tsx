import Image from "next/image";
import Link from "next/link";
import { journal } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { ArrowCircle, Container, grid, SectionHeader, sectionY, TextLink } from "./ui";

// One lead story beside a compact list of the next two.
export function Journal() {
  const [lead, ...rest] = journal;

  return (
    <section aria-labelledby="journal-title" className={sectionY}>
      <Container>
        <SectionHeader
          id="journal-title"
          label="Journal"
          title="Ideas for planning your home"
          sub="Guides on kitchens, layouts, materials and family living in Dubai — each one ends with real work."
          action={{ href: "/journal", label: "Read the journal" }}
        />

        <div className={`${grid} mt-8 gap-y-8 md:mt-12 md:gap-y-10 lg:mt-16 lg:gap-y-12`}>
          <Reveal className="col-span-4 md:col-span-12 lg:col-span-7">
            <Link href={lead.href} className="group block">
              <div data-reveal="clip" className="relative aspect-[16/10] overflow-hidden rounded-xl bg-chip">
                <Parallax>
                  <Image
                    src={lead.image}
                    alt={lead.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.04]"
                  />
                </Parallax>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 md:mt-5 md:gap-6">
                <div>
                  <p className="label text-ink/70">{lead.topic}</p>
                  <h3 className="mt-2 max-w-[520px] text-[clamp(1.375rem,1.1rem+1.1vw,2.125rem)] leading-[1.15] md:leading-[1.12] tracking-[-0.04em] text-balance">
                    {lead.title}
                  </h3>
                </div>
                <ArrowCircle className="mt-1 group-hover:bg-ink group-hover:text-cream" />
              </div>
            </Link>
          </Reveal>

          <ul className="col-span-4 flex flex-col md:col-span-12 lg:col-span-5">
            {rest.map((post) => (
              <li key={post.href} className="border-t border-ink/25 last:border-b">
                <Reveal from="right">
                  <Link href={post.href} className="group grid grid-cols-[6rem_1fr] items-center gap-4 py-5 xs:grid-cols-[7.5rem_1fr] sm:grid-cols-[10rem_1fr] sm:gap-5 sm:py-6">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-chip">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.06]"
                      />
                    </div>
                    <div>
                      <p className="label text-ink/70">{post.topic}</p>
                      <h3 className="mt-1.5 text-lg leading-[1.2] tracking-[-0.03em] text-balance group-hover:underline group-hover:underline-offset-4">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
            <li data-reveal="fade" className="pt-8">
              <p className="max-w-[340px] text-base leading-[1.5] text-ink/85 lg:text-[15px]">
                More than 20 guides on kitchens, bathrooms, layouts and landscape.
              </p>
              <div className="mt-5">
                <TextLink href="/journal">Browse all guides</TextLink>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
