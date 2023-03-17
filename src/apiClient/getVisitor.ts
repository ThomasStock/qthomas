import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Answers, Question, Visitor } from "./types";

type GetVisitorResponse = {
  visitors: Visitor[];
};

export type GetVisitorParams = { questionId: string; answer: string };

const getVisitor = async ({ questionId, answer }: GetVisitorParams) => {
  const response = await axios.get<GetVisitorResponse>(
    endpoint(`visitors?fieldFilter=${questionId} eq ${answer}`)
  );
  const visitor = response.data.visitors[0];

  if (!visitor) {
    return undefined;
  }

  const answers = visitor.fields.reduce((agg, { questionId, value }) => {
    agg[questionId] = value;
    return agg;
  }, {} as Answers);

  return { visitorId: visitor.id, answers };
};

export default getVisitor;
