import { useMutation, useQuery } from "react-query";
import updateVisitorApi from "../apiClient/updateVisitor";
import createVisitorApi, {
  SaveVisitorParams
} from "../apiClient/createVisitor";
import getVisitor, { GetVisitorParams } from "../apiClient/getVisitor";

interface UseVisitorProps {
  identifier: string | undefined;
  identifyingQuestionId: string | undefined;
}

const useVisitor = (props: UseVisitorProps) => {
  const identificationData = parseIdentificationData(props);

  const { data: visitorData } = useQuery(
    ["visitor", props],
    () => getVisitor(identificationData!),
    { enabled: !!identificationData }
  );
  const { answers, visitorId } = visitorData || {};

  const {
    mutate: createVisitor,
    isSuccess: createSucceeded,
    isError: createError
  } = useMutation({
    mutationFn: createVisitorApi
  });

  const {
    mutate: updateVisitor,
    isSuccess: updateSucceeded,
    isError: updateError
  } = useMutation({
    mutationFn: updateVisitorApi
  });

  const saveVisitor = ({ profileId, answers }: SaveVisitorParams) => {
    if (!visitorId) {
      createVisitor({ profileId, answers });
    } else {
      updateVisitor({ visitorId, profileId, answers });
    }
  };

  return {
    saveVisitor,
    answers,
    isSaved: createSucceeded || updateSucceeded,
    isError: createError || updateError
  };
};

export default useVisitor;

const parseIdentificationData = (
  props: UseVisitorProps
): GetVisitorParams | undefined => {
  const { identifier, identifyingQuestionId } = props;

  const hadIdentificationData = !!identifier && !!identifyingQuestionId;

  if (hadIdentificationData) {
    return {
      questionId: identifyingQuestionId,
      answer: identifier
    };
  }
};
