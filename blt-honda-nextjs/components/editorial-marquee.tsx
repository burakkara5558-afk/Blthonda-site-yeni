import { Asterisk } from "lucide-react";
import { marqueeWords } from "@/lib/site";

export function EditorialMarquee() {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-8 md:py-10" data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {words.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 font-display text-5xl font-black uppercase tracking-tight md:px-10 md:text-8xl ${
                i % 2 ? "text-outline" : "text-white"
              }`}
            >
              {w}
            </span>
            <Asterisk className="size-8 text-honda md:size-12" strokeWidth={2.5} />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
