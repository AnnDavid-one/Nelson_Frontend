// src/app/books/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { BookGrid } from "@/components/books/BookGrid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Loader } from "lucide-react";

export default function BooksPage() {
  const { data: books, isLoading, isError } = useBooks();
  const [format, setFormat] = useState<"ALL" | "EBOOK" | "PHYSICAL">("ALL");

  const filtered = useMemo(() => {
    if (!books) return [];
    if (format === "ALL") return books;
    return books.filter((b) => b.format === format);
  }, [books, format]);
  
  
  
  
  
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="h-12 w-12 text-ink-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative container-page py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Online bookstore</Eyebrow>
          <h1 className="font-display text-4xl">Nelson O. Bello Bookstore</h1>
          <p className="mt-3 max-w-xl text-sm text-ink-700">
            Discover books created to educate, inspire, challenge perspectives, strengthen
            faith, develop students and encourage purposeful living.
          </p>
        </div>
        <div className="flex gap-2 text-xs uppercase tracking-wide">
          {(["ALL", "EBOOK", "PHYSICAL"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`rounded-sm border px-3 py-2 transition ${
                format === f
                  ? "border-brass-500 bg-brass-500/10 text-brass-600"
                  : "border-ink-900/15 text-ink-700 hover:border-ink-900/40"
              }`}
            >
              {f === "ALL" ? "All" : f === "EBOOK" ? "eBooks" : "Print"}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <p className="text-sm text-oxblood-600">
          Couldn&apos;t load the bookstore. Please refresh.
        </p>
      )}
            {books && filtered.length === 0 && !isError && (
        <p className="text-sm text-ink-700">No titles match this filter.</p>
      )}
      {books && <BookGrid books={filtered} />}
    </div>
  );
}
