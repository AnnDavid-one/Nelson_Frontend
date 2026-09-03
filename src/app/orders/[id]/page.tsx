"use client";

import { useParams } from "next/navigation";
import { useOrder } from "@/hooks/useOrder";
import { formatNaira } from "@/lib/format";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STATUS_COPY: Record<string, string> = {
  PENDING_PAYMENT: "Waiting for your payment to be confirmed.",
  PAID: "Payment confirmed we're preparing your order.",
  FULFILLED: "Your order is fulfilled. Download links (if any) are below.",
  CANCELLED: "This order was cancelled.",
};

export default function OrderStatusPage() {
  const params = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(params.id);

  if (isLoading) {
    return <p className="container-page py-24 text-center text-sm text-ink-700">Loading order&hellip;</p>;
  }

  if (!order) {
    return (
      <p className="container-page py-24 text-center text-sm text-oxblood-600">Order not found.</p>
    );
  }

  return (
    <div className="container-page max-w-2xl py-16">
      <Eyebrow>Order {order.id.slice(0, 8)}</Eyebrow>
      <h1 className="font-display text-3xl">{STATUS_COPY[order.status]}</h1>

      <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-4 text-sm">
            <span>
              {item.book?.title ?? "Title"} &times; {item.quantity}
            </span>
            <span>{formatNaira(item.unitPriceKobo * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between font-display text-lg">
        <span>Total</span>
        <span>{formatNaira(order.totalKobo)}</span>
      </div>

      {order.status === "PENDING_PAYMENT" && (
        <p className="mt-6 text-xs text-ink-700">
          This page updates automatically once your payment is confirmed.
        </p>
      )}
    </div>
  );
}
