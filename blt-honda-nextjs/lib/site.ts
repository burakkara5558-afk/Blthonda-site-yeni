import {
  Cog,
  Crosshair,
  Disc3,
  ScanLine,
  Snowflake,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const address = "Toybelen Sanayi Sitesi, 9. Blok No: 6, İlkadım / Samsun";
const whatsappText = "Merhaba, BLT Honda servisinden randevu almak istiyorum.";

export const waLink = (text: string) => `https://wa.me/905362441130?text=${encodeURIComponent(text)}`;

export const site = {
  name: "BLT Honda",
  tagline: "Samsun Honda Özel Servis",
  phoneDisplay: "0536 244 11 30",
  phoneHref: "tel:+905362441130",
  whatsappHref: waLink(whatsappText),
  address,
  hours: "08:30 – 18:30",
  instagramHandle: "@blthonda55",
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`,
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
  social: {
    instagram: "https://www.instagram.com/blthonda55/",
    facebook: "https://www.facebook.com/BLTHONDA",
    youtube: "https://www.youtube.com/@Blthondasamsun",
  },
};

export const navLinks = [
  { id: "anasayfa", label: "Ana Sayfa" },
  { id: "hizmetler", label: "Hizmetlerimiz" },
  { id: "belgeler", label: "Belgelerimiz" },
  { id: "iletisim", label: "İletişim" },
  { id: "bakim", label: "Bakım Hesapla" },
];

export const hondaModels = ["Civic", "CR-V", "City", "Accord", "Jazz", "HR-V"];

export type Service = { icon: LucideIcon; title: string; text: string };

export const services: Service[] = [
  { icon: Wrench, title: "Honda Periyodik Bakım", text: "Honda bakım takvimine uygun yağ, filtre ve genel kontrol bakımları." },
  { icon: Cog, title: "Motor Revizyonu & VTEC", text: "Honda VTEC / i-VTEC motorlarda performans kontrolü, onarım ve ayar." },
  { icon: Disc3, title: "Fren Sistemleri", text: "Civic'ten CR-V'ye balata, disk ve fren hidroliği kontrolü." },
  { icon: Crosshair, title: "Süspansiyon & Rot-Balans", text: "Honda'nızın yol tutuşunu koruyan amortisör, salıncak ve rot-balans ayarı." },
  { icon: ScanLine, title: "Elektrik & Arıza Teşhisi", text: "Honda elektronik sistemlerinde arıza kodlarının okunması ve doğru teşhis." },
  { icon: Snowflake, title: "Klima Bakımı", text: "Honda klima sisteminde gaz, filtre ve kompresör kontrolü." },
];

// Yeni belge eklemek için: görseli /public/belgeler klasörüne koyun ve bu listeye bir satır ekleyin.
export type Certificate = { title: string; issuer: string; date: string; image?: string };

export const certificates: Certificate[] = [
  { title: "ADAS Sürüş Destek Sistemleri – Gümüş Sertifika", issuer: "Honda Türkiye A.Ş. · Honda Akademi", date: "Mart 2016", image: "/belgeler/adas-gumus-sertifika-2016.webp" },
  { title: "Accord'09 Yeni Model Eğitimi", issuer: "Honda Türkiye A.Ş.", date: "Haziran 2008", image: "/belgeler/accord-09-yeni-model-2008.webp" },
  { title: "2008YM CR-V [CMBS-ACC-AFS] Eğitimi", issuer: "Honda Türkiye A.Ş.", date: "Aralık 2007", image: "/belgeler/crv-2008ym-cmbs-acc-afs-2007.webp" },
  { title: "Yeni Model CR-V / Civic Hybrid", issuer: "Honda Türkiye A.Ş.", date: "Şubat 2007", image: "/belgeler/yeni-model-crv-civic-hybrid-2007.webp" },
  { title: "06 Yeni Model Legend", issuer: "Honda Türkiye A.Ş.", date: "Ağustos 2006", image: "/belgeler/yeni-model-legend-2006.webp" },
  { title: "ABS / VSA / Klima / Isıtma Sistemleri", issuer: "Honda Türkiye A.Ş.", date: "Haziran 2005", image: "/belgeler/abs-vsa-klima-isitma-2005.webp" },
  { title: "Yeni Model Dizel Accord", issuer: "Honda Türkiye A.Ş.", date: "Şubat 2005", image: "/belgeler/yeni-model-dizel-accord-2005.webp" },
  { title: "Motor Revizyonu / VTEC / i-VTEC", issuer: "Honda Türkiye A.Ş.", date: "Ekim 2004", image: "/belgeler/motor-revizyonu-vtec-2004.webp" },
  { title: "Elektrik Sistemlerinde Arıza Teşhisi", issuer: "Honda Türkiye A.Ş.", date: "Nisan 2004", image: "/belgeler/elektrik-sistemleri-ariza-teshisi-2004.webp" },
  { title: "İmmobilizer Kodlama ve Arıza Teşhisi", issuer: "Honda Türkiye A.Ş.", date: "Ekim 2003", image: "/belgeler/immobilizer-kodlama-2003.webp" },
  { title: "Hava Yastığı – İmmobilizer – PGM Tester", issuer: "Anadolu Honda Otomobilcilik A.Ş.", date: "Mart 2002", image: "/belgeler/hava-yastigi-immobilizer-pgm-2002.webp" },
  { title: "Elektrik – Multipleks – Elektrikli Direksiyon", issuer: "Anadolu Honda Otomobilcilik A.Ş.", date: "Ocak 2002", image: "/belgeler/elektrik-multipleks-direksiyon-2002.webp" },
  { title: "Motor Arıza Teşhisi", issuer: "Anadolu Honda Otomobilcilik A.Ş.", date: "Kasım 2001", image: "/belgeler/motor-ariza-teshisi-2001.webp" },
  { title: "Şasi Ses Analizi", issuer: "Anadolu Honda Otomobilcilik A.Ş.", date: "Temmuz 2001", image: "/belgeler/sasi-ses-analizi-2001.webp" },
];

// Instagram gönderilerinden fotoğrafları /public/instagram klasörüne koyun ve buraya ekleyin.
// href: gönderinin linki (boş bırakılırsa profil sayfasına gider). isVideo: Reels ise true.
export type InstagramPost = { image: string; href?: string; isVideo?: boolean };
export const instagramPosts: InstagramPost[] = [];

export const maintenance = { intervalKm: 10000, intervalMonths: 12, warnKm: 1000, warnDays: 30 };

export const marqueeWords = [
  "Civic",
  "Periyodik Bakım",
  "CR-V",
  "VTEC Motor",
  "City",
  "Fren & Süspansiyon",
  "Accord",
  "Arıza Teşhisi",
  "Jazz",
  "HR-V",
];
