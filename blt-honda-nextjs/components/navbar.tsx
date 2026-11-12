"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Gauge, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ScrollLink } from "@/components/smooth-scroll";
import { AppointmentMenu } from "@/components/appointment-menu";
import { SocialLinks } from "@/components/social-links";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-white/10 bg-ink-950/70 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
      data-testid="navbar"
    >
      <nav className="container flex h-[72px] items-center justify-between gap-6" aria-label="Ana menü">
        <ScrollLink to="anasayfa" aria-label="BLT Honda ana sayfa" data-testid="navbar-logo">
          <Logo />
        </ScrollLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <ScrollLink
                to={l.id}
                data-testid={`nav-link-${l.id}`}
                className={cn(
                  "group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors xl:px-4",
                  l.id === "bakim" ? "text-honda hover:text-white" : "text-zinc-300 hover:text-white"
                )}
              >
                {l.id === "bakim" && <Gauge className="size-4" />}
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-honda transition-transform duration-300 group-hover:scale-x-100 xl:inset-x-4" />
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SocialLinks prefix="navbar" className="hidden xl:flex" />
          <span className="hidden h-6 w-px bg-white/10 xl:block" />
          <div className="hidden sm:block">
            <AppointmentMenu prefix="navbar" size="sm" />
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            data-testid="navbar-mobile-toggle"
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
            data-testid="navbar-mobile-menu"
          >
            <div className="container flex flex-col gap-1 py-6">
              {navLinks.map((l, i) => (
                <motion.div key={l.id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <ScrollLink
                    to={l.id}
                    onNavigate={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${l.id}`}
                    className="flex items-baseline gap-4 py-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white"
                  >
                    <span className="text-xs font-medium text-honda">0{i + 1}</span>
                    {l.label}
                  </ScrollLink>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <AppointmentMenu prefix="mobile" align="start" />
                <SocialLinks prefix="mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
