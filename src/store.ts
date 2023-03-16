import { create } from "zustand";

interface Store {
  profileId: string | undefined;
  selectProfile: (profileId: string) => void;
}

const useQuestionaryStore = create<Store>((set) => ({
  profileId: undefined,
  selectProfile: (profileId) => set({ profileId })
}));

export default useQuestionaryStore;
