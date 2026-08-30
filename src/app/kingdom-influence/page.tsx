import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata = { title: "Kingdom Influence | NELBELL" };

const REFLECTIONS = [
  {
    title: "Faith that shows up in the work",
    copy: "Nelson writes from the conviction that calling isn't separate from craft — it shows up in how a book is written, a class is taught, and a life is lived.",
  },
  {
    title: "Influence over image",
    copy: "Kingdom Influence is a standing invitation to think about legacy in terms of who you've shaped, not just what you've built.",
  },
  {
    title: "A running collection",
    copy: "This page holds reflections, writings, and teachings from Nelson's faith-based work — updated as new pieces are ready to share.",
  },
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
    </div>
  );
}
