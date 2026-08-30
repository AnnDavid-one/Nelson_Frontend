import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

type VerifyOrderResponse = {
  status: "success" | "failed";
  order?: {
    id: string;
    status: string;
    totalKobo: number;
  };
  message?: string;
};

export function useVerifyOrderPayment(reference: string | null) {
  return useQuery({
    queryKey: ["orderVerify", reference],
    queryFn: async () => {
      const { data } = await apiClient.get<VerifyOrderResponse>(
        `/orders/callback?reference=${reference}`
      );
      return data;
    },
    enabled: Boolean(reference),
    retry: false,
  });
}