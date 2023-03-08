import { KeyboardEvent, MouseEventHandler } from "react";

export interface SearchInterface {
  e?: any;
  search?: any[];
  startCaret?: number;
  endCaret?: number;
  setSearch?: (arg0: any) => void,
  objects?: any[],
  setObjects?: (arg0: any) => void,
  useKey?: (arg0: KeyboardEvent<HTMLInputElement>) => void,
  reset?: MouseEventHandler<HTMLButtonElement>,
}