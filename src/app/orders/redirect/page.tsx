"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Set PAYSTACK_CALLBACK_URL on the backend to `${FRONTEND_URL}/orders/redirect`.
// Paystack appends ?reference=... here after checkout; since the backend
// reuses the order's own id as the Paystack reference, we can route
// straight to the order status page.
export default function PaystackRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");
    if (reference) {
      router.replace(`/orders/${reference}`);
    } else {
      router.replace("/books");
    }
  }, [router, searchParams]);

  return <p className="container-page py-24 text-center text-sm text-ink-700">Confirming payment&hellip;</p>;
}
