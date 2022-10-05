import { KeyboardEvent, MouseEventHandler } from "react";

export interface SearchInterface {
  search?: string;
  setSearch?: (arg0: any) => void,
  objects?: string | any[],
  myKey?: (arg0: KeyboardEvent<HTMLInputElement>) => void,
  reset?: MouseEventHandler<HTMLButtonElement>,
}