import React from 'react';
import useQuizPlayer from '../hooks/useQuizPlayer';
import QuestionDisplay from '../components/QuestionDisplay';
import QuizNavigation from '../components/QuizNavigation';
import QuizResult from '../components/QuizResult';

type Props = { quizId?: number };

const QuizPlayer: React.FC<Props> = ({ quizId }) => {
  const {
    state: {
      loading,
      error,
      quiz,
      currentIndex,
      currentQuestion,
      answers,
      submitted,
      serverResult,
    },
    actions: { handleAnswerChange, next, prev, submit },
  } = useQuizPlayer({ quizId });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return null;

  return (
    <section>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      {submitted ? (
        <QuizResult
          questions={quiz.questions}
          answers={answers}
          serverResult={serverResult ?? undefined}
        />
      ) : (
        <>
          <p>
            Question {currentIndex + 1} of {quiz.questions.length}
          </p>

          <QuestionDisplay
            question={currentQuestion}
            answer={answers[currentIndex] ?? ''}
            onAnswerChange={handleAnswerChange}
          />

          <QuizNavigation
            onPrev={prev}
            onNext={next}
            onSubmit={submit}
            isFirst={currentIndex === 0}
            isLast={currentIndex === quiz.questions.length - 1}
          />
        </>
      )}
    </section>
  );
};

export default QuizPlayer;
