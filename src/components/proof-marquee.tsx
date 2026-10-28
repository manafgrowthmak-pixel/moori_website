import Link from "next/link";
import { proof } from "@/content/site";

export function ProofMarquee() {
  const items = [...proof, ...proof];
  return (
    <section aria-label="Press and awards" className="border-y border-ink/25">
      <Link href="/studio/press-and-awards" className="group block overflow-hidden py-6 md:py-9" aria-label="See press and awards">
        <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= proof.length}
              className="flex items-center text-[clamp(1.125rem,0.9rem+0.8vw,1.5rem)] font-medium uppercase tracking-[-0.03em] whitespace-nowrap"
            >
              <span className="px-7 md:px-14">{item}</span>
              <span aria-hidden className="size-2 rounded-full border border-ink" />
            </li>
          ))}
        </ul>
      </Link>
    </section>
  );
}
