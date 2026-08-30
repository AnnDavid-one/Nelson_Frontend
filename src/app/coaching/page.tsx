import { Eyebrow } from "@/components/ui/Eyebrow";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata = { title: "Coaching & Consulting | NELBELL" };

export default function CoachingPage() {
  return (
    <div className="container-page py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Coaching &amp; consulting</Eyebrow>
          <h1 className="font-display text-4xl leading-tight">
            Guidance for writers, ministers, and leaders finding their voice.
          </h1>
          <div className="mt-6 space-y-4 text-ink-800">
            <p>
              Nelson works one-on-one with people building something that matters to them — a
              book, a ministry, a body of work — and needs a steady, honest sounding board.
            </p>
            <p>
              Sessions are tailored to where you are: early direction-setting, mid-project
              accountability, or preparing to launch. Reach out below and we&apos;ll follow up
              to discuss fit and scheduling.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl">Start a conversation</h2>
          <div className="mt-6">
            <InquiryForm type="COACHING_CONSULTING" submitLabel="Request coaching" />
          </div>
        </div>
      </div>
    </div>
  );
}
