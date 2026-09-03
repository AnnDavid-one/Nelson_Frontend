// src/app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useBooks } from "@/hooks/useBooks";
import { BookGrid } from "@/components/books/BookGrid";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { KingdomInfluence, KingdomInfluence1, KingdomInfluence2, Nelson } from "@/assets/images";
import Image from "next/image";

const PILLARS = [
  {
    title: "The Bookstore",
    copy: "Ebooks and print editions on faith, growth, and clear thinking delivered or shipped.",
    href: "/books",
  },
  {
    title: "The Tutorial Centre",
    copy: "Structured, exam-focused coaching for students preparing for JAMB and beyond.",
    href: "/tutorial-centre",
  },
  {
    title: "CBT Practice",
    copy: "Timed, subject-by-subject computer-based test practice with instant grading.",
    href: "/cbt",
  },
  {
    title: "Coaching & Consulting",
    copy: "One-on-one guidance for writers, ministers, and leaders finding their voice.",
    href: "/coaching",
  },
];

interface CaseroTypes {
  id: number;
  photopath: typeof KingdomInfluence;
  title: string;
}
const casero: CaseroTypes[] = [
  { id: 1, photopath: KingdomInfluence, title: "Kingdom Influence" },
  { id: 2, photopath: KingdomInfluence1, title: "Coaching Notes" },
  { id: 3, photopath: KingdomInfluence2, title: "NELBELL" },
];

// Section 6 "My Areas of Impact" (blueprint)
const IMPACT_AREAS = [
  {
    tag: "Author",
    copy: "Creating books and resources designed to educate, inspire and transform lives.",
    cta: "View my books",
    href: "/books",
  },
  {
    tag: "Publisher",
    copy: "Helping authors transform manuscripts and ideas into professionally produced books.",
    cta: "Publishing services",
    href: "/publishing",
  },
  {
    tag: "Educator",
    copy: "Providing educational resources and learning support through NELBELL Tutorial Centre Online.",
    cta: "Learn with NELBELL",
    href: "/tutorial-centre",
  },
  {
    tag: "Student Success Coach",
    copy: "Helping students develop better approaches to learning, academic excellence, personal growth and future readiness.",
    cta: "Explore coaching",
    href: "/coaching",
  },
  {
    tag: "Pastor",
    copy: "Sharing biblical principles that inspire purpose, faith, leadership and transformation.",
    cta: "Kingdom Influence",
    href: "/kingdom-influence",
  },
];

// Sections 10–15 org/programme teasers, in blueprint homepage order
const PROGRAMMES = [
  {
    eyebrow: "Oshomhoekha Creative Publishing",
    heading: "Turning manuscripts into masterpieces.",
    copy: "From editing and cover design to ISBN registration and eBook publishing help for authors taking a manuscript to print.",
    cta: "Start your publishing journey",
    href: "/publishing",
    image: "/masterpiece.jpg",
  },
  {
    eyebrow: "NELBELL Tutorial Centre Online",
    heading: "Your path to academic excellence.",
    copy: "Exam-focused prep for WAEC, NECO, JAMB, Post-UTME, BECE and Common Entrance, plus core-subject support.",
    cta: "Explore our programmes",
    href: "/tutorial-centre",
    image: "/roadtosuccess.jpg",
  },
  {
    eyebrow: "CBT Practice Centre",
    heading: "Practice the way you'll be tested.",
    copy: "Subject and exam-type selection, timed sessions, and results built to feel like the real CBT environment.",
    cta: "Start CBT practice",
    href: "/cbt",
    image: "/practicebest.jpg",
  },
  {
    eyebrow: "Coaching & Consulting",
    heading: "Clarity, strategy, and consistent action.",
    copy: "Guidance across student success, educational planning, publishing, personal development, and leadership.",
    cta: "Enquire about coaching",
    href: "/coaching",
    image: "/clarity.jpg",
  },
];

// Section 18 placeholder until the owner supplies real testimonials (per blueprint §18/§31B)
const TESTIMONIALS: { name: string; role: string; quote: string }[] = [];

export default function HomePage() {
  const { data: books } = useBooks();

  return (
    <div>
      {/* HERO the open-book spread */}
      <section className="container-page grid gap-10 pb-16 pt-14 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <Eyebrow>Oshomhoekha Creative Publishing</Eyebrow>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">
            <span className="float-left mr-2 font-display text-7xl leading-[0.85] text-brass-600 sm:text-8xl">
              N
            </span>
            elson O. Bello writes, teaches, and publishes work meant to be lived, not just read.
          </h1>
          <p className="mt-6 max-w-md text-ink-700">
            Author, tutor, and coach. Explore the bookstore, prepare for JAMB with guided CBT
            practice, or bring your manuscript, your students, or your calling to NELBELL.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/books">Visit the bookstore</Button>
            <Button href="/about" variant="secondary">
              Meet Nelson
            </Button>
          </div>
        </div>

        <motion.div
          className="relative mx-auto flex h-72 w-full max-w-xs items-end justify-center sm:h-96"
          initial="hidden"
          animate="show"
        >
          {casero.map((item, index) => (
            <motion.div
              key={item.id}
              className="absolute bottom-0 h-64 w-40 overflow-hidden rounded-sm border border-ink-900/10 bg-ink-900 shadow-xl sm:h-80 sm:w-48"
              style={{ zIndex: 3 - index }}
              initial={{ opacity: 0, rotate: 0, x: 0 }}
              animate={{
                opacity: 1,
                rotate: (index - 1) * 8,
                x: (index - 1) * 34,
              }}
              transition={{ duration: 0.7, delay: 0.15 * index, ease: "easeOut" }}
            >
              <Image
                src={item.photopath}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="brass-rule container-page" />

      {/* WELCOME / WHO I AM blueprint §5 */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
      <RevealOnScroll>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-ink-900/10">
              <Image
                src={Nelson}
                alt="Nelson O. Bello"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Eyebrow>Welcome to my world</Eyebrow>
            <h2 className="font-display text-3xl leading-tight">
              I am Nelson O. Bello author, publisher, educator, pastor and student success coach.
            </h2>
            <p className="mt-4 max-w-xl text-ink-700">
              My work sits at the intersection of education, publishing, leadership, personal
              development and faith. Through my books, educational platforms, publishing services,
              coaching initiatives and Kingdom-focused resources, I seek to equip individuals
              especially students, young people and emerging leaders with knowledge, wisdom and
              practical tools for meaningful growth.
            </p>
            <div className="mt-6">
              <Button href="/about" variant="ghost">
                Learn more about me
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AREAS OF IMPACT blueprint §6 */}
      <section className="container-page py-16">
        <RevealOnScroll>
          <Eyebrow>My areas of impact</Eyebrow>
          <h2 className="font-display text-3xl">Five identities, one purpose</h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_AREAS.map((a, i) => (
            <RevealOnScroll key={a.tag} delay={i * 0.06}>
              <div className="flex h-full flex-col border border-ink-900/10 p-6">
                <h3 className="font-display text-lg text-brass-600">{a.tag}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-700">{a.copy}</p>
                <Link
                  href={a.href}
                  className="mt-4 text-sm text-ink-900 underline underline-offset-4 hover:text-brass-600"
                >
                  {a.cta}
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* PILLARS (existing) */}
      <section className="container-page py-16">
        <RevealOnScroll>
          <Eyebrow>What&apos;s inside</Eyebrow>
          <h2 className="font-display text-3xl">Four ways to work with Nelson</h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.08}>
              <Link
                href={p.href}
                className="block h-full border border-ink-900/10 p-6 transition hover:border-brass-500 hover:shadow-sm"
              >
                <p className="font-mono text-xs text-brass-600">0{i + 1}</p>
                <h3 className="mt-3 font-display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-700">{p.copy}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      

      <div className="brass-rule container-page" />

      {/* PROGRAMME TEASERS blueprint §10–14 homepage order */}
      {PROGRAMMES.map((prog, i) => (
        <section
          key={prog.eyebrow}
          className={`container-page py-16 ${i % 2 === 1 ? "bg-paper-100" : ""}`}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-center">
            <RevealOnScroll className={i % 2 === 1 ? "lg:order-2" : ""}>
              <Eyebrow>{prog.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl leading-tight">{prog.heading}</h2>
              <p className="mt-4 max-w-md text-ink-700">{prog.copy}</p>
              <div className="mt-6">
                <Button href={prog.href}>{prog.cta}</Button>
              </div>
            </RevealOnScroll>
            {/* TODO: dedicated imagery per programme once supplied (blueprint §25) */}
 <div className={`relative aspect-video w-full overflow-hidden border border-ink-900/10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image
                src={prog.image}
                alt={prog.eyebrow}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      ))}

            {/* KINGDOM INFLUENCE blueprint §15 */}
      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-center">
          <RevealOnScroll>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-ink-900/10">
              <Image src={KingdomInfluence} alt="Kingdom Influence" fill className="object-cover" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Eyebrow>Kingdom Influence</Eyebrow>
            <h2 className="font-display text-3xl leading-tight">
              Daily wisdom for purpose, leadership, and transformation.
            </h2>
            <p className="mt-4 max-w-md text-ink-700">
              A faith-based resource on daily wisdom, biblical principles, purpose, leadership and
              personal transformation for living intentionally and leading responsibly.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/kingdom-influence">Read today&apos;s devotional</Button>
              <Button href="/kingdom-influence" variant="secondary">
                Explore Kingdom Influence
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* TESTIMONIALS blueprint §18 (only real, owner-supplied testimonials get published) */}
      <section className="container-page py-16">
        <RevealOnScroll>
          <Eyebrow>What people are saying</Eyebrow>
          <h2 className="font-display text-3xl">Testimonials</h2>
        </RevealOnScroll>
        {TESTIMONIALS.length === 0 ? (
          <p className="mt-6 text-sm text-ink-700">
            Awaiting genuine testimonials from Nelson O. Bello before this section goes live.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border border-ink-900/10 p-6">
                <p className="text-sm italic text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-display text-sm">{t.name}</p>
                <p className="text-xs text-ink-700">{t.role}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SPEAKING CTA blueprint §17 */}
      <section className="container-page py-16">
        <RevealOnScroll>
          <div className="border border-ink-900/10 bg-paper-100 p-10 text-center">
            <Eyebrow>Speaking & engagements</Eyebrow>
            <h2 className="font-display text-3xl">Invite Nelson to speak</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-700">
              Available for educational programmes, leadership events, youth programmes, church
              programmes and student development initiatives.
            </p>
            <div className="mt-6">
              <Button href="/contact">Invite Nelson to speak</Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FINAL CONTACT CTA blueprint §33 */}
      <section className="container-page pb-24 pt-4">
        <RevealOnScroll>
          <div className="border border-ink-900/10 p-10 text-center sm:p-16">
            <h2 className="font-display text-3xl sm:text-4xl">Your journey starts here.</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-700">
              Whether you&apos;re looking for a book, seeking educational support, preparing for an
              examination, exploring publishing, looking for coaching, or seeking resources for
              purposeful living there&apos;s something here for you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/books">Explore books</Button>
              <Button href="/tutorial-centre" variant="secondary">
                Join NELBELL
              </Button>
              <Button href="/coaching" variant="secondary">
                Work with me
              </Button>
              <Button href="/contact" variant="ghost">
                Connect on WhatsApp
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}