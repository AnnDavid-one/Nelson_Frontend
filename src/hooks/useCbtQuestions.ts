import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { CBTQuestionsResponse } from "@/types/cbtTypes";

export function useCbtQuestions(subjectId: string, attemptId: string | null, limit = 20) {
  return useQuery({
    queryKey: queryKeys.cbtQuestions(subjectId),
    queryFn: async () => {
      const { data } = await apiClient.get<CBTQuestionsResponse>(
        `/cbt/subjects/${subjectId}/questions?limit=${limit}&attemptId=${attemptId}`
      );
      return data.questions;
    },
    enabled: Boolean(subjectId) && Boolean(attemptId),
  });
}