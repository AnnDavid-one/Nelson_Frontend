"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useCheckout } from "@/hooks/useCheckout";
import { formatNaira } from "@/lib/format";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/types/orderTypes";
import type { BankTransferCheckoutResponse, PaystackCheckoutResponse } from "@/types/apiResponseTypes";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalKobo = useCartStore((s) => s.totalKobo());
  const clear = useCartStore((s) => s.clear);
  const checkout = useCheckout();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PAYSTACK");
  const [bankResult, setBankResult] = useState<BankTransferCheckoutResponse | null>(null);

  const requiresAddress = items.some((i) => i.book.format === "PHYSICAL");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    checkout.mutate(
      {
        customer: {
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          deliveryAddress: customer.deliveryAddress || undefined,
        },
        items: items.map((i) => ({ bookId: i.book.id, quantity: i.quantity })),
        paymentMethod,
      },
      {
        onSuccess: (data) => {
          if (paymentMethod === "PAYSTACK") {
            const res = data as PaystackCheckoutResponse;
            clear();
            window.location.href = res.authorizationUrl;
          } else {
            clear();
            setBankResult(data as BankTransferCheckoutResponse);
          }
        },
      }
    );
  }

  if (bankResult) {
    return (
      <div className="container-page max-w-xl py-20">
        <Eyebrow>Order placed</Eyebrow>
        <h1 className="font-display text-3xl">Complete your bank transfer</h1>
        <p className="mt-4 text-ink-800">{bankResult.instructions}</p>
        {bankResult.bankDetails && (
          <div className="mt-6 space-y-1 border border-ink-900/10 p-5 text-sm">
            <p>
              <span className="text-ink-700">Bank:</span> {bankResult.bankDetails.bankName}
            </p>
            <p>
              <span className="text-ink-700">Account name:</span> {bankResult.bankDetails.accountName}
            </p>
            <p>
              <span className="text-ink-700">Account number:</span>{" "}
              {bankResult.bankDetails.accountNumber}
            </p>
          </div>
        )}
        <Button className="mt-8" onClick={() => router.push(`/orders/${bankResult.order.id}`)}>
          Track my order
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-sm text-ink-700">Your basket is empty.</p>
        <Button href="/books" className="mt-6">
          Browse the bookstore
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr,0.8fr]">
      <div>
        <Eyebrow>Checkout</Eyebrow>
        <h1 className="font-display text-3xl">Your details</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Full name"
              value={customer.fullName}
              onChange={(v) => setCustomer((c) => ({ ...c, fullName: v }))}
            />
            <TextInput
              label="Email"
              type="email"
              value={customer.email}
              onChange={(v) => setCustomer((c) => ({ ...c, email: v }))}
            />
          </div>
          <TextInput
            label="Phone"
            value={customer.phone}
            onChange={(v) => setCustomer((c) => ({ ...c, phone: v }))}
          />
          {requiresAddress && (
            <TextInput
              label="Delivery address"
              value={customer.deliveryAddress}
              onChange={(v) => setCustomer((c) => ({ ...c, deliveryAddress: v }))}
            />
          )}

          <div>
            <span className="mb-2 block text-xs uppercase tracking-wide text-ink-700">
              Payment method
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["PAYSTACK", "BANK_TRANSFER"] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`rounded-sm border px-4 py-3 text-left text-sm transition ${
                    paymentMethod === m
                      ? "border-brass-500 bg-brass-500/10"
                      : "border-ink-900/15 hover:border-ink-900/40"
                  }`}
                >
                  {m === "PAYSTACK" ? "Pay with Paystack" : "Bank transfer"}
                </button>
              ))}
            </div>
          </div>

          {checkout.isError && (
            <p className="text-sm text-oxblood-600">{checkout.error.message}</p>
          )}

          <Button type="submit" disabled={checkout.isPending} className="w-full sm:w-auto">
            {checkout.isPending ? "Placing order…" : "Place order"}
          </Button>
        </form>
      </div>

      <div className="h-fit border border-ink-900/10 p-6">
        <h2 className="font-display text-lg">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map(({ book, quantity }) => (
            <li key={book.id} className="flex justify-between">
              <span>
                {book.title} &times; {quantity}
              </span>
              <span>{formatNaira(book.priceKobo * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="brass-rule my-4" />
        <div className="flex justify-between font-display text-lg">
          <span>Total</span>
          <span>{formatNaira(totalKobo)}</span>
        </div>
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs uppercase tracking-wide text-ink-700">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </label>
  );
}
