import axios from "axios";
import endpoint from "./_utils/endpoint";
import { Profile } from "./types";

type GetProfilesResponse = {
  profiles: Profile[];
};

const getProfiles = async () => {
  const response = await axios.get<GetProfilesResponse>(endpoint("profiles"));
  return response.data.profiles;
};

export default getProfiles;
