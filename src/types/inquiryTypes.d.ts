export type InquiryType = "PUBLISHING_SERVICES" | "COACHING_CONSULTING" | "GENERAL_CONTACT";

export interface InquiryInput {
  type: InquiryType;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface InquiryResponse {
  inquiry: InquiryInput & { id: string; createdAt: string; handled: boolean };
}
