export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string | null;
  createdAt: string;
}

export interface CheckoutCustomerInput {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress?: string;
}
