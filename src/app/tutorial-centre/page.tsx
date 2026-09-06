import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata = { title: "NELBELL Tutorial Centre" };

const TRACKS = [
  { title: "JAMB UTME prep", copy: "Full-syllabus coaching across core subjects, built around past questions." },
  { title: "Weekend intensives", copy: "Focused weekend sessions for students catching up close to exam season." },
  { title: "Small-group tutoring", copy: "Low student-to-tutor ratios so every question actually gets answered." },
];

// blueprint §11 — examination preparation
const EXAMS = ["WAEC", "NECO", "JAMB", "Post-UTME", "BECE", "Common Entrance", "GCE"];

// blueprint §11 — subject areas
const SUBJECTS = ["Mathematics", "Physics", "Chemistry"];

// blueprint §12 — why NELBELL
const WHY = [
  { title: "Structured learning", copy: "Access organized educational resources designed to support effective learning." },
  { title: "Exam-focused preparation", copy: "Prepare for major examinations with targeted practice and revision." },
  { title: "Practical learning support", copy: "Go beyond memorization and develop better understanding of key concepts." },
  { title: "Student success", copy: "Develop study habits, confidence and strategies that support academic growth." },
  { title: "Online access", copy: "Learn from wherever you are through digital educational resources." },
  { title: "Continuous improvement", copy: "Encouraging students to learn, grow and become better versions of themselves." },
];

export default function TutorialCentrePage() {
  return (
    <div className="container-page py-16">
            <img src="/nellbelltutorialcent.jpg" alt="NELBELL Tutorial Centre" className="h-16" />

      <Eyebrow>NELBELL Tutorial Centre Online</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl">
        Structured, exam-focused tutoring built by someone who has taught the syllabus for years.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-700">
        Your path to academic excellence structured learning, educational resources,
        examination preparation and student success support.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {TRACKS.map((t) => (
          <div key={t.title} className="border border-ink-900/10 p-6">
            <h3 className="font-display text-lg">{t.title}</h3>
            <p className="mt-2 text-sm text-ink-700">{t.copy}</p>
          </div>
        ))}
      </div>

      {/* EXAMINATION PREPARATION — blueprint §11 */}
      <div className="brass-rule my-16" />
      <RevealOnScroll>
        <Eyebrow>Examination preparation</Eyebrow>
        <div className="flex flex-wrap gap-3">
          {EXAMS.map((e) => (
            <span
              key={e}
              className="border border-ink-900/10 px-4 py-2 text-sm text-ink-800"
            >
              {e}
            </span>
          ))}
        </div>
      </RevealOnScroll>

      {/* SUBJECT AREAS — blueprint §11 */}
      <RevealOnScroll delay={0.06} className="mt-10">
        <Eyebrow>Subject areas</Eyebrow>
        <div className="flex flex-wrap gap-3">
          {SUBJECTS.map((s) => (
            <span
              key={s}
              className="border border-brass-500/40 px-4 py-2 text-sm text-brass-600"
            >
              {s}
            </span>
          ))}
        </div>
      </RevealOnScroll>

      {/* WHY NELBELL — blueprint §12 */}
      <div className="brass-rule my-16" />
      <RevealOnScroll>
        <Eyebrow>Why learn with NELBELL?</Eyebrow>
        <h2 className="font-display text-3xl">Why NELBELL?</h2>
      </RevealOnScroll>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w, i) => (
          <RevealOnScroll key={w.title} delay={i * 0.05}>
            <div className="h-full border border-ink-900/10 p-6">
              <h3 className="font-display text-lg">{w.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{w.copy}</p>
            </div>
          </RevealOnScroll>
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
        <Button href="/contact" variant="ghost">
          Explore our programmes
        </Button>
      </div>
    </div>
  );
}