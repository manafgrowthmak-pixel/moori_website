// Oversized wordmark closing the footer. It holds still and is sized to the
// footer's own width (container query units), so the full name always fits
// edge to edge on every screen — nothing is cropped or scrolled away.
// At 800 weight and -0.055em tracking the name's ink is ~6.14em wide, so
// 16.2cqi fills ~99% of the container; -0.047em cancels the M's side bearing
// so the ink lines up with the content edge above.
export function FooterWordmark() {
  return (
    <div aria-hidden className="mx-auto max-w-[1440px] px-4 pt-6 pb-4 xs:px-5 sm:px-10 md:pt-8 md:pb-6">
      <div className="@container overflow-hidden">
        <p className="-ml-[0.047em] text-[16.2cqi] leading-[0.8] font-extrabold tracking-[-0.055em] whitespace-nowrap">
          Moori Interiors
        </p>
      </div>
    </div>
  );
}
