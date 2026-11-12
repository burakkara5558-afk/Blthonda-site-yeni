"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollLink } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = [
  { text: "Honda'nız", cls: "text-white" },
  { text: "İçin Uzman", cls: "text-white" },
  { text: "Dokunuş.", cls: "text-honda" },
];

function TiltCard() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 14 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 14 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.9, ease }}
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="w-full"
      data-testid="hero-tilt-card"
    >
      <motion.figure style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <div className="clip-angle relative aspect-[16/10] overflow-hidden bg-ink-800 lg:aspect-[4/5]">
          <Image src="/images/type-r.jpg" alt="Kırmızı Honda Civic Type R ön görünüm" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover object-[center_35%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
        </div>
        <figcaption
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
        >
          <span>
            <span className="block text-[11px] uppercase tracking-[0.3em] text-zinc-300">Civic · CR-V · City · Accord</span>
            <span className="mt-1 block font-display text-xl font-extrabold uppercase text-white">Sadece Honda</span>
          </span>
          <span className="grid size-11 place-items-center rounded-full bg-honda text-white shadow-[0_0_40px_rgba(204,0,0,0.6)]">
            <ArrowRight className="size-5 -rotate-45" />
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} id="anasayfa" aria-labelledby="hero-title" className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink-950" data-testid="hero-section">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <motion.div initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0">
          <Image src="/images/hero.jpg" alt="Gece ışıklarıyla aydınlatılmış Honda Civic" fill priority sizes="100vw" className="object-cover object-[60%_center]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
      <div className="absolute -left-40 top-1/3 -z-10 size-[520px] rounded-full bg-honda/20 blur-[140px]" />

      <motion.div style={{ y: contentY }} className="container grid min-h-[100svh] items-end gap-12 pb-28 pt-32 lg:grid-cols-12 lg:pb-32">
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-honda opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-honda" />
            </span>
            Samsun · Honda Özel Servis
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-display text-[12.5vw] font-black uppercase leading-[0.88] tracking-[-0.03em] sm:text-7xl lg:text-[6.6rem] xl:text-[7.4rem]">
            {lines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-[0.06em] pt-[0.1em]">
                <motion.span
                  className={`block ${l.cls}`}
                  initial={{ y: "110%", rotate: 3 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.13, ease }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-8 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg"
          >
            Yalnızca Honda'ya bakıyoruz. Civic, CR-V, City, Accord ve tüm Honda modelleri için Honda eğitimli
            ustalık, şeffaf iletişim ve titiz işçilik; Toybelen Sanayi'deki atölyemizde.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="group">
              <ScrollLink to="hizmetler" data-testid="hero-services-button">
                Hizmetlerimizi İnceleyin
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </ScrollLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-button">
                <MessageCircle />
                WhatsApp'tan Ulaşın
              </a>
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-4">
          <TiltCard />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink-950/50 backdrop-blur-md"
      >
        <div className="container grid grid-cols-1 py-4 text-sm text-zinc-300 sm:grid-cols-3">
          <span className="hidden items-center gap-2 sm:flex"><Clock className="size-4 text-honda" /> {site.hours}</span>
          <span className="hidden items-center gap-2 sm:flex sm:justify-center"><MapPin className="size-4 text-honda" /> Toybelen Sanayi · Samsun</span>
          <a href={site.phoneHref} data-testid="hero-phone-link" className="flex items-center justify-between gap-2 transition-colors hover:text-white sm:justify-end">
            <span className="flex items-center gap-2"><Phone className="size-4 text-honda" /> {site.phoneDisplay}</span>
            <ArrowDown className="size-4 animate-bounce sm:hidden" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
