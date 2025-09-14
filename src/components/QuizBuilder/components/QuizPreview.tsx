import React from 'react';
import type { Question } from '@/domain/entities';

interface QuizDraft {
  title: string;
  description: string;
  timeLimitSeconds?: number;
  questions: Question[];
}

interface Props {
  quiz: QuizDraft;
}

const QuizPreview: React.FC<Props> = ({ quiz }) => {
  if (!quiz) return null;

  return (
    <section>
      <h3>Preview</h3>
      <h4>{quiz.title}</h4>
      <p>{quiz.description}</p>

      {quiz.questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <ol>
          {quiz.questions.map((q, index) => (
            <li key={index}>
              <div>Type: {q.type}</div>
              <div>Prompt: {q.prompt}</div>
              {q.type === 'mcq' ? (
                <>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  {q.correctAnswer && <div>Correct: {q.correctAnswer}</div>}
                </>
              ) : (
                q.correctAnswer && <div>Expected: {q.correctAnswer}</div>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default QuizPreview;
