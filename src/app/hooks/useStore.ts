import { create } from "zustand";

type Search = {
  characters: any[];
  query: string;
}

type Character = {
  font: string,
  color: string,
  bevel: boolean,
  size: number,
  height: number,
  bevelSize: number,
  brightness: number,
}

const initialCharacter: Character = {
  font: "Roboto",
  color: "#f08080",
  bevel: true,
  size: 1.8,
  height: 0.52,
  bevelSize: 0.22,
  brightness: 0.49,
}

const initialSearch: Search = {
  query: "",
  characters: [],
}

type Action = {
  updateCharacters: (characters: Search['characters']) => void
  updateQuery: (Query: Search['query']) => void
  resetSearch: () => void
}

export const useStore = create<Search & Character & Action>((set) => ({
  ...initialSearch,
  ...initialCharacter,
  updateCharacters: (characters) => set(() => ({ characters: characters })),
  updateQuery: (query) => set(() => ({ query: query })),
  resetSearch: () => set(initialSearch),
}));