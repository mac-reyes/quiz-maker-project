import React from 'react';
import type { Question } from '@/domain/entities';
import Input from '@/components/ui/Input';

interface Props {
  question: Question | undefined;
  answer: string;
  onAnswerChange: (value: string) => void;
}

const QuestionDisplay: React.FC<Props> = ({ question, answer, onAnswerChange }) => {
  if (!question) return null;

  return (
    <div>
      <p>
        <strong>{question.prompt}</strong>
      </p>

      {question.type === 'mcq' ? (
        <ul>
          {question.options.map((choice, idx) => (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  checked={answer === choice}
                  onChange={() => onAnswerChange(choice)}
                />
                {choice}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <Input
          type="text"
          value={answer}
          placeholder="Your answer"
          onChange={e => onAnswerChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default QuestionDisplay;
