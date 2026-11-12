"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; y?: number };

export function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ overline, title, accent, id }: { overline: string; title: string; accent?: string; id: string }) {
  return (
    <Reveal>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-honda">
        <span className="h-px w-10 bg-honda" />
        {overline}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        {title} {accent && <span className="block text-zinc-400 sm:inline">{accent}</span>}
      </h2>
    </Reveal>
  );
}
