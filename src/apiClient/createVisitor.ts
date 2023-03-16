import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Answers } from "./types";

export type SaveVisitorParams = { profileId: string; answers: Answers };

const createVisitor = async (params: SaveVisitorParams) => {
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
