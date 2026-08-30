"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Book } from "@/types/bookTypes";
import { formatNaira } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col"
    >
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ink-900/10">
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center font-display text-sm text-ink-700">
              {book.title}
            </div>
          )}
          <span className="absolute left-2 top-2 rounded-sm bg-ink-900/85 px-2 py-1 text-[10px] uppercase tracking-widest text-paper-50">
            {book.format === "EBOOK" ? "eBook" : "Print"}
          </span>
        </div>
      </Link>
      <Link href={`/books/${book.slug}`}>
        <h3 className="mt-3 font-display text-base leading-snug hover:text-brass-600">
          {book.title}
        </h3>
      </Link>
      <p className="text-xs text-ink-700">{book.author}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-medium">{formatNaira(book.priceKobo)}</span>
        <button
          onClick={() => addItem(book, 1)}
          className="text-xs uppercase tracking-wide text-brass-600 hover:text-oxblood-600"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
}
