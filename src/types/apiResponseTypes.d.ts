// Generic API envelope + error shapes shared across every request in the app.

export interface ApiErrorResponse {
  error: string | Record<string, unknown>;
}

export interface ApiListResponse<TKey extends string, TItem> {
  [key: string]: TItem[];
}

export type ApiSingleResponse<TKey extends string, TItem> = {
  [key in TKey]: TItem;
};

export interface PaystackCheckoutResponse {
  order: import("./orderTypes").Order;
  authorizationUrl: string;
}

export interface BankTransferCheckoutResponse {
  order: import("./orderTypes").Order;
  bankDetails: {
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
  } | null;
  instructions: string;
}
