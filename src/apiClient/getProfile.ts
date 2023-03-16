import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Question } from "./types";

type GetProfileResponse = {
  questions: Question[];
};

const getProfile = async (profileId: string) => {
  const response = await axios.get<GetProfileResponse>(
    // backend endpoint seems to be wrong so I must hardcode the string "{id}"
    endpoint(`profiles/{id}/questionary`),
    {
      params: { profileId }
    }
  );
  return response.data.questions;
};

export default getProfile;
