import { apiClient } from './apiClient';
import type { Attempt, Question } from '@/domain/entities';

export interface QuizSnapshot {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  createdAt: string;
  questions: Question[];
}

export interface StartAttemptResponse {
  attempt: Attempt;
  quiz: QuizSnapshot;
}

export async function startAttempt(quizId: number): Promise<StartAttemptResponse> {
  return apiClient<StartAttemptResponse>('/attempts', {
    method: 'POST',
    body: JSON.stringify({ quizId }),
  });
}

export async function upsertAnswer(attemptId: number, questionId: number, value: string) {
  return apiClient<{ ok: true } | { attempt: Attempt }>(`/attempts/${attemptId}/answer`, {
    method: 'POST',
    body: JSON.stringify({ questionId, value }),
  });
}

export interface SubmitResult {
  score: number;
  details: Array<{ questionId: number; correct: boolean; expected?: string }>;
}

export async function submitAttempt(attemptId: number): Promise<SubmitResult> {
  return apiClient<SubmitResult>(`/attempts/${attemptId}/submit`, {
    method: 'POST',
  });
}
