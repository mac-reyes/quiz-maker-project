import { Question } from '../../QuizBuilder/types/quizTypes';

export interface QuizAttempt {
  quizId: string;
  currentIndex: number;
  answers: Record<number, string>;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  total: number;
  perQuestionResults: boolean[];
}
