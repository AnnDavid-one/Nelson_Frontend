import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { SiteSettingsResponse } from "@/types/settingsTypes";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: async () => {
      const { data } = await apiClient.get<SiteSettingsResponse>("/settings");
      return data.settings;
    },
    staleTime: 5 * 60 * 1000,
  });
}
