import useQuestionaryStore from "../../store";
import ProfileChoice from "../ProfileChoice";
import Questionary from "../Questionary";
import HomeButton from "./HomeButton";

function App() {
  const profileId = useQuestionaryStore((state) => state.profileId);

  return (
    <div className="max-w-4xl min-w-2xl shadow-lg bg-white m-12 p-6 grow items-center">
      <header className="h-28">{profileId ? <HomeButton /> : null}</header>
      {profileId ? <Questionary /> : <ProfileChoice />}
    </div>
  );
}

export default App;
