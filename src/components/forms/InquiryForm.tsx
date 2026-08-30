"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useSubmitInquiry } from "@/hooks/useSubmitInquiry";
import type { InquiryType } from "@/types/inquiryTypes";
import { Button } from "@/components/ui/Button";

export function InquiryForm({
  type,
  submitLabel = "Send message",
}: {
  type: InquiryType;
  submitLabel?: string;
}) {
  const { mutate, isPending, isSuccess, isError, error, reset } = useSubmitInquiry();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(
      { type, ...form },
      {
        onSuccess: () => setForm({ fullName: "", email: "", phone: "", message: "" }),
      }
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-sage-500/40 bg-sage-500/10 p-6 text-sm text-ink-900"
      >
        <p className="font-display text-lg">Message received.</p>
        <p className="mt-1 text-ink-700">
          Thank you &mdash; Nelson&apos;s team will reach out to you shortly.
        </p>
        <button onClick={() => reset()} className="mt-3 text-xs underline">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            className="input-field"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input-field"
          />
        </Field>
      </div>
      <Field label="Phone (optional)">
        <input
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="input-field"
        />
      </Field>
      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="input-field"
        />
      </Field>

      {isError && <p className="text-sm text-oxblood-600">{error.message}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs uppercase tracking-wide text-ink-700">{label}</span>
      {children}
    </label>
  );
}
