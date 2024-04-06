import { create } from "zustand";

type Search = {
  query: string;
  characters: any[];
  selection: {
    start: number | null;
    end: number | null;
  };
}

const initialSearch: Search = {
  query: "",
  characters: [],
  selection: {
    start: 0,
    end: 0
  },
}

type Action = {
  updateCharacters: (characters: Search['characters']) => void
  updateQuery: (query: Search['query']) => void
  updateSelection: (selection: Search['selection']) => void
  resetSearch: () => void
}

export const useStore = create<Search & Action>((set) => ({
  ...initialSearch,
  updateCharacters: (characters) => set(() => ({ characters: characters })),
  updateQuery: (query) => set(() => ({ query: query })),
  updateSelection: (selection) => set(() => ({ selection: selection })),
  resetSearch: () => set(initialSearch),
}));