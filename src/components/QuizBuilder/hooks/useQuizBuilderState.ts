import { useState } from 'react';
import type { Question, MCQQuestion } from '@/domain/entities';
import { createQuiz, createQuestion } from '@/services/quizService';

type QuizDraft = {
  title: string;
  description: string;
  timeLimitSeconds?: number;
  questions: Question[];
};

const emptyMcq = (): MCQQuestion => ({
  id: 0,
  quizId: 0,
  type: 'mcq',
  prompt: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  position: 0,
  createdAt: new Date().toISOString(),
});

const useQuizBuilderState = () => {
  const [quizDraft, setQuizDraft] = useState<QuizDraft>({
    title: '',
    description: '',
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question>(emptyMcq());
  const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'type') {
      const now = new Date().toISOString();
      if (value === 'mcq') {
        setCurrentQuestion(prev => ({
          id: 0,
          quizId: 0,
          type: 'mcq',
          prompt: prev.prompt || '',
          options: ['', '', '', ''],
          correctAnswer: '',
          position: prev.position ?? 0,
          createdAt: prev.createdAt || now,
        }));
      } else if (value === 'short') {
        setCurrentQuestion(prev => ({
          id: 0,
          quizId: 0,
          type: 'short',
          prompt: prev.prompt || '',
          correctAnswer: '',
          position: prev.position ?? 0,
          createdAt: prev.createdAt || now,
        }));
      } else {
        setCurrentQuestion(prev => ({
          id: 0,
          quizId: 0,
          type: 'code',
          prompt: prev.prompt || '',
          correctAnswer: '',
          position: prev.position ?? 0,
          createdAt: prev.createdAt || now,
        }));
      }
      return;
    }

    setCurrentQuestion(prev => ({ ...prev, [name]: value }) as Question);
  };

  const handleChoiceChange = (index: number, value: string) => {
    if (currentQuestion.type !== 'mcq') return;
    const options = [...currentQuestion.options];
    options[index] = value;
    setCurrentQuestion({ ...currentQuestion, options });
  };

  const handleAddQuestion = () => {
    setQuizDraft(prev => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion, position: prev.questions.length }],
    }));
    setCurrentQuestion(emptyMcq());
  };

  const save = async () => {
    const created = await createQuiz({
      title: quizDraft.title,
      description: quizDraft.description,
      timeLimitSeconds: quizDraft.timeLimitSeconds,
      isPublished: true,
    });

    await Promise.all(
      quizDraft.questions.map((q, index) =>
        createQuestion({
          quizId: created.id,
          type: q.type,
          prompt: q.prompt,
          position: index,
          options: q.type === 'mcq' ? q.options : undefined,
          correctAnswer: q.correctAnswer || undefined,
        })
      )
    );

    return created;
  };

  const handleOnSave = async () => {
    try {
      await save();
      alert('Quiz saved successfully!');
    } catch (err: any) {
      alert(err?.message || 'Failed to save quiz');
    }
  };

  return {
    state: {
      quizDraft,
      currentQuestion,
    },
    actions: {
      handleQuizChange,
      handleQuestionChange,
      handleChoiceChange,
      handleAddQuestion,
      handleOnSave,
    },
  };
};

export default useQuizBuilderState;
