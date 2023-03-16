import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Answers } from "./types";

type UpdateVisitorParams = {
  visitorId: string;
  profileId: string;
  answers: Answers;
};

const updateVisitor = async (params: UpdateVisitorParams) => {
  const { visitorId, profileId, answers } = params;

  await axios.patch(endpoint(`visitors/${visitorId}`), {
    profileId,
    fields: Object.keys(answers).map((questionId) => ({
      questionId,
      value: answers[questionId]
    }))
  });
};

export default updateVisitor;
