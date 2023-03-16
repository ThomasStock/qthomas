import { Profile } from "../../apiClient/types";
import useQuestionaryStore from "../../store";
import Button from "../../ui-components/Button";

const ProfileButton = (props: Profile) => {
  const selectProfile = useQuestionaryStore((state) => state.selectProfile);

  const { id, name } = props;

  return (
    <Button className="w-48 m-2" onClick={() => selectProfile(id)}>
      {name}
    </Button>
  );
};

export default ProfileButton;
