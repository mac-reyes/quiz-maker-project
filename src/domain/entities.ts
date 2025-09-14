export interface Quiz {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished: boolean;
  createdAt: string;
}

export type QuestionType = 'mcq' | 'short' | 'code';

interface QuestionBase {
  id: number;
  quizId: number;
  type: QuestionType;
  prompt: string;
  position: number;
  createdAt: string;
}

export interface MCQQuestion extends QuestionBase {
  type: 'mcq';
  options: string[];
  correctAnswer?: string;
}

export interface ShortQuestion extends QuestionBase {
  type: 'short';
  correctAnswer?: string;
}

export interface CodeQuestion extends QuestionBase {
  type: 'code';
  correctAnswer?: string;
}

export type Question = MCQQuestion | ShortQuestion | CodeQuestion;

export interface Attempt {
  id: number;
  quizId: number;
  startedAt: string;
  submittedAt?: string;
  score?: number;
}

export interface AttemptAnswer {
  attemptId: number;
  questionId: number;
  value: string;
}

export interface AttemptEvent {
  id: number;
  attemptId: number;
  event: string;
  timestamp: string;
}
