"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, primaryCta, studio, whatsappHref } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lock both scrolling layers so the page can't move under the menu.
    const lock = open ? "hidden" : "";
    document.documentElement.style.overflow = lock;
    document.body.style.overflow = lock;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // The drawer only exists below desktop; close it if the window grows.
    const mq = window.matchMedia("(min-width: 1100px)");
    const onWide = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="relative mx-auto flex h-[66px] items-center justify-between gap-3 px-4 xs:px-5 min-[1100px]:px-7">
        <nav aria-label="Primary" className="hidden items-center gap-9 min-[1100px]:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium uppercase tracking-[-0.02em]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out-quint group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label={`${studio.name} — home`}
          className="flex min-h-12 min-w-0 items-center truncate text-[20px] tracking-[-0.04em] xs:text-[22px] min-[1100px]:absolute min-[1100px]:left-1/2 min-[1100px]:-translate-x-1/2 min-[1100px]:text-2xl"
        >
          Moori Interiors
        </Link>

        <div className="flex shrink-0 items-center gap-1 xs:gap-2">
          {/* Always visible — never hidden behind the mobile menu (CRO audit H1) */}
          <Link
            href={primaryCta.href}
            className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-[14px] font-medium uppercase tracking-[-0.02em] text-cream transition-colors duration-300 hover:bg-ink-deep min-[1100px]:h-9 min-[1100px]:text-sm"
          >
            <span className="min-[1100px]:hidden">Book</span>
            <span className="hidden min-[1100px]:inline">Book a consultation</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 grid size-12 place-items-center min-[1100px]:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-ink transition-[top,rotate] duration-300 ease-out-quint ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-ink transition-[top,rotate] duration-300 ease-out-quint ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen drawer below the header bar; the Book button above stays
          visible. Closed, it is inert so it can't be focused or tapped. */}
      <div
        id="mobile-menu"
        inert={!open}
        data-open={open}
        className="group/menu fixed inset-x-0 top-[66px] bottom-0 overflow-y-auto overscroll-contain bg-cream/95 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] invisible opacity-0 backdrop-blur-xl transition-[opacity,visibility] duration-300 ease-out-quint data-[open=true]:visible data-[open=true]:opacity-100 xs:px-5 min-[431px]:px-6 md:px-8 min-[1100px]:hidden"
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col gap-8 pt-2">
          <ul className="flex flex-col border-t border-ink/15">
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className="translate-y-3 border-b border-ink/15 opacity-0 transition-[opacity,translate] duration-500 ease-out-quint group-data-[open=true]/menu:translate-y-0 group-data-[open=true]/menu:opacity-100"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center text-[26px] font-medium uppercase tracking-[-0.04em] xs:text-[28px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <Link
              href={primaryCta.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-ink px-5 text-[15px] font-medium uppercase tracking-[-0.02em] text-cream"
            >
              {primaryCta.label}
            </Link>
            <a
              href={whatsappHref("Hi Moori, I'd like to talk about my home.")}
              className="flex min-h-[52px] items-center justify-center rounded-full border border-ink/30 px-5 text-[15px] font-medium uppercase tracking-[-0.02em]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
