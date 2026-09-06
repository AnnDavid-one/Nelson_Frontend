"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "./navLinks";
import { useCartStore } from "@/store/cartStore";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-paper-50/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <img src="/oshomhoekah.jpg" alt="Nelbell Tutorial Centre" className="h-10" />
        <Link href="/" className="font-display text-lg tracking-tight">
          Home
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-brass-600 ${
                pathname === link.href ? "text-brass-600" : "text-ink-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* left for future scallingnm */}
          {/* <button
            onClick={() => setCartOpen(true)}
            className="relative text-sm font-medium text-ink-900"
            aria-label="Open basket"
          >
            Basket
            {mounted && totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-oxblood-600 text-[10px] text-paper-50">
                {totalItems}
              </span>
            )}
          </button> */}
          <button
            className="text-2xl leading-none lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mounted ? (mobileOpen ? "✕" : "☰") : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-900/10 bg-paper-50 lg:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm text-ink-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}