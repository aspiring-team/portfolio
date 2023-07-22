import { create } from "zustand";
import { Guide, Section } from "@/models";

type PortfolioStoreProps = {
  started: boolean;
  setStarted: (started: boolean) => void;

  sections: Section[];
  setSections: (sections: Section[]) => void;
  appendSection: (section: Section) => void;
  updateSection: (id: string, section: Partial<Section>) => void;

  guides: Guide[];
  guideId?: string;
  setGuides: (guides: Guide[]) => void;
  selectGuide: (guideId: string) => void;
  appendGuide: (guide: Guide) => void;
  updateGuide: (id: string, guide: Partial<Guide>) => void;

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
      sections: s.sections.map((s) =>
        s.id === id
          ? {
              id: section.id ?? s.id,
              type: section.type ?? s.type,
              title: section.title ?? s.title,
              content: section.content ?? s.content,
              image: section.image ?? s.image,
            }
          : s
      ),
    })),

  guides: [],
  guideId: undefined,
  setGuides: (guides) => set({ guides }),
  selectGuide: (guideId) => set({ guideId }),
  appendGuide: (guide) => set((s) => ({ guides: [...s.guides, guide] })),
  updateGuide: (id, guide) =>
    set((s) => ({
      guides: s.guides.map((g) =>
        g.id === id
          ? {
              id: guide.id ?? g.id,
              type: guide.type ?? g.type,
              qnas: guide.qnas ?? g.qnas,
              history: guide.history ?? g.history,
            }
          : g
      ),
    })),

  completionLoading: false,
  setCompletionLoading: (loading) => set({ completionLoading: loading }),
}));

export { usePortfolioStore };
