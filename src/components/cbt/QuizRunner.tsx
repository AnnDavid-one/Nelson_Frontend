"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCbtQuestions } from "@/hooks/useCbtQuestions";
import { useSubmitCbtSession } from "@/hooks/useSubmitCbtSession";
import { useCbtAccess } from "@/hooks/useCbtAccess";
import type { CBTOption } from "@/types/cbtTypes";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const OPTION_KEYS: CBTOption[] = ["A", "B", "C", "D"];

export function QuizRunner({
  subjectId,
  subjectName,
  attemptId,
}: {
  subjectId: string;
  subjectName: string;
  attemptId: string;
}) {
  const { data: questions, isLoading } = useCbtQuestions(subjectId, attemptId);
  const submit = useSubmitCbtSession();
  const { updateAttemptsRemaining } = useCbtAccess();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, CBTOption>>({});
  const current = questions?.[step];
  const total = questions?.length ?? 0;

  const allAnswered = useMemo(
    () => (questions ?? []).every((q) => answers[q.id]),
    [questions, answers]
  );

  function selectOption(questionId: string, option: CBTOption) {
    setAnswers((a) => ({ ...a, [questionId]: option }));
  }

  function handleSubmit() {
    if (!questions) return;
    submit.mutate(
      {
        subjectId,
        attemptId,
        answers: questions.map((q) => ({ questionId: q.id, selected: answers[q.id] })),
      },
      {
        onSuccess: (data) => {
          updateAttemptsRemaining(data.attemptsRemaining);
        },
      }
    );
  }


    if (isLoading) {
    return <p className="py-16 text-center text-sm text-ink-700">Loading questions&hellip;</p>;
  }



  if (!questions || questions.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-ink-700">
        No {subjectName} questions are available yet.
      </p>
    );
  }

  if (submit.isSuccess) {
    const { session, results, attemptsRemaining } = submit.data;
    return (
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brass-600">Session complete</p>
        <h2 className="mt-2 font-display text-3xl">
          {session.totalCorrect} / {session.totalAsked} correct
        </h2>
        <p className="mt-2 text-sm text-ink-700">
          {attemptsRemaining > 0
            ? `${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining.`
            : "No attempts remaining you'll need to pay again to keep practicing."}
        </p>
               <Link href="/cbt" className="mt-2 inline-block text-xs uppercase tracking-widest text-brass-600 underline">
          Back to subjects
        </Link>
        <ul className="mt-8 space-y-4">
          {results.map((r, i) => {
            const q = questions.find((q) => q.id === r.questionId);
            return (
              <li
                key={r.questionId}
                className={`rounded-sm border p-4 text-sm ${
                  r.correct ? "border-sage-500/40 bg-sage-500/5" : "border-oxblood-600/30 bg-oxblood-600/5"
                }`}
              >
                <p className="font-medium">
                  {i + 1}. {q?.questionText}
                </p>
                <p className="mt-1 text-ink-700">
                  Your answer: {r.selected} {r.correct ? "— Correct" : `— Correct answer: ${r.correctOption}`}
                </p>
                {r.explanation && <p className="mt-1 text-ink-700">{r.explanation}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink-700">
        <span>{subjectName}</span>
        <span>
          Question {step + 1} / {total}
        </span>
      </div>

      <div className="mb-6 h-1 w-full bg-ink-900/10">
        <motion.div
          className="h-1 bg-brass-500"
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-xl leading-snug">{current.questionText}</h2>
            <div className="mt-6 space-y-3">
              {OPTION_KEYS.map((key) => {
                const label = current[`option${key}` as keyof typeof current] as string;
                const selected = answers[current.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => selectOption(current.id, key)}
                    className={`flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? "border-brass-500 bg-brass-500/10"
                        : "border-ink-900/15 hover:border-ink-900/40"
                    }`}
                  >
                    <span className="font-mono text-xs text-brass-600">{key}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < total - 1 ? (
          <Button onClick={() => setStep((s) => Math.min(total - 1, s + 1))} disabled={!answers[current!.id]}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!allAnswered || submit.isPending}>
            {submit.isPending ? "Grading…" : "Submit session"}
          </Button>
        )}
      </div>
    </div>
  );
}
