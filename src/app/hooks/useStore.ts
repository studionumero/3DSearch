import { create } from "zustand";

type State = {
  font: string;
  fontSize: number;
  bevel: boolean;
  engine: string;
  gravity: number;
  color: string;
  bg: string;
  thickness: number;
  bevelSize: number;
  brightness: number;
  typeCount: number;
  engineCount: number;
  panel: boolean;
}

type Search = {
  characters: any[];
  query: string;
}

const initialState: State = {
  font: "Roboto",
  fontSize: 1.8,
  bevel: true,
  engine: "https://www.google.com/search",
  gravity: -5.59,
  color: "#f08080",
  bg: "#6E9BA6",
  thickness: 0.52,
  bevelSize: 0.22,
  brightness: 0.49,
  typeCount: 0, // Default type counter value
  engineCount: 0, // Default engine counter value
  panel: false,
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

export const useStore = create<State & Search & Action>((set) => ({
  ...initialState,
  ...initialSearch,
  updateCharacters: (characters) => set(() => ({ characters: characters })),
  updateQuery: (query) => set(() => ({ query: query })),
  resetSearch: () => set(initialSearch),
}));