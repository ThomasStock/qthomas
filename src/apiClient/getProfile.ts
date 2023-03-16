import axios from "axios";
import endpoint from "./_utils/endpoint";
import z from "zod";
import { Question } from "./types";

const GetProfileResponse = z.object({
  questions: z.array(Question)
});

const getProfile = async (profileId: string) => {
  const response = await axios.get(endpoint(`profiles/{id}/questionary`), {
    params: { profileId }
  });
  const parsed = GetProfileResponse.parse(response.data);
  return parsed.questions;
};

export default getProfile;
