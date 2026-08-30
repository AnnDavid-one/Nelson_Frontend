import type { Book } from "./bookTypes";
import type { Customer, CheckoutCustomerInput } from "./customerTypes";

export type PaymentMethod = "BANK_TRANSFER" | "PAYSTACK";
export type OrderStatus = "PENDING_PAYMENT" | "PAID" | "FULFILLED" | "CANCELLED";

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  book?: Book;
  quantity: number;
  unitPriceKobo: number;
  downloadToken: string | null;
  downloadExpires: string | null;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: Customer;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  totalKobo: number;
  bankTransferRef: string | null;
  paystackReference: string | null;
  paystackAuthUrl: string | null;
  paystackVerifiedAt: string | null;
  paidAt: string | null;
  fulfilledAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CheckoutItemInput {
  bookId: string;
  quantity: number;
}

export interface CheckoutInput {
  customer: CheckoutCustomerInput;
  items: CheckoutItemInput[];
  paymentMethod: PaymentMethod;
}

export interface OrderDetailResponse {
  order: Order;
}
