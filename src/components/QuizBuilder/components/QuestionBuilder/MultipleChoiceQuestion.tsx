import React from 'react';
import type { MCQQuestion } from '@/domain/entities';
import Input from '@/components/ui/Input';

interface Props {
  question: MCQQuestion;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChoiceChange: (index: number, value: string) => void;
}

const MultipleChoiceQuestionBuilder: React.FC<Props> = ({ question, onChange, onChoiceChange }) => {
  return (
    <>
      <p>Choices</p>
      {question.options.map((choice, index) => (
        <div key={index}>
          <Input
            type="text"
            value={choice}
            onChange={e => onChoiceChange(index, e.target.value)}
            placeholder={`Choice ${index + 1}`}
          />
        </div>
      ))}
      <Input
        type="text"
        name="correctAnswer"
        placeholder="Correct answer (must match a choice)"
        value={question.correctAnswer || ''}
        onChange={onChange}
      />
    </>
  );
};

export default MultipleChoiceQuestionBuilder;
