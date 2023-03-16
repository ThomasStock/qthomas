import { create } from "zustand";

interface Store {
  profileId: string | undefined;
  selectProfile: (profileId: string) => void;
  resetProfile: () => void;
}

const useQuestionaryStore = create<Store>((set) => ({
  profileId: undefined,
  selectProfile: (profileId) => set({ profileId }),
  resetProfile: () => set({ profileId: undefined })
}));

export default useQuestionaryStore;
