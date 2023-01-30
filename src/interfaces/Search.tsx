import { KeyboardEvent, MouseEventHandler } from "react";

export interface SearchInterface {
  e?: any;
  search?: string;
  setSearch?: (arg0: any) => void,
  objects?: any[],
  setObjects?: any;
  useKey?: (arg0: KeyboardEvent<HTMLInputElement>) => void,
  reset?: MouseEventHandler<HTMLButtonElement>,
}