import Link from "next/link";
import { footerColumns, primaryCta, studio, whatsappHref } from "@/content/site";
import { FooterWordmark } from "./footer-wordmark";
import { Reveal } from "./reveal";
import { Hairline, PillLink } from "./ui";

// Cached so the year is fixed at build time under Cache Components.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

// 44px-tall tap rows on phones and tablets; compact list on desktop.
const linkClass =
  "inline-flex min-h-11 items-center text-sm font-medium uppercase tracking-[-0.02em] hover:underline underline-offset-4 lg:min-h-0";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="px-2 pt-8 pb-[max(0.5rem,env(safe-area-inset-bottom))] xs:px-3 md:pt-10 md:pb-3">
      <div className="overflow-hidden rounded-xl bg-sand">
        <div className="mx-auto max-w-[1440px] px-4 pt-14 xs:px-5 sm:px-10 md:pt-20 lg:pt-28">
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-y-14 [&>*]:min-w-0">
            <div className="col-span-4 md:col-span-12 xl:col-span-5">
              <p data-split className="max-w-[540px] text-[clamp(1.5rem,1.2rem+1.4vw,1.75rem)] leading-[1.15] text-balance md:text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] font-medium uppercase tracking-[-0.04em]">
                Homes designed with you, across Dubai and the UAE.
              </p>
              <Reveal from="fade" className="mt-8 md:mt-10">
                <PillLink href={primaryCta.href} tone="ink" className="w-full sm:w-auto">
                  {primaryCta.label}
                </PillLink>
              </Reveal>
            </div>

            <div className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-8 xs:gap-x-6 md:col-span-12 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 xl:col-span-7 [&>*]:min-w-0">

              {footerColumns.map((col) => (
                <nav key={col.title} aria-label={col.title} data-reveal="up">
                  <p className="label text-ink/70">{col.title}</p>
                  <ul className="mt-2 flex flex-col lg:mt-4 lg:gap-3">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={linkClass}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <Reveal className="col-span-2 md:col-span-3 lg:col-span-1">
                <p className="label text-ink/70">Contact</p>
                <address className="mt-2 flex flex-col not-italic lg:mt-4 lg:gap-3">
                  <a href={`mailto:${studio.email}`} className="inline-flex min-h-11 items-center text-[15px] font-medium tracking-[-0.01em] hover:underline lg:min-h-0 lg:text-sm">
                    {studio.email}
                  </a>
                  <a href={studio.phoneHref} className="inline-flex min-h-11 items-center text-[15px] font-medium tracking-[-0.01em] hover:underline lg:min-h-0 lg:text-sm">
                    {studio.phone}
                  </a>
                  <a href={whatsappHref("Hi Moori, I'd like to talk about my home.")} className={linkClass}>
                    WhatsApp
                  </a>
                  <span className="mt-2 text-sm leading-[1.5] text-ink/85 lg:mt-0 lg:text-[13px]">
                    {studio.address.line1}, {studio.address.line2}
                  </span>
                  <span className="mt-3 text-sm leading-[1.5] text-ink/85 lg:mt-0 lg:text-[13px]">
                    {studio.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}: {h.time}
                      </span>
                    ))}
                  </span>
                </address>
                <ul className="mt-3 flex flex-col lg:mt-5 lg:gap-3">
                  {studio.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <Hairline className="mt-12 bg-ink/20 md:mt-20" />
          <Reveal from="fade" className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6">
            <div className="-ml-2.5 flex items-center gap-1 lg:ml-0 lg:gap-5">
              <a href={`mailto:${studio.email}`} aria-label="Email Moori" className="p-2.5 lg:p-1">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                </svg>
              </a>
              <span className="h-6 w-px bg-ink/20" />
              <a href={studio.phoneHref} aria-label="Call Moori" className="p-2.5 lg:p-1">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d="M5 4h3.5l1.5 4-2 1.3a11 11 0 0 0 6.7 6.7L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
                </svg>
              </a>
              <span className="h-6 w-px bg-ink/20" />
              <a href="https://maps.google.com/?q=Moori+Interiors+Dubai" target="_blank" rel="noopener noreferrer" aria-label="Find the studio on Google Maps" className="p-2.5 lg:p-1">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
                  <circle cx="12" cy="10" r="2.3" />
                </svg>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 text-[15px] tracking-[-0.02em] text-ink/75 lg:gap-y-2">
              <Link href="/privacy-policy" className="inline-flex min-h-11 items-center hover:underline lg:min-h-0">Privacy Policy</Link>
              <Link href="/terms" className="inline-flex min-h-11 items-center hover:underline lg:min-h-0">Terms of Use</Link>
              <span>© <CopyrightYear /> Moori Interiors. All rights reserved.</span>
            </div>
          </Reveal>
        </div>

        <FooterWordmark />
      </div>
    </footer>
  );
}
