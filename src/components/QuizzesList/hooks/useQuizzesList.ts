import { useEffect, useState } from 'react';
import type { Quiz } from '@/domain/entities';
import { getQuizzes, updateQuiz } from '@/services/quizService';

const useQuizzesList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getQuizzes();
      setQuizzes(list);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load quizzes.');
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (quiz: Quiz, next: boolean) => {
    setBusyIds(prev => new Set(prev).add(quiz.id));
    try {
      const updated = await updateQuiz(quiz.id, { isPublished: next });
      setQuizzes(prev => prev.map(q => (q.id === updated.id ? updated : q)));
    } catch (e: any) {
      alert(e?.message ?? 'Failed to update publish status.');
    } finally {
      setBusyIds(prev => {
        const n = new Set(prev);
        n.delete(quiz.id);
        return n;
      });
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    state: { quizzes, loading, error, busyIds },
    actions: { refresh, togglePublish },
  };
};

export default useQuizzesList;
