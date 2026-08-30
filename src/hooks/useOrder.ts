import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { OrderDetailResponse } from "@/types/orderTypes";

// Polls so the confirmation page can pick up FULFILLED status once the
// Paystack webhook (or admin's manual bank transfer confirmation) lands.
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: async () => {
      const { data } = await apiClient.get<OrderDetailResponse>(`/orders/${orderId}`);
      return data.order;
    },
    enabled: Boolean(orderId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "PENDING_PAYMENT" ? 4000 : false;
    },
  });
}
