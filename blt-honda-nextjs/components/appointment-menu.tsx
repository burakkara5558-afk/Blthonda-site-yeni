"use client";

import { CalendarCheck, ChevronDown, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useScrollTo } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

type Props = { prefix: string; size?: ButtonProps["size"]; align?: "start" | "end" };

function ItemBody({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-honda/15 text-honda">{icon}</span>
      <span className="flex flex-col">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-xs text-zinc-400">{hint}</span>
      </span>
    </>
  );
}

export function AppointmentMenu({ prefix, size = "default", align = "end" }: Props) {
  const scrollTo = useScrollTo();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size={size} data-testid={`${prefix}-appointment-trigger`} className="group">
          <CalendarCheck />
          Randevu Al
          <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} data-testid={`${prefix}-appointment-menu`}>
        <DropdownMenuItem asChild>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid={`${prefix}-appointment-whatsapp`}>
            <ItemBody icon={<MessageCircle className="size-4" />} title="WhatsApp'tan Yaz" hint="Hazır mesajla hemen yazın" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={site.phoneHref} data-testid={`${prefix}-appointment-call`}>
            <ItemBody icon={<Phone className="size-4" />} title="Hemen Ara" hint={site.phoneDisplay} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => scrollTo("iletisim")} data-testid={`${prefix}-appointment-contact`}>
          <ItemBody icon={<MapPin className="size-4" />} title="İletişim Formuna Git" hint="Adres, harita ve saatler" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
