"use client";

import { useState } from "react";
import { useStartCbtAttempt } from "@/hooks/useStartCbtAttempt";
import { useRedeemCbtCode } from "@/hooks/useRedeemCbtCode";
import { useCbtAccess } from "@/hooks/useCbtAccess";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CbtAccessGate() {
  const { setAccess } = useCbtAccess();
  const [mode, setMode] = useState<"redeem" | "pay">("redeem");

  const [redeemEmail, setRedeemEmail] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const redeem = useRedeemCbtCode();

  const [payEmail, setPayEmail] = useState("");
  const startAttempt = useStartCbtAttempt();

  function handleRedeem() {
    if (!redeemEmail || !redeemCode) return;
    redeem.mutate(
      { email: redeemEmail, accessCode: redeemCode.toUpperCase().trim() },
      {
        onSuccess: (data) => {
          setAccess({
            email: redeemEmail,
            attemptId: data.attemptId,
            accessCode: redeemCode.toUpperCase().trim(),
            attemptsRemaining: data.attemptsRemaining,
          });
        },
      }
    );
  }

  function handlePay() {
    if (!payEmail) return;
    startAttempt.mutate(
      { email: payEmail },
      {
        onSuccess: (data) => {
          window.location.href = data.authorizationUrl;
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <Eyebrow>CBT practice</Eyebrow>
      <h1 className="mt-2 font-display text-3xl">Access your practice sessions</h1>

      <div className="mt-8 flex justify-center gap-2 font-mono text-xs uppercase tracking-widest">
        <button
          onClick={() => setMode("redeem")}
          className={`px-4 py-2 ${mode === "redeem" ? "border-b-2 border-brass-500 text-brass-600" : "text-ink-700"}`}
        >
          I have a code
        </button>
        <button
          onClick={() => setMode("pay")}
          className={`px-4 py-2 ${mode === "pay" ? "border-b-2 border-brass-500 text-brass-600" : "text-ink-700"}`}
        >
          New purchase
        </button>
      </div>

      {mode === "redeem" ? (
        <div className="mt-6 space-y-3 text-left">
          <input
            type="email"
            value={redeemEmail}
            onChange={(e) => setRedeemEmail(e.target.value)}
            placeholder="Email used at purchase"
            className="w-full border border-ink-900/15 px-4 py-3 text-sm"
          />
          <input
            type="text"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
            placeholder="Access code"
            className="w-full border border-ink-900/15 px-4 py-3 text-sm font-mono tracking-widest"
          />
          {redeem.isError && (
            <p className="text-xs text-oxblood-600">
              {(redeem.error as any)?.response?.data?.error || "Invalid access code or email."}
            </p>
          )}
          <Button className="w-full" onClick={handleRedeem} disabled={!redeemEmail || !redeemCode || redeem.isPending}>
            {redeem.isPending ? "Checking…" : "Continue"}
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-3 text-left">
          <p className="text-sm text-ink-700">
            One payment unlocks {process.env.NEXT_PUBLIC_CBT_ATTEMPTS ?? "24"} practice attempts across every
            subject.
          </p>
          <input
            type="email"
            value={payEmail}
            onChange={(e) => setPayEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-ink-900/15 px-4 py-3 text-sm"
          />
          <Button className="w-full" onClick={handlePay} disabled={!payEmail || startAttempt.isPending}>
            {startAttempt.isPending ? "Redirecting…" : "Pay & unlock"}
          </Button>
        </div>
      )}
    </div>
  );
}