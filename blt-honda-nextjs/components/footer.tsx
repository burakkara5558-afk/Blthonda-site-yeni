import { Clock, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { ScrollLink } from "@/components/smooth-scroll";
import { SocialLinks } from "@/components/social-links";
import { AppointmentMenu } from "@/components/appointment-menu";
import { navLinks, site } from "@/lib/site";

const year = new Date().getFullYear();

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-honda">{title}</p>
      <div className="mt-6 space-y-4 text-sm text-zinc-300">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950" data-testid="footer">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 py-14 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-4xl">
            Honda'nız <span className="text-honda">emin ellerde.</span>
          </p>
          <AppointmentMenu prefix="footer" size="lg" align="start" />
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-400">
              Samsun'da yalnızca Honda araçlara özel bakım ve onarım servisi.
            </p>
            <SocialLinks prefix="footer" className="mt-6" />
          </div>
          <Col title="Hızlı Erişim">
            {navLinks.map((l) => (
              <ScrollLink key={l.id} to={l.id} data-testid={`footer-link-${l.id}`} className="block transition-colors hover:text-white">
                {l.label}
              </ScrollLink>
            ))}
          </Col>
          <Col title="İletişim">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-honda" /> {site.address}</p>
            <a href={site.phoneHref} data-testid="footer-phone" className="flex gap-3 transition-colors hover:text-white">
              <Phone className="mt-0.5 size-4 shrink-0 text-honda" /> {site.phoneDisplay}
            </a>
          </Col>
          <Col title="Çalışma Saatleri">
            <p className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-honda" /> {site.hours}</p>
            <a href={site.directionsHref} target="_blank" rel="noopener noreferrer" data-testid="footer-directions" className="inline-block border-b border-white/20 pb-0.5 transition-colors hover:border-honda hover:text-white">
              Yol tarifi al
            </a>
          </Col>
        </div>
      </div>

      <p aria-hidden="true" className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[16vw] font-black uppercase leading-[0.8] tracking-tighter text-white/[0.03]">
        BLT Honda
      </p>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-zinc-400 sm:flex-row">
          <p data-testid="footer-copyright">© {year} BLT Honda. Tüm hakları saklıdır.</p>
          <p>Toybelen Sanayi Sitesi · İlkadım / Samsun</p>
        </div>
      </div>
    </footer>
  );
}
