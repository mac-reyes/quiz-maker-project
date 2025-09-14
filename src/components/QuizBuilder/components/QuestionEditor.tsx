import React from 'react';
import type { Question } from '@/domain/entities';
import MultipleChoiceQuestion from './QuestionBuilder/MultipleChoiceQuestion';
import ShortAnswerQuestion from './QuestionBuilder/ShortAnswerQuestion';
import Input from '@/components/ui/Input';

interface Props {
  question: Question;
  onChange: React.ChangeEventHandler<any>;
  onChoiceChange: (index: number, value: string) => void;
}

const QuestionEditor: React.FC<Props> = ({ question, onChange, onChoiceChange }) => {
  return (
    <>
      <div>
        <Input
          type="text"
          name="prompt"
          placeholder="Question prompt"
          value={question.prompt}
          onChange={onChange}
        />
      </div>

      {question.type === 'mcq' ? (
        <MultipleChoiceQuestion
          question={question}
          onChange={onChange}
          onChoiceChange={onChoiceChange}
        />
      ) : (
        <ShortAnswerQuestion question={question as any} onChange={onChange} />
      )}
    </>
  );
};

export default QuestionEditor;
