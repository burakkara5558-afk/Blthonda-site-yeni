"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Award, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Certificate } from "@/lib/site";

type Props = { items: Certificate[]; index: number | null; onChange: (i: number | null) => void };

export function CertificateLightbox({ items, index, onChange }: Props) {
  const lenis = useLenis();
  const open = index !== null;
  const go = (d: number) => index !== null && onChange((index + d + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  });

  const c = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {c && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label={c.title}
          data-testid="certificate-lightbox"
        >
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-3xl flex-col"
          >
            <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#f4f1ea]">
              {c.image ? (
                <Image src={c.image} alt={c.title} fill sizes="90vw" className="object-contain" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-zinc-400">
                  <Award className="size-14 text-honda" strokeWidth={1.25} />
                  <span className="text-xs uppercase tracking-[0.25em]">Belge görseli eklenecek</span>
                </div>
              )}
            </div>
            <figcaption className="mt-4 flex flex-col gap-1 text-white sm:flex-row sm:items-center sm:justify-between">
              <span className="font-display text-lg font-bold uppercase" data-testid="certificate-lightbox-title">{c.title}</span>
              <span className="text-sm text-zinc-400">{c.issuer} · {c.date} · {(index ?? 0) + 1} / {items.length}</span>
            </figcaption>
          </motion.figure>

          <button type="button" aria-label="Kapat" data-testid="certificate-lightbox-close" onClick={() => onChange(null)} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/15 bg-ink-900 text-white transition-colors hover:bg-honda">
            <X className="size-5" />
          </button>
          {[{ d: -1, Icon: ChevronLeft, cls: "left-2 sm:left-6", id: "prev" }, { d: 1, Icon: ChevronRight, cls: "right-2 sm:right-6", id: "next" }].map(({ d, Icon, cls, id }) => (
            <button
              key={id}
              type="button"
              aria-label={d < 0 ? "Önceki" : "Sonraki"}
              data-testid={`certificate-lightbox-${id}`}
              onClick={(e) => {
                e.stopPropagation();
                go(d);
              }}
              className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/80 text-white transition-colors hover:bg-honda ${cls}`}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
