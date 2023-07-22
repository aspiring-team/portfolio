import { create } from "zustand";
import { Guide, Section } from "@/models";

type PortfolioStoreProps = {
  started: boolean;
  setStarted: (started: boolean) => void;

  sections: Section[];
  setSections: (sections: Section[]) => void;
  appendSection: (section: Section) => void;
  updateSection: (id: string, section: Section) => void;

  guides: Guide[];
  guideId?: string;
  setGuides: (guides: Guide[]) => void;
  selectGuide: (guideId: string) => void;
  appendGuide: (guide: Guide) => void;
  updateGuide: (id: string, guide: Guide) => void;

  completionLoading: boolean;
  setCompletionLoading: (loading: boolean) => void;
};

const usePortfolioStore = create<PortfolioStoreProps>((set, get) => ({
  started: false,
  setStarted: (started) => set({ started }),

  sections: [],
  setSections: (sections) => set({ sections }),
  appendSection: (section) =>
    set((s) => ({ sections: [...s.sections, section] })),
  updateSection: (id, section) =>
    set((s) => ({
      sections: s.sections.map((s) => (s.id === id ? section : s)),
    })),

  guides: [],
  guideId: undefined,
  setGuides: (guides: Guide[]) => set({ guides }),
  selectGuide: (guideId: string) => set({ guideId }),
  appendGuide: (guide: Guide) => set((s) => ({ guides: [...s.guides, guide] })),
  updateGuide: (id: string, guide: Guide) =>
    set((s) => ({ guides: s.guides.map((g) => (g.id === id ? guide : g)) })),

  completionLoading: false,
  setCompletionLoading: (loading: boolean) =>
    set({ completionLoading: loading }),
}));

export { usePortfolioStore };
