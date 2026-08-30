import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { CBTSubmitSessionInput, CBTSessionResponse } from "@/types/cbtTypes";

export function useSubmitCbtSession() {
  return useMutation({
    mutationFn: async (input: CBTSubmitSessionInput) => {
      const { data } = await apiClient.post<CBTSessionResponse>("/cbt/sessions", input);
      return data;
    },
  });
}
