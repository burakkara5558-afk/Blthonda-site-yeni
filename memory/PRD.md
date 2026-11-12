# BLT Honda — PRD

## Original problem statement
Bir oto servisi (BLT Honda) için Next.js (App Router), Tailwind CSS, TypeScript, Framer Motion ve Shadcn UI ile tek sayfalık modern, premium, SEO uyumlu site iskeleti. Koyu gri/siyah/beyaz + Honda Kırmızısı (#CC0000). Bölümler: Navbar (sticky, blur, Randevu Al), Hero ("Honda'nız İçin Uzman Dokunuş", 2 buton), Instagram akışı (@blthonda55, 8 placeholder, grid-cols-2 md:grid-cols-4), Hizmetlerimiz (6 kart, hover lift), Honda Uzmanlık Belgelerimiz (marquee/grid), İletişim + Harita (0536 244 11 30, h-96 iframe), Footer (telif, sosyal, hızlı iletişim). lucide-react ikonlar.
Ek: Randevu Al → WhatsApp'tan Yaz / Hemen Ara / İletişime kaydır. Adres: Toybelen Sanayi Sitesi, 9. Blok No: 6, İlkadım / Samsun. Saat 08:30–18:30. Sosyal: instagram.com/blthonda55, facebook.com/BLTHONDA, youtube.com/@Blthondasamsun. Teslim: sadece Next.js kod dosyaları.

## Architecture
/app/blt-honda-nextjs — Next.js 15 App Router, TS, Tailwind 3, framer-motion, lenis, shadcn (button, dropdown-menu), lucide-react 0.468. Content in lib/site.ts. SEO: metadata, OG, JSON-LD AutoRepair, robots.ts, sitemap.ts, icon.svg favicon.

## Implemented (2026-11-07)
- All 7 sections + editorial marquee, masked hero reveal, parallax + 3D tilt card, Lenis smooth scroll, appointment dropdown (3 actions), mobile menu. Builds clean (`yarn build`), verified at 1440/390.

## Iteration 2 (2026-11-07)
- Maintenance reminder card (#bakim): plaka, güncel km, son bakım km/tarih; next = son bakım (or current) + 10.000 km / +1 yıl; warning ≤1.000 km or ≤30 gün → red alert + WhatsApp (Bülent Usta) button. Verified at 1440/390.
- Certificate lightbox (click to open, prev/next, Esc, arrow keys). Real images still pending from user.
- Instagram: widget slot via lib/site.ts `instagramWidget {html, scriptSrc}`; placeholders shown while empty.

## Iteration 3 (2026-11-07)
- Honda-only pass: replaced generic images (taillight, mechanic) with Civic Type R + Honda steering wheel; Honda-model copy (Civic, CR-V, City, Accord, Jazz, HR-V) in hero/services/marquee/SEO; Car icon removed.
- 4 real certificates (Bülent Uyar, Honda Türkiye / Anadolu Honda) as webp in public/belgeler; grid scales to ~17 with "Tüm Belgeleri Göster" after 8. User uploaded 5 files, 2 were identical.
- "Bakım Hesapla" nav link; maintenance form persisted in localStorage with restore notice + Temizle.
- Instagram: lib/instagram-embed.ts raw HTML (script/iframe executed via createContextualFragment).
- Source zip: /app/blt-honda-nextjs.zip

## Iteration 4 (2026-11-07)
- +5 certificates (2005–2008; 2 landscape scans rotated) → 9 total, newest first, object-contain cards.
- Instagram: crawling instagram.com blocked (403); added lib/site.ts `instagramPosts` (image, href, isVideo) → photo tiles with "Instagram'da Gör" overlay linking to post/profile. Waiting for user's photos in public/instagram.

## Iteration 5 (2026-11-07)
- +5 certificates (ADAS 2016, CR-V/Civic Hybrid 2007, Hava Yastığı 2002, Elektrik-Multipleks 2002, Motor Arıza 2001) → 14 total. Mobile title letter-spacing fix. User mentioned 7 but uploaded 5.

## Backlog
- P1: Real certificate images, Instagram API/widget, own workshop photos
- P2: Contact form, reviews section
