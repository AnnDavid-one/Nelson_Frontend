import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { CONTACT_EMAIL } from "@/lib/constant";

export const metadata = { title: "Coaching & Consulting | NELBELL" };

// blueprint §13 — areas of coaching
const AREAS = [
  {
    title: "Student success coaching",
    copy: "Helping students build better learning habits, confidence and academic direction.",
  },
  {
    title: "Educational consulting",
    copy: "Guidance for parents, students and institutions on educational planning and decisions.",
  },
  {
    title: "Publishing consulting",
    copy: "Direction for authors navigating the path from manuscript to published book.",
  },
  {
    title: "Personal development coaching",
    copy: "Support for individuals working on growth, discipline and clarity of purpose.",
  },
  {
    title: "Leadership coaching",
    copy: "Guidance for ministers, leaders and emerging voices finding their footing.",
  },
];

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
              Nelson works one-on-one with people building something that matters to them a
              book, a ministry, a body of work and needs a steady, honest sounding board.
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
            <InquiryForm type="COACHING_CONSULTING" submitLabel="Request coaching" mailTo={CONTACT_EMAIL} />
          </div>
        </div>
      </div>

      {/* AREAS OF COACHING — blueprint §13 */}
      <div className="brass-rule my-16" />
      <RevealOnScroll>
        <Eyebrow>Areas of coaching</Eyebrow>
        <h2 className="font-display text-3xl">Where Nelson can help</h2>
      </RevealOnScroll>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((a, i) => (
          <RevealOnScroll key={a.title} delay={i * 0.06}>
            <div className="h-full border border-ink-900/10 p-6">
              <p className="font-mono text-xs text-brass-600">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{a.copy}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}