import { create } from "zustand";

type SectionStoreProps = {
  selectedSectionIndex: number | null;
};

export const useSectionStore = create<SectionStoreProps>((set) => ({
  selectedSectionIndex: null,
  setSelectedSectionIndex: (idx: number) => set({ selectedSectionIndex: idx }),
}));
