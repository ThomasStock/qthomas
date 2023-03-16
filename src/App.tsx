import { useQuery } from "react-query";
import getProfile from "./apiClient/getProfile";
import getProfiles from "./apiClient/getProfiles";
import { Profile } from "./apiClient/types";
import useQuestionaryStore from "./store";

function App() {
  const profileId = useQuestionaryStore((state) => state.profileId);

  const { isLoading, data: profiles } = useQuery(
    ["profile", profileId],
    () => getProfile(profileId!),
    { enabled: !!profileId }
  );

  return (
    <div className="">
      <header>
        <h1 className="text-3xl">Profile</h1>
      </header>
      <ProfileChoice />
    </div>
  );
}

export default App;

const ProfileChoice = () => {
  const { isLoading, data: profiles } = useQuery("profiles", getProfiles);

  if (isLoading) return <div>"Loading..."</div>;
  return (
    <ul className="flex flex-col">
      {profiles?.map((profile) => (
        <ProfileButton key={profile.id} {...profile} />
      ))}
    </ul>
  );
};

const ProfileButton = (props: Profile) => {
  const selectProfile = useQuestionaryStore((state) => state.selectProfile);

  const { id, name } = props;

  return <button onClick={() => selectProfile(id)}>{name}</button>;
};
