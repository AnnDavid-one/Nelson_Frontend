import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata = { title: "Publishing Services | NELBELL" };

const SERVICES = [
  { title: "Book publishing", copy: "Professional support for authors taking their manuscripts toward publication." },
  { title: "Editing & proofreading", copy: "Improving clarity, consistency, grammar and overall readability." },
  { title: "Book formatting", copy: "Preparing manuscripts for professional print and digital publication." },
  { title: "Cover design", copy: "Creating professional and visually appealing book covers." },
  { title: "ISBN registration", copy: "Support with ISBN registration for eligible publications." },
  { title: "eBook publishing", copy: "Preparing and publishing books in digital formats." },
  { title: "Printing", copy: "Support for producing physical copies of published books." },
  { title: "Ghostwriting", copy: "Helping clients develop ideas and transform them into complete written works." },
  { title: "Amazon KDP", copy: "Support for authors interested in publishing through Amazon Kindle Direct Publishing." },
  { title: "Selar", copy: "Support for selling digital products and books online." },
  { title: "OkadaBooks", copy: "Support for digital book distribution." },
];

export default function PublishingServicesPage() {
  return (
    <div className="container-page py-16">
      <Eyebrow>Oshomhoekha Creative Publishing Limited</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl">
        Turning manuscripts into masterpieces.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-700">
        Oshomhoekha Creative Publishing Limited helps authors transform ideas and manuscripts
        into professionally prepared books — from manuscript preparation to publication.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <RevealOnScroll key={s.title} delay={i * 0.05}>
            <div className="h-full border border-ink-900/10 p-6">
              <p className="font-mono text-xs text-brass-600">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{s.copy}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-16 max-w-xl">
        <h2 className="font-display text-2xl">Start your publishing journey</h2>
        <p className="mt-2 text-sm text-ink-700">
          Share a little about your project and we&apos;ll be in touch to discuss next steps.
        </p>
        <div className="mt-6">
          <InquiryForm type="PUBLISHING_SERVICES" submitLabel="Send publishing inquiry" />
        </div>
      </div>
    </div>
  );
}