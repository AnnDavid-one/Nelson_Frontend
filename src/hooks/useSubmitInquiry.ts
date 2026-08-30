import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { InquiryInput, InquiryResponse } from "@/types/inquiryTypes";

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (input: InquiryInput) => {
      const { data } = await apiClient.post<InquiryResponse>("/inquiries", input);
      return data.inquiry;
    },
  });
}
