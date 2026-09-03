import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Kingdom Influence | NELBELL" };

const REFLECTIONS = [
  {
    title: "Faith that shows up in the work",
    copy: "Nelson writes from the conviction that calling isn't separate from craft it shows up in how a book is written, a class is taught, and a life is lived.",
  },
  {
    title: "Influence over image",
    copy: "Kingdom Influence is a standing invitation to think about legacy in terms of who you've shaped, not just what you've built.",
  },
  {
    title: "A running collection",
    copy: "This page holds reflections, writings, and teachings from Nelson's faith-based work updated as new pieces are ready to share.",
  },
];

// blueprint §15 — focus areas
const FOCUS_AREAS = [
  { title: "Daily wisdom", copy: "Short reflections meant to be carried into the rest of the day." },
  { title: "Biblical principles", copy: "Scripture-rooted teaching applied to everyday decisions and character." },
  { title: "Purpose & calling", copy: "Working out what you're here to do, and doing it with conviction." },
  { title: "Leadership", copy: "Leading responsibly at home, at work, in ministry, and in community." },
  { title: "Personal transformation", copy: "The slow, honest work of becoming who you're meant to be." },
];

export default function KingdomInfluencePage() {
  return (
    <div className="container-page py-16">
      <Eyebrow>Kingdom Influence</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl leading-tight">
        Writing and reflection on faith, calling, and lasting influence.
      </h1>

      <div className="mt-14 space-y-10 border-t border-ink-900/10 pt-10">
        {REFLECTIONS.map((r, i) => (
          <RevealOnScroll key={r.title} delay={i * 0.08}>
            <div className="grid gap-3 sm:grid-cols-[auto,1fr] sm:gap-8">
              <p className="font-display text-3xl italic text-brass-500">&ldquo;</p>
              <div>
                <h2 className="font-display text-2xl">{r.title}</h2>
                <p className="mt-2 max-w-2xl text-ink-800">{r.copy}</p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* FOCUS AREAS — blueprint §15 */}
      <div className="brass-rule my-16" />
      <RevealOnScroll>
        <Eyebrow>What this page covers</Eyebrow>
        <h2 className="font-display text-3xl">Focus areas</h2>
      </RevealOnScroll>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FOCUS_AREAS.map((f, i) => (
          <RevealOnScroll key={f.title} delay={i * 0.06}>
            <div className="h-full border border-ink-900/10 p-6">
              <h3 className="font-display text-lg text-brass-600">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{f.copy}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* CTA */}
      <RevealOnScroll delay={0.1}>
        <div className="mt-16 border-t border-ink-900/10 pt-10 text-center">
          <p className="mx-auto max-w-md text-ink-700">
            Want Nelson to speak on faith, purpose or leadership at your event?
          </p>
          <div className="mt-6">
            <Button href="/contact">Invite Nelson to speak</Button>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}