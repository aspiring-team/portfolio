import { create } from "zustand";
import { Guide, Section } from "@/models";

type PortfolioStoreProps = {
  started: boolean;
  setStarted: (started: boolean) => void;

  sections: Section[];
  setSections: (sections: Section[]) => void;

  guides: Guide[];
  guideId?: string;
  setGuides: (guides: Guide[]) => void;
  appendGuide: (guide: Guide) => void;
  selectGuide: (guideId: string) => void;
};

const usePortfolioStore = create<PortfolioStoreProps>((set, get) => ({
  started: false,
  setStarted: (started) => set({ started }),

  sections: [],
  setSections: (sections) => set({ sections }),

  guides: [],
  guideId: undefined,
  setGuides: (guides: Guide[]) => set({ guides }),
  appendGuide: (guide: Guide) => set((s) => ({ guides: [...s.guides, guide] })),
  selectGuide: (guideId: string) => set({ guideId }),
}));

export { usePortfolioStore };
