import React from 'react';
import Select from '@/components/ui/Select';

interface Props {
  selectedType: 'mcq' | 'short' | 'code';
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const QuestionTypeSelector: React.FC<Props> = ({ selectedType, onChange }) => {
  return (
    <Select name="type" value={selectedType} onChange={onChange}>
      <option value="mcq">Multiple Choice</option>
      <option value="short">Short Answer</option>
      <option value="code">Code</option>
    </Select>
  );
};

export default QuestionTypeSelector;
