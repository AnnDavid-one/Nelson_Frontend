"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatNaira } from "@/lib/format";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalKobo = useCartStore((s) => s.totalKobo());

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper-50 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
              <h2 className="font-display text-xl">Your basket</h2>
              <button
                onClick={onClose}
                aria-label="Close basket"
                className="text-2xl leading-none text-ink-700 hover:text-ink-900"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink-700">
                  No titles selected yet. Browse the bookstore to add one.
                </p>
              ) : (
                <ul className="space-y-5">
                  {items.map(({ book, quantity }) => (
                    <li key={book.id} className="flex gap-3">
                      <div className="h-20 w-14 flex-shrink-0 rounded-sm bg-ink-900/10" />
                      <div className="flex-1">
                        <p className="font-display text-sm leading-snug">{book.title}</p>
                        <p className="mt-1 text-xs text-ink-700">{formatNaira(book.priceKobo)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(book.id, Number(e.target.value))}
                            className="w-14 border border-ink-900/20 bg-transparent px-2 py-1 text-xs"
                          />
                          <button
                            onClick={() => removeItem(book.id)}
                            className="text-xs text-oxblood-600 underline underline-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-ink-900/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between font-display text-lg">
                <span>Total</span>
                <span>{formatNaira(totalKobo)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className={`block w-full rounded-sm py-3 text-center text-sm tracking-wide text-paper-50 transition ${
                  items.length === 0
                    ? "pointer-events-none bg-ink-900/30"
                    : "bg-ink-900 hover:bg-oxblood-700"
                }`}
              >
                Proceed to checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
