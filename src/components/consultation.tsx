"use client";

import { useId, useState, type FormEvent } from "react";
import { form, studio, whatsappHref } from "@/content/site";
import { Reveal } from "./reveal";
import { Container, grid } from "./ui";

function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label text-ink/70">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="relative">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="peer sr-only"
            />
            <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-chip px-4 py-2 text-center text-[15px] lg:min-h-10 lg:text-sm font-medium tracking-[-0.01em] transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink/40">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const fieldClass =
  "w-full border-b border-ink/60 bg-transparent pt-3 pb-3.5 text-[17px] tracking-[-0.02em] placeholder:text-ink/60 focus:border-ink focus:outline-none";

// Dark ink card: reassurance and direct contact on the left, the qualifying
// form on a cream panel to the right.
export function Consultation() {
  const id = useId();
  const [propertyType, setPropertyType] = useState("");
  const [scope, setScope] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!propertyType) {
      setError("Please choose your property type.");
      return;
    }
    setError("");
    // Routes the qualified enquiry straight to the team on WhatsApp.
    // Swap for the CRM endpoint once it is chosen [open question 11].
    const lines = [
      "New consultation request — moori.ae homepage",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      data.get("email") ? `Email: ${data.get("email")}` : "",
      `Property: ${propertyType}`,
      `Community: ${data.get("community") || "—"}`,
      `Looking for: ${scope || "—"}`,
      `Budget: ${budget || "—"}`,
    ].filter(Boolean);
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  }

  return (
    <section id="consultation" aria-labelledby="consultation-title" className="py-8 md:py-12 lg:py-16">
      <Container>
        <Reveal className="rounded-xl bg-ink p-2 text-cream xs:p-3 sm:p-4">
          <div className={`${grid} gap-y-8 md:gap-y-10`}>
            <Reveal from="left" className="col-span-4 flex flex-col px-3 pt-6 xs:px-4 sm:px-6 md:col-span-12 md:pt-8 lg:col-span-5 lg:pt-10 lg:pb-6">
              <p className="label text-cream/70">Consultation</p>
              <h2 id="consultation-title" className="heading-section mt-6 max-w-[460px] text-balance md:mt-8">
                Book a free design consultation
              </h2>
              <p className="mt-5 max-w-[400px] text-[16px] leading-[1.5] text-cream/85">
                Tell us about your home. A designer — not a salesperson — will call you back.
              </p>

              <ul className="mt-6 flex flex-col md:mt-8">
                {[
                  "Free, with no obligation",
                  "Online or in person, wherever you live",
                  studio.replyPromise,
                  "Style, needs, initial direction and next steps",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-t border-cream/20 py-3.5 text-base last:border-b lg:text-[15px]">
                    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                      <path d="m3.5 8.3 2.8 2.7 6.2-6.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-4 pt-8 text-[15px] min-[400px]:grid-cols-2 md:grid-cols-4 md:pt-10 lg:grid-cols-2 lg:gap-y-6 lg:pt-12 lg:text-sm">
                <div>
                  <dt className="label text-cream/60">Phone</dt>
                  <dd className="mt-0.5 lg:mt-1.5">
                    <a href={studio.phoneHref} className="inline-flex min-h-11 items-center hover:underline lg:min-h-0">{studio.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="label text-cream/60">Email</dt>
                  <dd className="mt-0.5 lg:mt-1.5">
                    <a href={`mailto:${studio.email}`} className="inline-flex min-h-11 items-center break-all hover:underline lg:min-h-0">{studio.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="label text-cream/60">WhatsApp</dt>
                  <dd className="mt-0.5 lg:mt-1.5">
                    <a href={whatsappHref("Hi Moori, I'd like to book a free consultation.")} className="inline-flex min-h-11 items-center hover:underline lg:min-h-0">
                      Chat with the team
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label text-cream/60">Studio</dt>
                  <dd className="mt-0.5 flex min-h-11 items-center leading-[1.5] text-cream/85 lg:mt-1.5 lg:block lg:min-h-0">Sports City, Dubai</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal from="right" className="col-span-4 md:col-span-12 lg:col-span-7">
              <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-lg bg-cream p-4 text-ink xs:p-5 sm:p-8 md:gap-7 md:p-10">
                <p className="text-xl font-medium tracking-[-0.02em]">Tell us about your home</p>

                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={`${id}-name`} className="sr-only">Full name</label>
                    <input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Full name" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-phone`} className="sr-only">Phone or WhatsApp number</label>
                    <input id={`${id}-phone`} name="phone" required type="tel" autoComplete="tel" placeholder="Phone / WhatsApp" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-email`} className="sr-only">Email (optional)</label>
                    <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={fieldClass} />
                  </div>
                </div>

                <ChipGroup legend="Property type" name="propertyType" options={form.propertyTypes} value={propertyType} onChange={setPropertyType} />

                <div className="relative">
                  <label htmlFor={`${id}-community`} className="sr-only">Community</label>
                  <select id={`${id}-community`} name="community" defaultValue="" className={`${fieldClass} appearance-none pr-8`}>
                    <option value="" disabled>Your community</option>
                    {form.communities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <svg viewBox="0 0 12 12" className="pointer-events-none absolute top-1/2 right-1 size-3 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                  <ChipGroup legend="What are you looking for?" name="scope" options={form.scopes} value={scope} onChange={setScope} />
                  <ChipGroup legend="Project budget" name="budget" options={form.budgets} value={budget} onChange={setBudget} />
                </div>

                {error ? (
                  <p role="alert" className="text-[15px] font-medium text-[#9a3b2e] lg:text-sm">{error}</p>
                ) : null}

                <div>
                  <button
                    type="submit"
                    className="h-[52px] w-full rounded-full bg-ink text-[15px] lg:h-12 font-medium uppercase tracking-[-0.02em] text-cream transition-[background-color,transform] duration-300 ease-out-quint hover:bg-ink-deep active:scale-[0.99]"
                  >
                    Request my consultation
                  </button>
                  <p aria-live="polite" className="mt-3 text-center text-sm text-ink/75 lg:text-[13px]">
                    {sent
                      ? "Thank you — WhatsApp has opened with your details. Press send and we'll be in touch."
                      : "Your answers open in WhatsApp so they reach our team directly."}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
