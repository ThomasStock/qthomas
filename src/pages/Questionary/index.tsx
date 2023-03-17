import { useState } from "react";
import { useQuery } from "react-query";
import getProfile from "../../apiClient/getProfile";
import useQuestionaryStore from "../../store";
import QuestionForm from "./QuestionForm";
import { Answers } from "../../apiClient/types";
import Button from "../../ui-components/Button";
import useVisitor from "../../hooks/useVisitor";
import getIdentifierData from "./getIdentifierData";

const Questionary = () => {
  const profileId = useQuestionaryStore((state) => state.profileId);

  const [answers, setAnswers] = useState<Answers>({});

  const [questionIndex, setQuestionIndex] = useState(0);

  const { data: questions } = useQuery(
    ["profile", profileId],
    () => getProfile(profileId!),
    { enabled: !!profileId }
  );

  const indentifierData = getIdentifierData(questions, answers);
  const {
    saveVisitor,
    answers: serverAnswers,
    isSaved,
    isError
  } = useVisitor(indentifierData);

  if (!profileId || !questions) {
    return null;
  }

  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex == questions.length - 1;
  const showConfirmationMessage = questionIndex >= questions.length;

  if (showConfirmationMessage) {
    if (isError) {
      return <div>Something went wrong...</div>;
    }
    if (!isSaved) {
      return <div>Saving...</div>;
    }
    return <div>All done! Thanks!</div>;
  }

  const question = questions[questionIndex];

  const handleAnswer = (value: string) => {
    const updatedAnswers = { ...answers, [question.id]: value };

    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      saveVisitor({ profileId, answers: updatedAnswers });
    }

    setQuestionIndex((i) => i + 1);
  };

  // fallback to answer on server when no manual entry was made
  const answer = answers[question.id] ?? serverAnswers?.[question.id];

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <QuestionForm
        key={question.id}
        question={question}
        answer={answer}
        onChange={handleAnswer}
        confirmButtonLabel={isLastQuestion ? "Submit" : "Next"}
      />
      {!isFirstQuestion && (
        <Button className="w-48" onClick={() => setQuestionIndex((i) => i - 1)}>
          Previous
        </Button>
      )}
    </div>
  );
};

export default Questionary;
