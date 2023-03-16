import { Answers, Question } from "../../apiClient/types";

const getIdentifierData = (
  questions: Question[] | undefined,
  answers: Answers | undefined
) => {
  const firstQuestion = questions?.[0];

  const identifier = firstQuestion?.isIdentificationField
    ? answers?.[firstQuestion.id]
    : undefined;

  const identifyingQuestionId = firstQuestion?.id;

  return { identifier, identifyingQuestionId };
};

export default getIdentifierData;
