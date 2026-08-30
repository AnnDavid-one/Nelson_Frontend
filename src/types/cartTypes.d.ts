import type { Book } from "./bookTypes";

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clear: () => void;
  totalKobo: () => number;
  totalItems: () => number;
}
