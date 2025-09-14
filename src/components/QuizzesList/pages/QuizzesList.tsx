import React from 'react';
import Button from '@/components/ui/Button';
import useQuizzesList from '../hooks/useQuizzesList';
//
interface Props {
  onPlay: (quizId: number) => void;
  onBuild: () => void;
}

const QuizzesList: React.FC<Props> = ({ onPlay, onBuild }) => {
  const {
    state: { quizzes, loading, error, busyIds },
    actions: { togglePublish },
  } = useQuizzesList();

  return (
    <section>
      <h2>Quizzes</h2>
      <Button onClick={onBuild}>Create a Quiz</Button>

      {loading && <p>Loading…</p>}
      {error && <p>{error}</p>}
      {!loading && !error && quizzes.length === 0 && <p>No quizzes yet.</p>}

      <ul>
        {quizzes.map(q => {
          const busy = busyIds.has(q.id);
          return (
            <li key={q.id}>
              <div>
                <strong>{q.title}</strong> — {q.isPublished ? 'Published' : 'Draft'}
              </div>
              <div>{q.description}</div>
              <div>
                <Button onClick={() => onPlay(q.id)} disabled={!q.isPublished || busy}>
                  Play
                </Button>
                <Button onClick={() => togglePublish(q, !q.isPublished)} disabled={busy}>
                  {q.isPublished ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default QuizzesList;
