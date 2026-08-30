import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "NELBELL Tutorial Centre" };

const TRACKS = [
  { title: "JAMB UTME prep", copy: "Full-syllabus coaching across core subjects, built around past questions." },
  { title: "Weekend intensives", copy: "Focused weekend sessions for students catching up close to exam season." },
  { title: "Small-group tutoring", copy: "Low student-to-tutor ratios so every question actually gets answered." },
];

export default function TutorialCentrePage() {
  return (
    <div className="container-page py-16">
      <Eyebrow>NELBELL Tutorial Centre</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl">
        Structured, exam-focused tutoring built by someone who has taught the syllabus for years.
      </h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {TRACKS.map((t) => (
          <div key={t.title} className="border border-ink-900/10 p-6">
            <h3 className="font-display text-lg">{t.title}</h3>
            <p className="mt-2 text-sm text-ink-700">{t.copy}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-ink-900/10 pt-10">
        <p className="max-w-sm text-sm text-ink-700">
          Already studying? Sharpen up with free, timed CBT practice before you enroll.
        </p>
        <Button href="/cbt">Try CBT practice</Button>
        <Button href="/contact" variant="secondary">
          Enquire about enrolment
        </Button>
      </div>
    </div>
  );
}
