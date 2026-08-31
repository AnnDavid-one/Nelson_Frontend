"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useVerifyOrderPayment } from "@/hooks/useVerifyOrderPayment";
import { Loader } from "lucide-react";
import Link from "next/link";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const { data, isLoading, isError } = useVerifyOrderPayment(reference);

  if (!reference) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-sm text-oxblood-600">Missing payment reference.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Loader className="mx-auto h-12 w-12 animate-spin text-brass-500" />
        <p className="mt-4 text-sm text-ink-700">Confirming your payment&hellip;</p>
      </div>
    );
  }

  if (isError || data?.status === "failed") {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-sm text-oxblood-600">
          We couldn&apos;t confirm your payment. If you were charged, contact us with your reference:{" "}
          <span className="font-mono">{reference}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-600">Order confirmed</p>
      <h1 className="mt-2 font-display text-3xl">Thank you for your order</h1>
      <p className="mt-3 text-sm text-ink-700">
        Order #{data?.order?.id} has been confirmed. You&apos;ll receive an email shortly with next steps.
      </p>
      <Link href="/books" className="mt-6 inline-block text-xs uppercase tracking-widest text-brass-600 underline">
        Continue browsing
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Loader className="mx-auto h-12 w-12 animate-spin text-brass-500" />
          <p className="mt-4 text-sm text-ink-700">Confirming your payment&hellip;</p>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}