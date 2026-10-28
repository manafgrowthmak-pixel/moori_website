import Image from "next/image";
import Link from "next/link";
import { featuredHospitality, projectFilters, selectedWork, type Project } from "@/content/site";
import { Parallax, Reveal } from "./reveal";
import { ArrowCircle, Container, grid, SectionHeader, sectionY } from "./ui";

// Bento rows on the 12-column grid. In each row the first card sets the
// height with its aspect ratio and the partner card stretches to match.
function ProjectCard({
  project,
  index,
  aspect,
  sizes,
  className = "",
}: {
  project: Project;
  index: number;
  aspect?: string;
  sizes: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex ${className}`}>
      <Link
        href={project.href}
        aria-label={`View the ${project.name}, ${project.community}`}
        className="group flex w-full flex-col"
      >
        <div
          data-reveal="clip"
          className={`relative overflow-hidden rounded-xl bg-chip ${aspect ?? "aspect-[4/5] md:aspect-auto md:min-h-[320px] md:flex-1"}`}
        >
          <Parallax>
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.04]"
            />
          </Parallax>
          {project.status ? (
            <span className="label absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 backdrop-blur">
              {project.status}
            </span>
          ) : null}
        </div>
        <div className="mt-3 grid grid-cols-[2rem_1fr_auto] items-start gap-x-3 md:mt-4 md:grid-cols-[2.25rem_1fr_auto]">
          <span className="label pt-1 text-ink/60">{String(index).padStart(2, "0")}</span>
          <div>
            <h3 className="text-base font-medium uppercase tracking-[-0.02em]">{project.name}</h3>
            <p className="label mt-1 text-ink/75 max-lg:text-sm">
              {project.type} · {project.community} · {project.year}
            </p>
          </div>
          <ArrowCircle className="group-hover:bg-ink group-hover:text-cream" />
        </div>
      </Link>
    </Reveal>
  );
}

export function SelectedWork() {
  const [a, b, c, d, e, f] = selectedWork;
  const wide = "(min-width: 768px) 60vw, 100vw";
  const narrow = "(min-width: 768px) 33vw, 100vw";

  return (
    <section id="work" aria-labelledby="work-title" className={sectionY}>
      <Container>
        <SectionHeader
          id="work-title"
          label="Selected work"
          title="Delivered homes across Dubai"
          sub="Villas, townhouses and apartments we have designed with their owners — and the venues we create."
          action={{ href: "/projects", label: "All projects" }}
        />

        <div className="mt-8 flex snap-x gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,#000_82%,transparent)] [scrollbar-width:none] md:mt-10 md:flex-wrap md:overflow-visible md:pb-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden">
          {projectFilters.map((filter) => (
            <Link
              key={filter.href}
              href={filter.href}
              data-reveal="up"
              className="inline-flex min-h-12 shrink-0 snap-start items-center rounded-full border border-ink/25 px-4 text-sm font-medium whitespace-nowrap uppercase tracking-[-0.01em] transition-colors md:min-h-0 md:py-2 md:text-[13px] duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              {filter.label}
            </Link>
          ))}
        </div>

        <div className={`${grid} mt-8 gap-y-10 md:mt-10 md:gap-y-16`}>
          <ProjectCard project={a} index={1} aspect="aspect-[16/10]" sizes={wide} className="col-span-4 md:col-span-8" />
          <ProjectCard project={b} index={2} sizes={narrow} className="col-span-4 md:col-span-4" />

          <ProjectCard project={c} index={3} aspect="aspect-[4/5]" sizes={narrow} className="col-span-4 md:col-span-4" />
          <ProjectCard project={d} index={4} aspect="aspect-[4/5]" sizes={narrow} className="col-span-4 md:col-span-4" />
          <ProjectCard project={e} index={5} aspect="aspect-[4/5]" sizes={narrow} className="col-span-4 md:col-span-4" />

          <ProjectCard project={f} index={6} sizes={narrow} className="col-span-4 md:col-span-5" />
          <ProjectCard project={featuredHospitality} index={7} aspect="aspect-[16/10]" sizes={wide} className="col-span-4 md:col-span-7" />
        </div>
      </Container>
    </section>
  );
}
