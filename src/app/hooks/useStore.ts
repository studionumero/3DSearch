import { create } from "zustand";

type Search = {
  characters: any[];
  query: string;
}

const initialSearch: Search = {
  query: "",
  characters: [],
}

type Action = {
  updateCharacters: (characters: Search['characters']) => void
  updateQuery: (query: Search['query']) => void
  resetSearch: () => void
}

export const useStore = create<Search & Action>((set) => ({
  ...initialSearch,
  updateCharacters: (characters) => set(() => ({ characters: characters })),
  updateQuery: (query) => set(() => ({ query: query })),
  resetSearch: () => set(initialSearch),
}));