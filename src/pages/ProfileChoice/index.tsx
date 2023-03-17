import { useQuery } from "react-query";
import getProfiles from "../../apiClient/getProfiles";
import ProfileButton from "./ProfileButton";

const ProfileChoice = () => {
  const { isLoading, data: profiles } = useQuery("profiles", getProfiles);

  if (isLoading) return null;

  return (
    <ul className="flex flex-col w-full items-center">
      {profiles?.map((profile) => (
        <ProfileButton key={profile.id} {...profile} />
      ))}
    </ul>
  );
};

export default ProfileChoice;
