export type BookFormat = "EBOOK" | "PHYSICAL";
export type BookStatus = "ACTIVE" | "DEACTIVATED";

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  format: BookFormat;
  priceKobo: number;
  coverImageUrl: string | null;
  // Present on the /books list response; stripped by the backend on the
  // /books/:slug detail route, so always optional on the client.
  ebookFileUrl?: string;
  stockCount: number | null;
  status: BookStatus;
  createdAt: string;
  updatedAt: string;
}

export type PublicBook = Book;

export interface BooksListResponse {
  books: Book[];
}

export interface BookDetailResponse {
  book: PublicBook;
}
