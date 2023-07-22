import { create } from "zustand";
import { Guide, Section } from "@/models";

type PortfolioStoreProps = {
  started: boolean;
  setStarted: (started: boolean) => void;

  sections: Section[];
  setSections: (sections: Section[]) => void;

  guides: Guide[];
  setGuides: (guides: Guide[]) => void;
};

const usePortfolioStore = create<PortfolioStoreProps>((set) => ({
  started: false,
  setStarted: (started) => set({ started }),

  sections: [],
  setSections: (sections) => set({ sections }),

  guides: [],
  setGuides: (guides: Guide[]) => set({ guides }),
}));

export { usePortfolioStore };
