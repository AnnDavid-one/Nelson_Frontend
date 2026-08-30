import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata = { title: "Publishing Services | NELBELL" };

const SERVICES = [
  { title: "Manuscript editing", copy: "Line editing and structural feedback before you go to print." },
  { title: "Cover & interior design", copy: "Print-ready and ebook-ready layouts that match your voice." },
  { title: "Print & ebook distribution", copy: "Get your book listed, priced, and ready to sell." },
  { title: "Publishing coaching", copy: "One-on-one guidance through the whole publishing process." },
];

export default function PublishingServicesPage() {
  return (
    <div className="container-page py-16">
      <Eyebrow>Publishing services</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl">
        From manuscript to bookshelf, with an editor who&apos;s done it before.
      </h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <RevealOnScroll key={s.title} delay={i * 0.06}>
            <div className="border border-ink-900/10 p-6">
              <p className="font-mono text-xs text-brass-600">0{i + 1}</p>
              <h3 className="mt-2 font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{s.copy}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-16 max-w-xl">
        <h2 className="font-display text-2xl">Tell us about your manuscript</h2>
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
