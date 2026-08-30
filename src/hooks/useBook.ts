import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { BookDetailResponse } from "@/types/bookTypes";

export function useBook(slug: string) {
  return useQuery({
    queryKey: queryKeys.book(slug),
    queryFn: async () => {
      const { data } = await apiClient.get<BookDetailResponse>(`/books/${slug}`);
      return data.book;
    },
    enabled: Boolean(slug),
  });
}
