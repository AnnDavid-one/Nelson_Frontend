// Centralized TanStack Query keys so cache invalidation stays consistent.
export const queryKeys = {
  books: ["books"] as const,
  book: (slug: string) => ["books", slug] as const,
  cbtSubjects: ["cbt", "subjects"] as const,
  cbtQuestions: (subjectId: string) => ["cbt", "subjects", subjectId, "questions"] as const,
  settings: ["settings"] as const,
  order: (id: string) => ["orders", id] as const,
};
