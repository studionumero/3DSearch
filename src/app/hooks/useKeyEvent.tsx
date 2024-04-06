import { nanoid } from "nanoid";
import { Character } from "../components/character";

export const useKeyEvent = ({ e, characters, updateCharacters, query, updateQuery }) => {
  switch (true) {
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105):
    case (e.keyCode == 32): {
      if (e.keyCode != 32) {
        updateCharacters([
          ...characters,
          <Character
            key={nanoid()}
            letter={e.key.toUpperCase()}
          />,
        ]);
      } 
      updateQuery(query + e.key);
    }
      break;
    default:
      return null;
  }
};
