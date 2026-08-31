"use client";

import Link from "next/link";
import { navLinks } from "./navLinks";

const SOCIALS: { label: string; href: string | null }[] = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "Twitter / X", href: null },
  { label: "YouTube", href: null },
];

const HARDCODE_URL: string | null = null; // e.g. your portfolio or GitHub link

export function Footer() {
  const socials = SOCIALS.filter((s): s is { label: string; href: string } => !!s.href);

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
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-brass-400">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="brass-rule mt-10" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-paper-200/60">
          <p>
            Printed &amp; published on the web by NELBELL &middot; &copy; {new Date().getFullYear()}{" "}
            Nelson O. Bello. All rights reserved.
          </p>
          <p>
            Built by{" "}
            {HARDCODE_URL ? (
              
               <a href={HARDCODE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brass-400 hover:underline"
              >
                Hardcode
              </a>
            ) : (
              <span className="text-paper-200/70">Hardcode</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}