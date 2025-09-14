import React from 'react';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import QuestionEditor from '../components//QuestionEditor';
import QuizPreview from '../components/QuizPreview';
import useQuizBuilderState from '../hooks/useQuizBuilderState';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const QuizBuilder: React.FC = () => {
  const {
    state: { quizDraft, currentQuestion },
    actions: {
      handleQuizChange,
      handleQuestionChange,
      handleChoiceChange,
      handleAddQuestion,
      handleOnSave,
    },
  } = useQuizBuilderState();

  return (
    <section>
      <h2>Quiz Builder</h2>

      <div>
        <Input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quizDraft.title}
          onChange={handleQuizChange}
        />
      </div>
      <div>
        <TextArea
          name="description"
          placeholder="Quiz Description"
          value={quizDraft.description}
          onChange={handleQuizChange}
        />
      </div>

      <h4>Add a Question</h4>

      <QuestionTypeSelector selectedType={currentQuestion.type} onChange={handleQuestionChange} />

      <QuestionEditor
        question={currentQuestion}
        onChange={handleQuestionChange}
        onChoiceChange={handleChoiceChange}
      />
      <div>
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </div>
      <QuizPreview quiz={quizDraft} />
      <Button onClick={handleOnSave}>Save Quiz</Button>
    </section>
  );
};

export default QuizBuilder;
