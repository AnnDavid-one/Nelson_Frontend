import { Nelson } from "@/assets/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Image from "next/image";



export const metadata = { title: "About Nelson | NELBELL" };

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <RevealOnScroll>
          <Image
          
        src={Nelson}
        alt="Company Logo"
        width={200}
        height={100}
        priority 
     className="h-96 w-96 rounded-sm bg-ink-900/10 object-contain"
     />
          <div  />
        </RevealOnScroll>
        <div>
          <Eyebrow>About Nelson</Eyebrow>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            A teacher first, a writer always.
          </h1>
          <div className="mt-6 space-y-5 text-ink-800">
            <p>
              Nelson O. Bello founded Oshomhoekha Creative Publishing to put his writing,
              teaching, and pastoral work under one roof NELBELL. What began as classroom
              notes for JAMB candidates grew into a full tutorial centre, a bookstore of
              faith-driven titles, and a coaching practice for writers and leaders.
            </p>
            <p>
              His work sits at the intersection of academic rigor and spiritual conviction:
              structured enough to move a student from confusion to a JAMB score they&apos;re
              proud of, and honest enough to sit with a reader wrestling with faith and calling.
            </p>
            <p>
              Today, NELBELL brings all of that together — books to read, a centre to study
              in, a test engine to practice with, and a coach to talk to.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
