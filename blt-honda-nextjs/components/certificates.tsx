"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ChevronDown, Maximize2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";
import { CertificateLightbox } from "@/components/certificate-lightbox";
import { certificates } from "@/lib/site";

const LIMIT = 8;

export function Certificates() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certificates : certificates.slice(0, LIMIT);
  return (
    <section id="belgeler" aria-labelledby="belgeler-title" className="relative bg-ink-950 py-24 lg:py-32" data-testid="certificates-section">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading id="belgeler" overline="Belgelerimiz & Sertifikalar" title="Honda Uzmanlık" accent="Belgelerimiz" />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="flex gap-3 text-base leading-relaxed text-zinc-400">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-honda" />
              Ustamız Bülent Uyar'ın 2001'den bu yana Honda Türkiye, Honda Akademi ve Anadolu Honda eğitim merkezlerinden aldığı {certificates.length} uzmanlık belgesi.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4" data-testid="certificates-grid">
          {visible.map((c, i) => (
            <motion.button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${c.title} büyüt`}
              key={c.image ?? c.title}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative flex cursor-zoom-in flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-2 text-left transition-[border-color] duration-500 hover:border-honda/40 sm:p-3"
              data-testid={`certificate-card-${i + 1}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f4f1ea]">
                {c.image ? (
                  <Image src={c.image} alt={`${c.title} – ${c.issuer} belgesi`} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 bg-ink-950 p-6 text-center">
                    <span className="grid size-16 place-items-center rounded-full border border-honda/40 bg-honda/10 text-honda transition-transform duration-500 group-hover:scale-110">
                      <Award className="size-7" strokeWidth={1.5} />
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">Belge görseli</span>
                  </div>
                )}
                <span className="absolute right-0 top-0 h-10 w-10 bg-honda [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-ink-950/80 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </div>
              <span className="flex flex-1 flex-col gap-1 px-1 pb-1 pt-3 sm:px-2 sm:pt-4">
                <span className="line-clamp-3 sm:line-clamp-2 font-display text-xs font-bold uppercase leading-snug tracking-wide text-white sm:text-sm sm:tracking-normal">{c.title}</span>
                <span className="text-xs text-zinc-400">{c.issuer} · {c.date}</span>
              </span>
            </motion.button>
          ))}
        </div>
        {certificates.length > LIMIT && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => setShowAll((s) => !s)} data-testid="certificates-toggle">
              {showAll ? "Daha Az Göster" : `Tüm Belgeleri Göster (${certificates.length})`}
              <ChevronDown className={showAll ? "rotate-180" : ""} />
            </Button>
          </div>
        )}
      </div>
      <CertificateLightbox items={certificates} index={active} onChange={setActive} />
    </section>
  );
}
