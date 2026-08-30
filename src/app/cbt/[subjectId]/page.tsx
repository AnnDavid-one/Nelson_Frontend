"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCbtSubjects } from "@/hooks/useCbtSubjects";
import { useCbtAccess } from "@/hooks/useCbtAccess";
import { QuizRunner } from "@/components/cbt/QuizRunner";

export default function CbtSubjectPage() {
  const params = useParams<{ subjectId: string }>();
  const router = useRouter();
  const { access, hydrated } = useCbtAccess();
  const { data: subjects } = useCbtSubjects();
  const subject = subjects?.find((s) => s.id === params.subjectId);

  useEffect(() => {
    if (hydrated && !access) router.replace("/cbt");
  }, [hydrated, access, router]);

  if (!hydrated || !access) return null;

  return (
    <div className="container-page py-16">
      <QuizRunner
        subjectId={params.subjectId}
        subjectName={subject?.name ?? "Practice"}
        attemptId={access.attemptId}
      />
    </div>
  );
}