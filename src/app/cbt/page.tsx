// src/app/cbt/page.tsx
"use client";

import Link from "next/link";
import { useCbtSubjects } from "@/hooks/useCbtSubjects";
import { useCbtAccess } from "@/hooks/useCbtAccess";
import { CbtAccessGate } from "@/components/cbt/CbtAccessGate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Loader } from "lucide-react";

export default function CbtHubPage() {
  const { access, hydrated } = useCbtAccess();
  const { data: subjects, isLoading, isError } = useCbtSubjects();

  if (!hydrated) return null;
  if (!access) return <CbtAccessGate />;

   if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="h-12 w-12  animate-spin text-brass-500"  />
        <p className="text-brass-500 h-sm w-sm">Loading CBT Questions</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
           <Eyebrow>CBT practice</Eyebrow>
      <h1 className="max-w-2xl font-display text-4xl">
        Pick a subject and sit a timed, graded practice session.
      </h1>
      <p className="mt-2 text-sm text-ink-700">
        {access.attemptsRemaining} attempt{access.attemptsRemaining === 1 ? "" : "s"} remaining.
      </p>

      {isLoading && <p className="mt-10 text-sm text-ink-700">Loading subjects&hellip;</p>}
      {isError && <p className="mt-10 text-sm text-oxblood-600">Couldn&apos;t load subjects.</p>}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects?.map((subject, i) => (
          <RevealOnScroll key={subject.id} delay={i * 0.05}>
            <Link
              href={`/cbt/${subject.id}`}
              className="block border border-ink-900/10 p-6 transition hover:border-brass-500"
            >
              <p className="font-mono text-xs text-brass-600">Subject</p>
              <h3 className="mt-1 font-display text-xl">{subject.name}</h3>
              <p className="mt-2 text-sm text-ink-700">Start practice &rarr;</p>
            </Link>
          </RevealOnScroll>
        ))}
        {subjects?.length === 0 && (
          <p className="text-sm text-ink-700">No subjects have been added yet.</p>
        )}
      </div>
    </div>
  );
}
