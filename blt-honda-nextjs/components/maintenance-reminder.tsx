"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CalendarClock, CheckCircle2, Gauge, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";
import { maintenance, waLink } from "@/lib/site";

const fmt = (n: number) => new Intl.NumberFormat("tr-TR").format(n);
const digits = (v: string) => v.replace(/\D/g, "").slice(0, 7);

function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id} className="block min-w-0">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{label}</span>
      <input
        id={id}
        data-testid={`maintenance-${id}`}
        className="mt-2 h-12 w-full min-w-0 appearance-none rounded-xl border border-white/10 bg-ink-950 px-4 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-zinc-600 focus:border-honda focus:shadow-[0_0_0_4px_rgba(204,0,0,0.15)] [color-scheme:dark]"
        {...props}
      />
    </label>
  );
}

function compute(km: string, lastKm: string, lastDate: string) {
  const cur = Number(km);
  if (!cur) return null;
  const base = lastKm ? Number(lastKm) : cur;
  const nextKm = base + maintenance.intervalKm;
  const remainingKm = nextKm - cur;
  let nextDate: Date | null = null;
  let daysLeft: number | null = null;
  if (lastDate) {
    nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + maintenance.intervalMonths);
    daysLeft = Math.ceil((nextDate.getTime() - Date.now()) / 86400000);
  }
  const due = remainingKm <= maintenance.warnKm || (daysLeft !== null && daysLeft <= maintenance.warnDays);
  const progress = Math.min(1, Math.max(0, (cur - base) / maintenance.intervalKm));
  return { cur, nextKm, remainingKm, nextDate, daysLeft, due, progress };
}

const STORAGE_KEY = "blt-honda-bakim";
const empty = { plate: "", km: "", lastKm: "", lastDate: "" };
type Form = typeof empty;

function useSavedForm() {
  const [form, setForm] = useState<Form>(empty);
  const [loaded, setLoaded] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        setForm({ ...empty, ...saved });
        setRestored(Boolean(saved.km || saved.plate));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const hasData = Object.values(form).some(Boolean);
    if (hasData) localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    else localStorage.removeItem(STORAGE_KEY);
  }, [form, loaded]);

  const set = (key: keyof Form, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const clear = () => {
    setForm(empty);
    setRestored(false);
  };
  return { form, set, clear, restored };
}

export function MaintenanceReminder() {
  const { form, set, clear, restored } = useSavedForm();
  const { plate, km, lastKm, lastDate } = form;
  const r = compute(km, lastKm, lastDate);
  const message = `Merhaba Bülent Usta, ${plate ? `${plate} plakalı ` : ""}Honda'm için bakım randevusu almak istiyorum.${r ? ` Güncel km: ${fmt(r.cur)}.` : ""}`;

  return (
    <section id="bakim" aria-labelledby="bakim-title" className="relative overflow-hidden bg-ink-950 py-24 lg:py-32" data-testid="maintenance-section">
      <div className="absolute -right-40 top-20 size-[480px] rounded-full bg-honda/10 blur-[140px]" />
      <div className="container relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading id="bakim" overline="Bakım Hatırlatma" title="Bir Sonraki" accent="Bakımınız" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              Güncel kilometrenizi girin, bir sonraki bakım kilometrenizi anında görün. Honda'nız için önerdiğimiz aralık:{" "}
              <span className="text-white">her {fmt(maintenance.intervalKm)} km veya 1 yıl</span>, hangisi önce dolarsa.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-w-0 lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10" data-testid="maintenance-card">
            <AnimatePresence initial={false}>
              {restored && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-zinc-300"
                  data-testid="maintenance-restored"
                >
                  <span>Hoş geldiniz! Son girdiğiniz bilgiler yüklendi.</span>
                  <button type="button" onClick={clear} data-testid="maintenance-clear" className="flex shrink-0 items-center gap-1.5 font-semibold text-white transition-colors hover:text-honda">
                    <RotateCcw className="size-3.5" /> Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="plate" label="Plaka (isteğe bağlı)" placeholder="55 ABC 123" value={plate} maxLength={12} onChange={(e) => set("plate", e.target.value.toUpperCase())} />
              <Field id="km" label="Güncel kilometre" inputMode="numeric" placeholder="ör. 48500" value={km} onChange={(e) => set("km", digits(e.target.value))} />
              <Field id="last-km" label="Son bakım km (isteğe bağlı)" inputMode="numeric" placeholder="ör. 40000" value={lastKm} onChange={(e) => set("lastKm", digits(e.target.value))} />
              <Field id="last-date" label="Son bakım tarihi (isteğe bağlı)" type="date" value={lastDate} onChange={(e) => set("lastDate", e.target.value)} />
            </div>
            <ResultPanel r={r} message={message} />
            <p className="mt-6 text-xs text-zinc-400">Bilgileriniz yalnızca bu cihazda, tarayıcınızda saklanır.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResultPanel({ r, message }: { r: ReturnType<typeof compute>; message: string }) {
  if (!r) {
    return (
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-zinc-400" data-testid="maintenance-empty">
        <Gauge className="size-5 text-honda" /> Hesaplamak için güncel kilometrenizi girin.
      </div>
    );
  }
  return (
    <div className="mt-8 border-t border-white/10 pt-8" data-testid="maintenance-result">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">Bir sonraki bakım</p>
      <motion.p
        key={r.nextKm}
        initial={{ opacity: 0.4, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-2 font-display text-5xl font-black tracking-tight sm:text-7xl ${r.due ? "text-honda" : "text-white"}`}
        data-testid="maintenance-next-km"
      >
        {fmt(r.nextKm)} <span className="text-2xl text-zinc-400 sm:text-3xl">km</span>
      </motion.p>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className={`h-full ${r.due ? "bg-honda" : "bg-white"}`} animate={{ width: `${r.progress * 100}%` }} transition={{ type: "spring", stiffness: 80, damping: 18 }} />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-300">
        <span data-testid="maintenance-remaining">{r.remainingKm > 0 ? `${fmt(r.remainingKm)} km kaldı` : `${fmt(-r.remainingKm)} km geçti`}</span>
        {r.nextDate && (
          <span className="flex items-center gap-2" data-testid="maintenance-next-date">
            <CalendarClock className="size-4 text-honda" /> {r.nextDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {r.due ? (
          <motion.div key="due" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-6 rounded-2xl border border-honda/50 bg-honda/10 p-5" data-testid="maintenance-warning">
              <p className="flex items-center gap-3 font-semibold text-white">
                <AlertTriangle className="size-5 shrink-0 animate-pulse text-honda" /> Bakım zamanınız gelmiş olabilir!
              </p>
              <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" data-testid="maintenance-whatsapp-button">
                  <MessageCircle /> WhatsApp'tan Randevu Al
                </a>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.p key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 flex items-center gap-2 text-sm text-zinc-300" data-testid="maintenance-ok">
            <CheckCircle2 className="size-4 text-emerald-400" /> Bakımınıza henüz zaman var.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
