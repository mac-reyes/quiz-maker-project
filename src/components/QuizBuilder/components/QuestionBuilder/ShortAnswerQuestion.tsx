import React from 'react';
import type { ShortQuestion } from '@/domain/entities';
import Input from '@/components/ui/Input';

interface Props {
  question: ShortQuestion;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ShortAnswerQuestionBuilder: React.FC<Props> = ({ question, onChange }) => {
  return (
    <Input
      type="text"
      name="correctAnswer"
      placeholder="Correct short answer"
      value={question.correctAnswer || ''}
      onChange={onChange}
    />
  );
};

export default ShortAnswerQuestionBuilder;
