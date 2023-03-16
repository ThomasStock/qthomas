import useQuestionaryStore from "../../store";

const HomeButton = () => {
  const resetProfile = useQuestionaryStore((state) => state.resetProfile);

  return <button onClick={() => resetProfile()}>&lt; Home</button>;
};

export default HomeButton;
