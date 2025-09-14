import React from 'react';
import type { Question } from '@/domain/entities';
import type { SubmitResult } from '@/services/attemptService';

interface Props {
  questions: Question[];
  answers: Record<number, string>;
  serverResult?: SubmitResult;
}

const QuizResult: React.FC<Props> = ({ questions, answers, serverResult }) => {
  if (serverResult) {
    const { score, details } = serverResult;
    const map = new Map(details.map(d => [d.questionId, d.correct]));
    return (
      <section>
        <h3>Result</h3>
        <p>
          Score: {score} / {questions.length}
        </p>
        <ul>
          {questions.map((q, i) => {
            const correct = map.get(q.id) ?? false;
            return (
              <li key={q.id || i}>
                Question {i + 1}: {correct ? '✅ Correct' : '❌ Incorrect'}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  const per = questions.map((q, i) => {
    const user = (answers[i] ?? '').trim().toLowerCase();
    const expected = (q.correctAnswer ?? '').trim().toLowerCase();
    return expected ? user === expected : false;
  });
  const score = per.filter(Boolean).length;

  return (
    <section>
      <h3>Result</h3>
      <p>
        Score: {score} / {questions.length}
      </p>
      <ul>
        {per.map((correct, i) => (
          <li key={i}>
            Question {i + 1}: {correct ? '✅ Correct' : '❌ Incorrect'}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuizResult;
