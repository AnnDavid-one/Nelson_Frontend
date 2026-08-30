"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useBook } from "@/hooks/useBook";
import { formatNaira } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function BookDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data: book, isLoading, isError } = useBook(params.slug);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) {
    return <p className="container-page py-24 text-center text-sm text-ink-700">Loading&hellip;</p>;
  }

  if (isError || !book) {
    return (
      <p className="container-page py-24 text-center text-sm text-oxblood-600">
        This title couldn&apos;t be found.
      </p>
    );
  }

  return (
    <div className="container-page py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <RevealOnScroll>
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm bg-ink-900/10">
            {book.coverImageUrl ? (
              <Image src={book.coverImageUrl} alt={book.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center font-display text-lg">
                {book.title}
              </div>
            )}
          </div>
        </RevealOnScroll>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-600">
            {book.format === "EBOOK" ? "eBook" : "Print edition"}
          </p>
          <h1 className="mt-2 font-display text-4xl">{book.title}</h1>
          <p className="mt-1 text-ink-700">by {book.author}</p>
          <p className="mt-6 whitespace-pre-line text-ink-800">{book.description}</p>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-display text-2xl">{formatNaira(book.priceKobo)}</span>
            {book.format === "PHYSICAL" && book.stockCount !== null && (
              <span className="text-xs text-ink-700">
                {book.stockCount > 0 ? `${book.stockCount} in stock` : "Out of stock"}
              </span>
            )}
          </div>

          <div className="mt-6">
            <Button
              onClick={() => addItem(book, 1)}
              disabled={book.format === "PHYSICAL" && book.stockCount === 0}
            >
              Add to basket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
