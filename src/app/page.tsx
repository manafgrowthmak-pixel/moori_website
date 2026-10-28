import { Communities } from "@/components/communities";
import { Consultation } from "@/components/consultation";
import { DesignerTeaser } from "@/components/designer-teaser";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Journal } from "@/components/journal";
import { Process } from "@/components/process";
import { ProofMarquee } from "@/components/proof-marquee";
import { ScrollAnimations } from "@/components/scroll-animations";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { WhatsAppButton } from "@/components/whatsapp-button";

// Section order follows the homepage spec in 05_moori-interiors-sitemap.csv
// (1.1 – 1.13), dressed in the Arcsphere Studio template.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <ProofMarquee />
        <SelectedWork />
        <Communities />
        <Process />
        <Services />
        <Testimonials />
        <DesignerTeaser />
        <Journal />
        <Consultation />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ScrollAnimations />
    </>
  );
}
