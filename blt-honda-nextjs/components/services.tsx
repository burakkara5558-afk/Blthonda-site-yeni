"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { services, site, type Service } from "@/lib/site";

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const Icon = s.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800 p-7 transition-[border-color,background-color,box-shadow] duration-500 hover:border-honda/40 hover:bg-ink-700 hover:shadow-[0_30px_60px_-30px_rgba(204,0,0,0.45)] lg:p-8"
      data-testid={`service-card-${i + 1}`}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-xl border border-white/10 bg-ink-950 text-honda transition-[background-color,color,transform] duration-500 group-hover:rotate-[-6deg] group-hover:bg-honda group-hover:text-white">
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <span className="font-display text-5xl font-black text-white/[0.06] transition-colors duration-500 group-hover:text-honda/20">
          0{i + 1}
        </span>
      </div>
      <h3 className="mt-10 font-display text-xl font-bold uppercase tracking-tight text-white">{s.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{s.text}</p>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`service-card-${i + 1}-cta`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
      >
        Bilgi al <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-honda transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-title" className="relative overflow-hidden bg-ink-900 py-24 lg:py-32" data-testid="services-section">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container relative">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="hizmetler" overline="Uzmanlık & Hizmetler" title="Hizmetlerimiz" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
                Yalnızca Honda araçlara bakıyoruz. Civic'ten CR-V'ye, City'den Accord'a; bakımdan onarıma tüm
                işlemleri Honda eğitimli ustalıkla tek çatı altında yapıyoruz.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6">
            <figure className="clip-notch relative aspect-[16/9] overflow-hidden rounded-tl-2xl bg-ink-800">
              <Image src="/images/steering.jpg" alt="Honda direksiyonu ve gösterge paneli" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[center_40%] transition-transform duration-1000 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/80 via-ink-950/10 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-200">
                Sadece Honda · Samsun
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
