import { Facebook, Instagram, Youtube } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const items = [
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
];

export function SocialLinks({ className, prefix }: { className?: string; prefix: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-testid={`${prefix}-social-${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-honda hover:bg-honda hover:text-white"
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
