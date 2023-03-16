import { useMutation, useQuery } from "react-query";
import updateVisitorApi from "../apiClient/updateVisitor";
import createVisitorApi, {
  SaveVisitorParams
} from "../apiClient/createVisitor";
import getVisitor from "../apiClient/getVisitor";

interface useVisitorProps {
  identifier: string | undefined;
  identifyingQuestionId: string | undefined;
}

const useVisitor = (props: useVisitorProps) => {
  const { identifier, identifyingQuestionId } = props;

  const { mutate: createVisitor, isSuccess: createSucceeded } = useMutation({
    mutationFn: createVisitorApi
  });
  const { mutate: updateVisitor, isSuccess: updateSucceeded } = useMutation({
    mutationFn: updateVisitorApi
  });

  const { data: visitorData } = useQuery(
    ["visitor", identifyingQuestionId, identifier],
    () => getVisitor(identifyingQuestionId!, identifier!.toString()),
    { enabled: !!identifier && !!identifyingQuestionId }
  );
  const { answers, visitorId } = visitorData || {};

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
    isSaved: createSucceeded || updateSucceeded
  };
};

export default useVisitor;
