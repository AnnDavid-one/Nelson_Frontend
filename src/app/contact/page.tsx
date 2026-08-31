"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const CONTACT_EMAIL = "duchenna59@gmail.com";
const WHATSAPP_NUMBER = "2347066718671";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Website inquiry from ${form.name || "a visitor"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="container-page py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Connect with me</Eyebrow>
          <h1 className="font-display text-4xl">Let&apos;s talk.</h1>
          <p className="mt-4 max-w-md text-ink-700">
            Questions about a book, a booking, or anything else — send a message and NELBELL
            will get back to you.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              Prefer WhatsApp?{" "}
              
              <a  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="text-brass-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                Chat with us directly
              </a>
              .
            </p>
            <p>
              Prefer email?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brass-600 underline">
                Message us directly
              </a>
              .
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-800">
                Full name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-ink-900/15 bg-paper-50 px-4 py-3 text-sm outline-none focus:border-brass-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-ink-900/15 bg-paper-50 px-4 py-3 text-sm outline-none focus:border-brass-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-800">
              Phone (optional)
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-ink-900/15 bg-paper-50 px-4 py-3 text-sm outline-none focus:border-brass-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-ink-800">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-ink-900/15 bg-paper-50 px-4 py-3 text-sm outline-none focus:border-brass-500"
            />
          </div>

          <Button type="submit">Send message</Button>
        </form>
      </div>
    </div>
  );
}