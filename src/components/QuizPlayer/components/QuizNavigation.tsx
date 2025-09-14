import React from 'react';
import Button from '@/components/ui/Button';

interface Props {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizNavigation: React.FC<Props> = ({ onPrev, onNext, onSubmit, isFirst, isLast }) => {
  return (
    <div>
      {!isFirst && <Button onClick={onPrev}>Previous</Button>}
      {!isLast && <Button onClick={onNext}>Next</Button>}
      {isLast && <Button onClick={onSubmit}>Submit</Button>}
    </div>
  );
};

export default QuizNavigation;
