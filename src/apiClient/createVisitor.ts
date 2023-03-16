import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Answers } from "./types";

type createVisitorParams = { profileId: string; answers: Answers };

const createVisitor = async (params: createVisitorParams) => {
  const { profileId, answers } = params;

  await axios.post(endpoint(`visitors`), {
    profileId,
    fields: Object.keys(answers).map((questionId) => ({
      questionId,
      value: answers[questionId]
    }))
  });
};

export default createVisitor;
