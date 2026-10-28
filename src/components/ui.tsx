import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "./reveal";

type PillTone = "light" | "glass" | "ink" | "outline";

const pillTones: Record<PillTone, string> = {
  light: "bg-cream text-ink hover:bg-white",
  glass: "bg-ink/80 text-cream backdrop-blur-md hover:bg-ink",
  ink: "bg-ink text-cream hover:bg-ink-deep",
  outline: "border border-current hover:bg-ink hover:text-cream hover:border-ink",
};

export function PillLink({
  tone = "light",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { tone?: PillTone }) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-4 py-3 text-center text-[14px] leading-[1.2] font-medium uppercase tracking-[-0.02em] xs:px-5 sm:text-[15px] transition-[background-color,color,border-color,transform] duration-300 ease-out-quint active:scale-[0.97] ${pillTones[tone]} ${className}`}
    />
  );
}

export function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid size-8 shrink-0 place-items-center rounded-full border border-current/70 transition-[background-color,color,transform] duration-300 ease-out-quint ${className}`}
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="none">
        <path d="M3 9 9 3M4.5 3H9v4.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
}

// Page container: 16px gutters on SE-size phones, 20px on standard phones,
// 24px on large phones, 32px on tablets, 62px on desktop.
export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 xs:px-5 min-[431px]:px-6 md:px-8 lg:px-[62px] ${className}`}
    >
      {children}
    </div>
  );
}

// 4 columns on phones, 12 from tablets up. Children may shrink below their
// content width, so long content wraps instead of widening the track.
export const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-12 [&>*]:min-w-0";

// Vertical rhythm shared by every section: 64px phones, 80px tablets, then
// the desktop spacing.
export const sectionY = "py-16 md:py-20 lg:py-32";

// Buttons that sit in a group: full width stacked on phones, inline after.
export const ctaGroup = "flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-12 items-center gap-2 text-sm font-medium uppercase tracking-[-0.02em] lg:min-h-0"
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-quint group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowCircle className="size-6 group-hover:bg-ink group-hover:text-cream" />
    </Link>
  );
}

// Editorial section header: label and an optional link on a hairline,
// then a left-set title with the supporting line pinned to the right columns.
export function SectionHeader({
  id,
  label,
  title,
  sub,
  action,
}: {
  id?: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div>
      <Hairline />
      <div className="flex items-center justify-between pt-4">
        <Reveal from="fade">
          <p className="label">{label}</p>
        </Reveal>
        {action ? (
          <Reveal from="fade" className="hidden md:block">
            <TextLink href={action.href}>{action.label}</TextLink>
          </Reveal>
        ) : null}
      </div>
      <div className={`${grid} mt-8 gap-y-4 md:mt-14 md:gap-y-6 md:items-end`}>
        <h2 id={id} data-split className="heading-section col-span-4 text-balance md:col-span-8">
          {title}
        </h2>
        {sub ? (
          <Reveal from="right" className="col-span-4 md:col-span-4 md:col-start-9 md:justify-self-end md:pb-2">
            <p className="max-w-[380px] text-base leading-[1.5] tracking-[-0.01em] text-ink/85 lg:text-[15px]">{sub}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal from="fade" className="mt-4 md:hidden">
          <TextLink href={action.href}>{action.label}</TextLink>
        </Reveal>
      ) : null}
    </div>
  );
}

// Section-top rule that draws in from the left as it enters.
export function Hairline({ className = "" }: { className?: string }) {
  return <div aria-hidden data-reveal="line" className={`h-px bg-ink/25 ${className}`} />;
}
