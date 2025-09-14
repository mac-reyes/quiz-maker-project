import React from 'react';
import Button from '@/components/ui/Button';

interface Props {
  show: boolean;
  onBack: () => void;
}

const BackBar: React.FC<Props> = ({ show, onBack }) => {
  if (!show) return null;
  return (
    <nav>
      <Button onClick={onBack}>Back</Button>
    </nav>
  );
};

export default BackBar;
