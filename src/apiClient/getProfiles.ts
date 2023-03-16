import axios from "axios";
import endpoint from "./_utils/endpoint";
import z from "zod";
import { Profile } from "./types";

const GetProfilesResponse = z.object({
  profiles: z.array(Profile)
});

const getProfiles = async () => {
  const response = await axios.get(endpoint("profiles"));
  const parsed = GetProfilesResponse.parse(response.data);
  return parsed.profiles;
};

export default getProfiles;
