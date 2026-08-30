import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

type RedeemInput = { email: string; accessCode: string };
type RedeemResponse = { attemptId: string; attemptsRemaining: number };

export function useRedeemCbtCode() {
  return useMutation({
    mutationFn: async (input: RedeemInput) => {
      const { data } = await apiClient.post<RedeemResponse>("/cbt/attempts/redeem", input);
      return data;
    },
  });
}