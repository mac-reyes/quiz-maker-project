import { apiClient } from './apiClient';
import type { Quiz, Question } from '@/domain/entities';

export async function getQuizzes(): Promise<Quiz[]> {
  return await apiClient<Quiz[]>('/quizzes');
}

export async function fetchQuiz(quizId: number): Promise<Quiz & { questions: Question[] }> {
  return await apiClient<Quiz & { questions: Question[] }>(`/quizzes/${quizId}`);
}

export async function createQuiz(body: {
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished?: boolean;
}): Promise<Quiz> {
  return await apiClient<Quiz>('/quizzes', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateQuiz(
  quizId: number,
  body: {
    title?: string;
    description?: string;
    timeLimitSeconds?: number;
    isPublished?: boolean;
  }
): Promise<Quiz> {
  return await apiClient<Quiz>(`/quizzes/${quizId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function createQuestion(body: {
  quizId: number;
  type: 'mcq' | 'short' | 'code';
  prompt: string;
  position?: number;
  options?: string[];
  correctAnswer?: string;
}): Promise<Question> {
  return await apiClient<Question>(`/quizzes/${body.quizId}/questions`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateQuestion(
  questionId: number,
  body: {
    prompt?: string;
    position?: number;
    options?: string[];
    correctAnswer?: string;
  }
): Promise<Question> {
  return await apiClient<Question>(`/questions/${questionId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteQuestion(questionId: number): Promise<void> {
  await apiClient<void>(`/questions/${questionId}`, { method: 'DELETE' });
}
