import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "@/types/cartTypes";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.book.id === book.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.book.id === book.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { book, quantity }] };
        });
      },

      removeItem: (bookId) => {
        set((state) => ({ items: state.items.filter((i) => i.book.id !== bookId) }));
      },

      setQuantity: (bookId, quantity) => {
        set((state) => ({
          items: state.items
            .map((i) => (i.book.id === bookId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        }));
      },

      clear: () => set({ items: [] }),

      totalKobo: () => get().items.reduce((sum, i) => sum + i.book.priceKobo * i.quantity, 0),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "nelbell-cart" }
  )
);
