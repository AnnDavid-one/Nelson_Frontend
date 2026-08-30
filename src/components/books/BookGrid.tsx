"use client";

import type { Book } from "@/types/bookTypes";
import { BookCard } from "./BookCard";

export function BookGrid({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-ink-700">
        No titles are available right now &mdash; check back soon.
      </p>
    );
  }

  return (
<div className="grid grid-cols-1  max-sm:grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [&>*]:w-full">
      {books.map((book, i) => (
        <BookCard key={book.id} book={book} index={i} />
      ))}
    </div>
  );
}
