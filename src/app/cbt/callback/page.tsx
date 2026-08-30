// src/app/cbt/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyCbtAttempt } from "@/hooks/useVerifyCbtAttempt";
import { useCbtAccess } from "@/hooks/useCbtAccess";
import { Loader } from "lucide-react";

export default function CbtCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAccess } = useCbtAccess();
  const reference = searchParams.get("reference");

  const { data, isLoading, isError } = useVerifyCbtAttempt(reference);

  useEffect(() => {
     if (data?.status === "success" && data.attemptId && data.accessCode) {
      setAccess({
        email: data.email ?? "",
        attemptId: data.attemptId,
        accessCode: data.accessCode,
        attemptsRemaining: data.attemptsRemaining ?? 0,
      });
      router.replace("/cbt");
    }
  }, [data, router, setAccess]);

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
          We couldn&apos;t confirm your payment. If you were charged, contact us with your reference.
        </p>
      </div>
    );
  }

  return null;
}