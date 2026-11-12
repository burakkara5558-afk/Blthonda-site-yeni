import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "BLT Honda: Samsun Toybelen Sanayi Sitesi'nde yalnızca Honda araçlara (Civic, CR-V, City, Accord, Jazz, HR-V) özel periyodik bakım, VTEC motor, fren, süspansiyon ve arıza teşhisi. Randevu: 0536 244 11 30.";

export const metadata: Metadata = {
metadataBase: new URL("https://www.blthonda.com"),
  title: { default: "BLT Honda | Samsun Honda Özel Servis", template: "%s | BLT Honda" },
  description,
  keywords: ["Honda servis Samsun", "Honda özel servis", "BLT Honda", "Honda bakım", "Civic servis Samsun", "CR-V servis", "Honda City bakım", "Honda Accord servis", "Toybelen sanayi Honda"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: "BLT Honda | Honda'nız İçin Uzman Dokunuş",
    description,
    images: [{ url: "/images/hero.jpg", width: 2200, height: 1438, alt: "BLT Honda" }],
  },
  twitter: { card: "summary_large_image", title: "BLT Honda", description, images: ["/images/hero.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#070709" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description,
  telephone: "+905362441130",
  brand: { "@type": "Brand", name: "Honda" },
  knowsAbout: ["Honda Civic", "Honda CR-V", "Honda City", "Honda Accord", "Honda Jazz", "Honda HR-V"],
  image: "/images/hero.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Toybelen Sanayi Sitesi, 9. Blok No: 6",
    addressLocality: "İlkadım",
    addressRegion: "Samsun",
    addressCountry: "TR",
  },
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
