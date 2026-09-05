export interface CBTSubject {
  id: string;
  name: string;
}

// Public shape — correctOption/explanation are stripped by the backend
// until a session is submitted.
export interface CBTQuestion {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  ImageUrl?: string | null;
}

export type CBTOption = "A" | "B" | "C" | "D";

export interface CBTAnswerInput {
  questionId: string;
  selected: CBTOption;
}

export interface CBTSubmitSessionInput {
  subjectId: string;
  attemptId: string;
  email?: string;
  answers: CBTAnswerInput[];
}

export interface CBTResult {
  questionId: string;
  selected: CBTOption;
  correct: boolean;
  correctOption?: string;
  explanation?: string | null;
}

export interface CBTPracticeSession {
  id: string;
  subjectId: string;
  email: string | null;
  totalAsked: number;
  totalCorrect: number;
  startedAt: string;
  completedAt: string | null;
}

export interface CBTSubjectsResponse {
  subjects: CBTSubject[];
}

export interface CBTQuestionsResponse {
  questions: CBTQuestion[];
}

export interface CBTSessionResponse {
  session: CBTPracticeSession;
  results: CBTResult[];
  attemptsRemaining: number;
}