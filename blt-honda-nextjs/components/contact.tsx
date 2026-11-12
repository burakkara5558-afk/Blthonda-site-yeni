import { Clock, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";
import { site } from "@/lib/site";

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 border-t border-white/10 py-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-honda/10 text-honda">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{label}</p>
        <div className="mt-2 text-base text-white md:text-lg">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="iletisim" aria-labelledby="iletisim-title" className="relative bg-ink-900 py-24 lg:py-32" data-testid="contact-section">
      <div className="container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="iletisim" overline="İletişim & Konum" title="Bize Ulaşın" />
          <Reveal delay={0.1} className="mt-10">
            <InfoRow icon={MapPin} label="Adres">
              <address className="not-italic" data-testid="contact-address">{site.address}</address>
            </InfoRow>
            <InfoRow icon={Phone} label="Telefon">
              <a href={site.phoneHref} className="transition-colors hover:text-honda" data-testid="contact-phone">{site.phoneDisplay}</a>
            </InfoRow>
            <InfoRow icon={Clock} label="Çalışma Saatleri">
              <span data-testid="contact-hours">{site.hours}</span>
            </InfoRow>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
              <Button asChild>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-button">
                  <MessageCircle /> WhatsApp'tan Yaz
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={site.phoneHref} data-testid="contact-call-button"><Phone /> Hemen Ara</a>
              </Button>
              <Button asChild variant="ghost">
                <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" data-testid="contact-directions-button">
                  <Navigation /> Yol Tarifi
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7 lg:pt-24">
          <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-ink-800" data-testid="contact-map">
            <iframe
              title="BLT Honda konumu"
              src={site.mapEmbed}
              className="h-96 w-full rounded-lg lg:h-[520px]"
              style={{ filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink-950/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              <span className="size-2 rounded-full bg-honda" /> Toybelen Sanayi Sitesi
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
