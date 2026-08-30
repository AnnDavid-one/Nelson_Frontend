import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { BooksListResponse } from "@/types/bookTypes";

export function useBooks() {
  return useQuery({
    queryKey: queryKeys.books,
    queryFn: async () => {
      const { data } = await apiClient.get<BooksListResponse>("/books");
      return data.books;
    },
  });
}
