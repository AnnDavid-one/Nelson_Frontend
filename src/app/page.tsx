"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useBooks } from "@/hooks/useBooks";
import { BookGrid } from "@/components/books/BookGrid";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { KingdomInfluence, KingdomInfluence1, KingdomInfluence2 } from "@/assets/images";
import Image from "next/image";



const PILLARS = [
  {
    title: "The Bookstore",
    copy: "Ebooks and print editions on faith, growth, and clear thinking — delivered or shipped.",
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
  id:number,
  photopath:typeof KingdomInfluence;
  title: string;
} 
const casero: CaseroTypes[] = [
  { id: 1, photopath: KingdomInfluence, title: "Kingdom Influence" },
  { id: 2, photopath: KingdomInfluence1, title: "Coaching Notes" },
  { id: 3, photopath: KingdomInfluence2, title: "NELBELL" },
];

export default function HomePage() {
  const { data: books } = useBooks();

  return (
    <div>
      {/* HERO — the open-book spread */}
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

      {/* PILLARS */}
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

      {/* LATEST TITLES */}
      <section className="container-page py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>From the bookstore</Eyebrow>
            <h2 className="font-display text-3xl">Latest editions</h2>
          </div>
          <Link href="/books" className="hidden text-sm text-brass-600 underline sm:inline">
            View all
          </Link>
        </div>
        <BookGrid books={(books ?? []).slice(0, 4)} />
      </section>
    </div>
  );
}
