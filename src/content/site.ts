// Every fact on the homepage comes from the Growthmak research pack
// (CRO audit, Business Goal Research, ICP, Competitor Analysis, Sitemap).
// Items marked [CONFIRM] are open questions for Sooraj and must be checked
// before launch — see the sitemap CSV notes column.

export const studio = {
  name: "Moori Interiors",
  shortName: "Moori",
  phone: "+971 55 353 2729",
  phoneHref: "tel:+971553532729",
  whatsappNumber: "971553532729",
  email: "sooraj@moori.ae",
  // [CONFIRM ADDRESS] Sports City matches the Google Business Profile and
  // schema; the old footer used Central Plaza, DIP 1. Publish one only.
  address: {
    line1: "Office 304, Building A1, Emirates Sports Hotel Apartments",
    line2: "Sports City, Dubai, UAE",
  },
  hours: [
    { days: "Mon – Fri", time: "10:00 – 18:00" },
    { days: "Saturday", time: "10:00 – 15:00" },
    { days: "Sunday", time: "Closed" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/moori_interiors" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/moori-interiors" },
    { label: "Pinterest", href: "https://www.pinterest.com/mooriinterior" },
  ],
  // [CONFIRM SLA] The reply-time promise must match real team capacity.
  replyPromise: "We reply within one working day",
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
] as const;

export const primaryCta = { label: "Book a free consultation", href: "/consultation" };

// Proof bar — real data only (G4). Google: 5.0 from 3 reviews; the count is
// below any sensible threshold, so it is omitted rather than shown.
export const proof = [
  "Featured in Architectural Digest Middle East · July 2025",
  "ISOLA Awards finalist 2024",
  "Dubai Design Week 2024 · UAE Designer 5.0",
  "Rated 5.0 on Google",
];

// Conversion beats over the hero walkthrough, one at a time. `frames` is the
// range of the 240-frame sequence each one owns (taken from where its room
// is in view). Each CTA opens the consultation form tagged with the room.
export const heroScenes = [
  {
    id: "kitchen",
    frames: [52, 120],
    room: "Kitchen",
    title: "A kitchen built around how you cook",
    body: "Walnut joinery, stone and a bespoke island — detailed by your own designer, never picked from a catalogue.",
    cta: { label: "Plan my kitchen", href: "/consultation?interest=kitchen" },
    link: { label: "Kitchen guide", href: "/journal/luxury-kitchen-renovation-dubai" },
  },
  {
    id: "dining",
    frames: [121, 172],
    room: "Dining",
    title: "A table for every generation",
    body: "Homes planned around how your whole family gathers — from everyday meals to the big occasions.",
    cta: { label: "Plan a family home", href: "/consultation?interest=family-home" },
    link: { label: "Multigenerational homes", href: "/journal/multigenerational-home-design-dubai" },
  },
  {
    id: "hallway",
    frames: [180, 239],
    room: "Hallway",
    title: "Art with a story",
    body: "We source one-of-a-kind pieces — like the local artist's work we found for a DAMAC Hills home.",
    cta: { label: primaryCta.label, href: "/consultation?interest=whole-home" },
    link: { label: "See the DAMAC Hills villa", href: "/projects/whitefield-villa-damac-hills" },
  },
] as const;

// Moori's published philosophy (homepage): Minimalism, Materiality,
// Experientialism — "Sense of Purpose / Presence / Balance".
export const philosophy = [
  {
    title: "Minimalism",
    sense: "A sense of purpose",
    body: "Only what earns its place — calm rooms that work hard for everyday life.",
  },
  {
    title: "Materiality",
    sense: "A sense of presence",
    body: "Stone, timber, plaster and linen, chosen for how they feel and how they age.",
  },
  {
    title: "Experientialism",
    sense: "A sense of balance",
    body: "Spaces shaped around how your family moves, gathers and rests.",
  },
];

// From the ICP challenger table: contractor-led "free design" vs Moori.
export const designerComparison = [
  {
    topic: "Who the design serves",
    contractor: "Bundled in to win the build contract",
    moori: "You — every client is matched with a designer",
  },
  {
    topic: "Your involvement",
    contractor: "Choose from a set of options",
    moori: "Part of every key decision, from the first workshop",
  },
  {
    topic: "Pricing clarity",
    contractor: "Design cost absorbed into the build",
    moori: "Published fees — design from AED 12k, turnkey from AED 100k",
  },
  {
    topic: "Detailing & sourcing",
    contractor: "Standard catalogue items are common",
    moori: "Custom furniture and one-of-a-kind sourcing",
  },
  {
    topic: "Execution",
    contractor: "Builds what was sold",
    moori: "Turnkey — or design-only with your own contractor",
  },
];

export type Project = {
  name: string;
  community: string;
  type: string;
  year: number;
  href: string;
  image: string;
  alt: string;
  // [CONFIRM per project] "Completed" or "Design visualisation" (G3).
  status?: "Completed" | "Design visualisation";
};

// Villas first, ordered by relevance to the ICP.
export const selectedWork: Project[] = [
  {
    name: "Whitefield Villa",
    community: "DAMAC Hills",
    type: "Villa",
    year: 2025,
    href: "/projects/whitefield-villa-damac-hills",
    image: "/images/damac-hills-whitefield-villa.jpg",
    alt: "Contemporary dining area with timber shelving in the Whitefield villa, DAMAC Hills",
  },
  {
    name: "Golf Estates Villa",
    community: "Jumeirah Golf Estates",
    type: "Villa",
    year: 2024,
    href: "/projects/villa-jumeirah-golf-estates",
    image: "/images/jumeirah-golf-estates-villa.jpg",
    alt: "Double-height entrance lobby with a pendant light cascade in a Jumeirah Golf Estates villa",
  },
  {
    name: "Desert Leaf Villa",
    community: "Al Barari",
    type: "Villa",
    year: 2024,
    href: "/projects/desert-leaf-villa-al-barari",
    image: "/images/al-barari-desert-leaf-villa.jpg",
    alt: "Panelled study with a sculpted timber desk in the Desert Leaf villa, Al Barari",
  },
  {
    name: "Tilal Al Ghaf Townhouse",
    community: "Tilal Al Ghaf",
    type: "Townhouse",
    year: 2025,
    href: "/projects/townhouse-tilal-al-ghaf",
    image: "/images/tilal-al-ghaf-townhouse.jpg",
    alt: "Living and dining room with a curved bouclé sofa in a Tilal Al Ghaf townhouse",
  },
  {
    name: "Botanica Tower Apartment",
    community: "Dubai Marina",
    type: "Apartment",
    year: 2025,
    href: "/projects/botanica-tower-dubai-marina",
    image: "/images/botanica-tower-apartment.jpg",
    alt: "Dining room with paper pendant lights and walnut panelling in a Botanica Tower apartment",
  },
  {
    name: "Al Seef Tower Apartment",
    community: "Dubai Marina",
    type: "Apartment",
    year: 2024,
    href: "/projects/al-seef-tower-dubai-marina",
    image: "/images/al-seef-tower-apartment.jpg",
    alt: "Walnut display niches with sculpture beside a cream lounge chair in an Al Seef Tower apartment",
  },
];

export const featuredHospitality: Project = {
  name: "Savane",
  community: "Dubai",
  type: "Restaurant",
  year: 2024,
  href: "/projects/savane",
  image: "/images/savane-restaurant.jpg",
  alt: "Entrance to Savane restaurant with layered greenery and a lettered screen",
};

export const projectFilters = [
  { label: "Villas & townhouses", href: "/projects?type=villas" },
  { label: "Apartments", href: "/projects?type=apartments" },
  { label: "Hospitality & F&B", href: "/projects?type=hospitality" },
  { label: "Landscape", href: "/projects?type=landscape" },
  { label: "Concepts & awards", href: "/projects?type=concepts" },
];

// Only communities with a delivered Moori project.
export const communities = [
  {
    name: "DAMAC Hills",
    href: "/communities/damac-hills",
    work: "Whitefield villa · 2025",
    image: "/images/damac-hills-bar.jpg",
    alt: "Minimalist bar counter in a DAMAC Hills villa",
  },
  {
    name: "Tilal Al Ghaf",
    href: "/communities/tilal-al-ghaf",
    work: "Villa & townhouse · 2025",
    image: "/images/tilal-al-ghaf-townhouse.jpg",
    alt: "Townhouse living room in Tilal Al Ghaf",
  },
  {
    name: "Al Barari",
    href: "/communities/al-barari",
    work: "Desert Leaf villa · 2024",
    image: "/images/al-barari-lounge.jpg",
    alt: "Classic lounge with a gallery wall in the Desert Leaf villa, Al Barari",
  },
  {
    name: "Jumeirah Golf Estates",
    href: "/communities/jumeirah-golf-estates",
    work: "Private villa · 2024",
    image: "/images/jumeirah-golf-estates-lobby.jpg",
    alt: "Entrance lobby of a Jumeirah Golf Estates villa",
  },
  {
    name: "Dubai Marina",
    href: "/communities/dubai-marina",
    work: "Botanica & Al Seef towers",
    image: "/images/dubai-marina-bedroom.jpg",
    alt: "Bedroom with a green marble feature wall in a Dubai Marina apartment",
  },
  {
    name: "Nadd Al Sheba",
    href: "/communities/nadd-al-sheba",
    work: "Private villa · 2025",
    // [CONFIRM] Replace with a photo from the Nadd Al Sheba villa.
    image: "/images/villa-lounge-seating.jpg",
    alt: "Lounge seating in a private Dubai villa",
  },
];

// Timelines from the published pricing FAQ.
export const process = [
  {
    step: "01",
    label: "Listen",
    title: "Discovery",
    body: "We start with your routines, your family and how you want to live — online or in person.",
    timing: "Free first session",
    image: "/images/process-discovery.jpg",
    icon: "search",
  },
  {
    step: "02",
    label: "Imagine",
    title: "Concept",
    body: "Mood boards, layouts and a creative direction you shape with your matched designer.",
    timing: "2 – 4 weeks",
    image: "/images/process-concept.jpg",
    icon: "cube",
  },
  {
    step: "03",
    label: "Detail",
    title: "Design development",
    body: "Drawings, materials, lighting and custom pieces, reviewed with you at every key decision.",
    timing: "3 – 5 weeks",
    image: "/images/process-design-development.jpg",
    icon: "bulb",
  },
  {
    step: "04",
    label: "Deliver",
    title: "Implementation & styling",
    body: "Turnkey execution or oversight of your contractor, through to the final styling.",
    timing: "2 – 6 months",
    image: "/images/process-implementation.jpg",
    icon: "check",
  },
] as const;

export const services = [
  {
    title: "Villa & Townhouse Interiors",
    body: "Whole-home interiors for villas and townhouses, planned around how your family lives.",
    href: "/services/villa-interior-design",
  },
  {
    title: "Apartment Interiors",
    body: "From developer finish to a finished home in Dubai's towers and residences.",
    href: "/services/apartment-interior-design",
  },
  {
    title: "Design & Build (Turnkey)",
    body: "One studio from concept to handover — design, fit-out and project management.",
    href: "/services/design-and-build",
  },
  {
    title: "Home Renovation",
    body: "Interior and exterior renovation, from kitchens and bathrooms to whole floors.",
    href: "/services/home-renovation",
  },
  {
    title: "Custom Furniture",
    body: "Bespoke pieces designed for your space — furniture-only commissions welcome.",
    href: "/services/custom-furniture",
  },
  {
    title: "Landscape & Outdoor",
    body: "Gardens, courtyards and poolside living designed with the same material care.",
    href: "/services/landscape-design",
  },
  {
    title: "Hospitality & F&B",
    body: "Cafés, restaurants and lounges where the venue is part of the experience.",
    href: "/services/hospitality-interior-design",
  },
];

// The four real testimonials published on moori.ae, names as published.
export const testimonials = [
  {
    title: "Refreshingly non-pushy",
    quote:
      "Choosing Moori for my home at Damac Hills was an exercise in trust and collaboration, especially since I spend most of my time in Germany. They were refreshingly non-pushy and listened to my ideas with patience.",
    name: "Shikha",
    context: "DAMAC Hills villa · owner based abroad",
    href: "/projects/whitefield-villa-damac-hills",
    linkLabel: "See the DAMAC Hills villa",
    image: "/images/whitefield-bedroom.jpg",
    alt: "Minimalist bedroom in the Whitefield villa, DAMAC Hills",
  },
  {
    title: "Good, genuine, sincere people",
    quote:
      "Their discovery session was detailed and thoughtful, making me feel heard and valued. Their open communication, particularly about finances, was reassuring.",
    name: "Vineet Israni",
    context: "Homeowner, Dubai",
    href: "/process",
    linkLabel: "How our process works",
    image: "/images/testimonial-living.jpg",
    alt: "Living room framed by arched steel-and-glass doors",
  },
  {
    title: "They really “got” me",
    quote:
      "During our discovery session they asked about my daily routine, what I loved about my home, and even what scents I preferred. If you're looking for a design studio that listens to you, Moori is the place to go.",
    name: "Nithu Joseph",
    context: "Homeowner, Dubai",
    href: "/services/villa-interior-design",
    linkLabel: "Villa & townhouse interiors",
    image: "/images/testimonial-living-room.jpg",
    alt: "Bright living room with a sculptural chandelier",
  },
  {
    title: "Sensitive to my family's needs",
    quote:
      "We have a multi-generational household, and they took the time to understand the dynamics. Thank you for building trust and being prompt with timelines and budgets.",
    name: "Mahitha Balakrishnan",
    context: "Multigenerational family home",
    href: "/journal/multigenerational-home-design-dubai",
    linkLabel: "Designing multigenerational homes",
    image: "/images/testimonial-family-dining.jpg",
    alt: "Family dining table beneath a linear pendant in a villa",
  },
];

export const journal = [
  {
    title: "Luxury kitchen renovation in Dubai: what to decide first",
    topic: "Kitchens & Bathrooms",
    href: "/journal/luxury-kitchen-renovation-dubai",
    image: "/images/journal-kitchen.jpg",
    alt: "Walnut kitchen wall with an island and bar stools",
  },
  {
    title: "Designing a multigenerational home in Dubai",
    topic: "Living & Wellbeing",
    href: "/journal/multigenerational-home-design-dubai",
    image: "/images/journal-bedroom.jpg",
    alt: "Calm bedroom with a timber headboard wall",
  },
  {
    title: "Timeless minimalism for Dubai homes",
    topic: "Guides",
    href: "/journal/timeless-minimalism-dubai-homes",
    image: "/images/journal-design.jpg",
    alt: "Minimal dining space in pale timber and plaster",
  },
];

// Qualifying form options. Budget bands stay configurable until Sooraj
// confirms the AOV threshold [CONFIRM AOV].
export const form = {
  propertyTypes: ["Villa / townhouse", "Apartment", "Café / restaurant", "Other"],
  scopes: ["Design only", "Design + execution"],
  budgets: ["Under AED 100k", "AED 100k – 250k", "AED 250k – 500k", "AED 500k +"],
  communities: [
    "DAMAC Hills",
    "Tilal Al Ghaf",
    "Al Barari",
    "Jumeirah Golf Estates",
    "Dubai Marina",
    "Nadd Al Sheba",
    "Other Dubai community",
    "Abu Dhabi / other emirate",
  ],
};

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Communities", href: "/communities" },
      { label: "Journal", href: "/journal" },
      { label: "Press & Awards", href: "/studio/press-and-awards" },
    ],
  },
  {
    title: "Services",
    links: services.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Work with us",
    links: [
      { label: "Book a consultation", href: "/consultation" },
      { label: "Pricing", href: "/pricing" },
      { label: "Owners abroad", href: "/owners-abroad" },
      { label: "Trade partners", href: "/trade-partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
