import axios from "axios";
import endpoint from "./_utils/endpoint";
import { SaveVisitorParams } from "./createVisitor";

type UpdateVisitorParams = SaveVisitorParams & {
  visitorId: string;
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
