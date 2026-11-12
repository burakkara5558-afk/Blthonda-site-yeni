"use client";

import Image from "next/image";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/reveal";
import { site } from "@/lib/site";

export function InstagramFeed() {
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="py-24">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="instagram" overline="Canlı Akış" title="Instagram'da Biz">
            {/* Alt başlık veya açıklama eklenebilir */}
          </SectionHeading>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" /> Takip Et <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <a
              key={num}
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block overflow-hidden rounded-xl aspect-square bg-zinc-900 border border-zinc-800"
            >
              <Image
                src={`/instagram/insta-${num}.jpg`}
                alt={`BLT Honda Özel Servis Instagram ${num}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-12 h-12 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}