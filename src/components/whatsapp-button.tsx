"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/content/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sticky WhatsApp route for visitors who won't fill a form. The prefilled
// message names the page so the team knows the context. It steps aside while
// the consultation form or footer is on screen so it never covers their
// buttons and icons (CRO audit M4) — both already carry a WhatsApp link.
export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["consultation", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref("Hi Moori, I'm on your homepage and would like to talk about my home.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Moori on WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      onClick={() => window.gtag?.("event", "whatsapp_click", { location: "sticky_button" })}
      className={`fixed right-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-ink text-cream shadow-[0_10px_30px_-10px_rgba(69,62,58,0.6)] transition-[opacity,transform] duration-300 ease-out-quint hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
        <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.3 21.8l4.9-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.2Z" />
      </svg>
    </a>
  );
}
