import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

type VerifyAttemptResponse = {
  status: "success" | "failed";
  attemptId?: string;
  accessCode?: string;
  email?: string;
  attemptsRemaining?: number;
};

export function useVerifyCbtAttempt(reference: string | null) {
  return useQuery({
    queryKey: ["cbtAttemptVerify", reference],
    queryFn: async () => {
      const { data } = await apiClient.get<VerifyAttemptResponse>(
        `/cbt/attempts/callback?reference=${reference}`
      );
      return data;
    },
    enabled: Boolean(reference),
    retry: false,
  });
}