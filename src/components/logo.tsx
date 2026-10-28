import Image from "next/image";

// The Moori Interiors mark, tinted from the original asset (Website Assets/
// Moori_Interiors_logo.png): ink for cream surfaces, cream for dark ones.
const WIDTH = 317;
const HEIGHT = 178;

export function Logo({
  tone = "ink",
  className = "",
  preload = false,
}: {
  tone?: "ink" | "cream";
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={`/brand/moori-logo-${tone}.png`}
      alt="Moori Interiors"
      width={WIDTH}
      height={HEIGHT}
      preload={preload}
      sizes="160px"
      className={`h-auto ${className}`}
    />
  );
}
