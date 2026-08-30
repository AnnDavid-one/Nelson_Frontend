"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { useSettings } from "@/hooks/useSettings";

export default function ContactPage() {
  const { data: settings } = useSettings();

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
          {settings?.whatsappNumber && (
            <p className="mt-6 text-sm">
              Prefer WhatsApp?{" "}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                className="text-brass-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                Chat with us directly
              </a>
              .
            </p>
          )}
        </div>
        <InquiryForm type="GENERAL_CONTACT" submitLabel="Send message" />
      </div>
    </div>
  );
}
