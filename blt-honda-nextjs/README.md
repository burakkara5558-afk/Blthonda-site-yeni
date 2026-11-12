# BLT Honda — Next.js One-Page

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Shadcn UI · Lenis · lucide-react

## Kurulum

```bash
yarn install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL değerini kendi alan adınızla değiştirin
yarn dev                      # http://localhost:3000
yarn build && yarn start      # canlı
```

## Düzenleme noktaları

- `lib/site.ts` — telefon, adres, saatler, sosyal linkler, hizmetler, belgeler (tek yerden).
- `lib/instagram-embed.ts` — Instagram widget kodunu (script / iframe / div) ters tırnaklar arasına olduğu gibi yapıştırın. Boşken 8 yer tutucu kare görünür.
- `lib/site.ts > certificates` — yeni belge: görseli `public/belgeler/` içine koyup listeye bir satır ekleyin (8'den fazlasında "Tüm Belgeleri Göster" butonu otomatik çıkar).
- `lib/site.ts > maintenance` — bakım aralığı (10.000 km / 12 ay) ve uyarı eşikleri.
- `public/images/` — Honda görselleri (Unsplash). Kendi atölye/Honda fotoğraflarınızla değiştirebilirsiniz.
- `app/icon.svg` — favicon (BLT logo işareti).
