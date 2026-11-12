"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}

export function useScrollTo() {
  const lenis = useLenis();
  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: id === "anasayfa" ? 0 : -72, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; onNavigate?: () => void };

export function ScrollLink({ to, onNavigate, children, ...props }: ScrollLinkProps) {
  const scrollTo = useScrollTo();
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(to);
        onNavigate?.();
      }}
      {...props}
    >
      {children}
    </a>
  );
}
