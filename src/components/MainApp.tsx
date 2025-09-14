import React, { useState } from 'react';
import Header from './Header';
import BackBar from './BackBar';
import QuizBuilder from './QuizBuilder/pages/QuizBuilder';
import QuizPlayer from './QuizPlayer/pages/QuizPlayer';
import QuizzesList from './QuizzesList/pages/QuizzesList';

const MainApp: React.FC = () => {
  const [mode, setMode] = useState<'menu' | 'builder' | 'player'>('menu');
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const handlePlay = (quizId: number) => {
    setSelectedQuizId(quizId);
    setMode('player');
  };

  const handleBuild = () => setMode('builder');

  return (
    <>
      <Header />
      <BackBar show={mode !== 'menu'} onBack={() => setMode('menu')} />

      {mode === 'menu' && <QuizzesList onPlay={handlePlay} onBuild={handleBuild} />}
      {mode === 'builder' && <QuizBuilder />}
      {mode === 'player' && <QuizPlayer quizId={selectedQuizId ?? undefined} />}
    </>
  );
};

export default MainApp;
