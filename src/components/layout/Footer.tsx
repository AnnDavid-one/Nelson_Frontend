"use client";

import Link from "next/link";
import { navLinks } from "./navLinks";
import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { data: settings } = useSettings();

  const socials = [
    { label: "Facebook", href: settings?.facebookUrl },
    { label: "Instagram", href: settings?.instagramUrl },
    { label: "Twitter / X", href: settings?.twitterUrl },
    { label: "YouTube", href: settings?.youtubeUrl },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 bg-ink-900 text-paper-100">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl">NELBELL</p>
            <p className="mt-2 text-sm text-paper-200/70">
              Oshomhoekha Creative Publishing &mdash; books, tutoring, and coaching from
              Nelson O. Bello.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brass-400">Table of contents</p>
            <ul className="mt-3 space-y-2 text-sm text-paper-200/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brass-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brass-400">Elsewhere</p>
            <ul className="mt-3 space-y-2 text-sm text-paper-200/80">
              {socials.length === 0 && <li className="text-paper-200/50">Coming soon</li>}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href!} target="_blank" rel="noreferrer" className="hover:text-brass-400">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="brass-rule mt-10" />
        <p className="mt-6 text-xs text-paper-200/60">
          Printed &amp; published on the web by NELBELL &middot; &copy; {new Date().getFullYear()}{" "}
          Nelson O. Bello. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
