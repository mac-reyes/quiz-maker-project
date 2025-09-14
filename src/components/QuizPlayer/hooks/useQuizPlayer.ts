import { useEffect, useMemo, useState } from 'react';
import type { Question } from '@/domain/entities';
import {
  startAttempt,
  upsertAnswer,
  submitAttempt,
  type QuizSnapshot,
  type SubmitResult,
} from '@/services/attemptService';

type UseQuizPlayerOptions = {
  quizId?: number;
};

const useQuizPlayer = ({ quizId }: UseQuizPlayerOptions) => {
  const resolvedQuizId = useMemo(() => {
    if (typeof quizId === 'number') return quizId;
    const raw = new URLSearchParams(window.location.search).get('quizId');
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, [quizId]);

  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<QuizSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(!!resolvedQuizId);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverResult, setServerResult] = useState<SubmitResult | null>(null);

  const currentQuestion: Question | undefined = quiz?.questions[currentIndex];

  useEffect(() => {
    if (resolvedQuizId == null) {
      setLoading(false);
      setError('No quizId provided.');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await startAttempt(resolvedQuizId);
        if (cancelled) return;

        let newAttemptId: number | null = null;
        if ((res as any)?.attempt && typeof (res as any).attempt.id === 'number') {
          newAttemptId = (res as any).attempt.id;
        } else if (typeof (res as any)?.attemptId === 'number') {
          newAttemptId = (res as any).attemptId;
        } else if (typeof (res as any)?.id === 'number') {
          newAttemptId = (res as any).id;
        }
        if (newAttemptId == null) throw new Error('Invalid startAttempt response.');

        setAttemptId(newAttemptId);
        setQuiz((res as any).quiz as QuizSnapshot);
        setCurrentIndex(0);
        setAnswers({});
        setSubmitted(false);
        setServerResult(null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load quiz.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedQuizId]);

  const handleAnswerChange = async (value: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: value }));
    if (attemptId != null && currentQuestion) {
      try {
        await upsertAnswer(attemptId, currentQuestion.id, value);
      } catch (e: any) {
        alert(e?.message ?? 'Failed to save answer.');
      }
    }
  };

  const next = () => {
    if (!quiz) return;
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const submit = async () => {
    if (attemptId == null) return;
    try {
      const result = await submitAttempt(attemptId);
      setServerResult(result);
      setSubmitted(true);
    } catch (e: any) {
      alert(e?.message ?? 'Failed to submit attempt.');
    }
  };

  return {
    state: {
      loading,
      error,
      quiz,
      attemptId,
      currentIndex,
      currentQuestion,
      answers,
      submitted,
      serverResult,
    },
    actions: {
      handleAnswerChange,
      next,
      prev,
      submit,
    },
  };
};

export { useQuizPlayer };
export default useQuizPlayer;
