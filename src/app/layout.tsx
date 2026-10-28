import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { studio } from "@/content/site";
import "./globals.css";

// Inter with the optical-size axis renders the "Display" cut at large sizes,
// matching the template's Inter Display headlines.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moori.ae"),
  title: {
    default: "Luxury Villa & Apartment Interior Design in Dubai | Moori Interiors",
    template: "%s | Moori Interiors",
  },
  description:
    "Moori Interiors designs luxury villa and apartment interiors in Dubai with you, not for you. Featured in Architectural Digest Middle East. Book a free design consultation.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: studio.name,
    locale: "en_AE",
    images: [{ url: "/images/hero.jpg", width: 2000, height: 1439 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f0ebe6",
};

// One NAP everywhere: same as the footer and Google Business Profile.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: studio.name,
  url: "https://www.moori.ae",
  telephone: studio.phone,
  email: studio.email,
  image: "https://www.moori.ae/images/hero.jpg",
  priceRange: "AED 12,000+",
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.address.line1,
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  sameAs: studio.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        {children}
      </body>
    </html>
  );
}
