import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { CBTSubjectsResponse } from "@/types/cbtTypes";

export function useCbtSubjects() {
  return useQuery({
    queryKey: queryKeys.cbtSubjects,
    queryFn: async () => {
      const { data } = await apiClient.get<CBTSubjectsResponse>("/cbt/subjects");
      console.log("d cbtdata",data)
      return data.subjects;
    },
    
  });
}
