import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { EditorialMarquee } from "@/components/editorial-marquee";
import { InstagramFeed } from "@/components/instagram-feed";
import { Services } from "@/components/services";
import { Certificates } from "@/components/certificates";
import { MaintenanceReminder } from "@/components/maintenance-reminder";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EditorialMarquee />
        <InstagramFeed />
        <Services />
        <MaintenanceReminder />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
