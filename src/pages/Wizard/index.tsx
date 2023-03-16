import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import getProfile from "../../apiClient/getProfile";
import getVisitor from "../../apiClient/getVisitor";
import updateVisitorApi from "../../apiClient/updateVisitor";
import createVisitorApi from "../../apiClient/createVisitor";
import useQuestionaryStore from "../../store";
import WizardStep from "./WizardStep";
import { Answers } from "../../apiClient/types";
import Button from "../../ui-components/Button";

const Wizard = () => {
  const profileId = useQuestionaryStore((state) => state.profileId);

  const [answers, setAnswers] = useState<Answers>({});

  const [questionIndex, setQuestionIndex] = useState(0);

  const { data: questions } = useQuery(
    ["profile", profileId],
    () => getProfile(profileId!),
    { enabled: !!profileId }
  );

  const { mutate: createVisitor } = useMutation({
    mutationFn: createVisitorApi
  });
  const { mutate: updateVisitor } = useMutation({
    mutationFn: updateVisitorApi
  });

  const firstQuestion = questions?.[0];
  const identifier = firstQuestion?.isIdentificationField
    ? answers?.[firstQuestion.id]
    : undefined;

  const { data: visitorData } = useQuery(
    ["visitor", identifier],
    () => getVisitor(firstQuestion!.id, identifier!.toString()),
    { enabled: !!identifier }
  );
  const { answers: serverAnswers, visitorId } = visitorData || {};

  if (!profileId || !questions) {
    return null;
  }

  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex == questions.length - 1;
  const showConfirmationMessage = questionIndex >= questions.length;

  if (showConfirmationMessage) {
    return (
      <div>
        <p>All done! Thanks!</p>
      </div>
    );
  }

  const question = questions[questionIndex];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });

    if (isLastQuestion) {
      if (!visitorId) {
        createVisitor({ profileId, answers: answers! });
      } else {
        updateVisitor({ visitorId, profileId, answers: answers! });
      }
    }

    setQuestionIndex((i) => i + 1);
  };

  const answer = answers[question.id] ?? serverAnswers?.[question.id];

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <WizardStep
        key={question.id}
        question={question}
        answer={answer}
        onChange={handleAnswer}
      />
      {!isFirstQuestion && (
        <Button className="w-48" onClick={() => setQuestionIndex((i) => i - 1)}>
          Previous
        </Button>
      )}
    </div>
  );
};

export default Wizard;
