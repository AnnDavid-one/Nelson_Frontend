import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

type StartAttemptInput = { email: string };
type StartAttemptResponse = { attempt: { id: string }; authorizationUrl: string };

export function useStartCbtAttempt() {
  return useMutation({
    mutationFn: async ({ email }: StartAttemptInput) => {
      const { data } = await apiClient.post<StartAttemptResponse>("/cbt/attempts", { email });
      return data;
    },
  });
}