import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { CheckoutInput } from "@/types/orderTypes";
import type {
  BankTransferCheckoutResponse,
  PaystackCheckoutResponse,
} from "@/types/apiResponseTypes";

export function useCheckout() {
  return useMutation({
    mutationFn: async (input: CheckoutInput) => {
      const { data } = await apiClient.post<
        BankTransferCheckoutResponse | PaystackCheckoutResponse
      >("/orders/checkout", input);
      return data;
    },
  });
}
