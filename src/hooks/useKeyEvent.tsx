import { FC } from "react";
import { nanoid } from "nanoid";
// interfaces
import { SearchInterface } from "../interfaces/Search";
// components
import { Text } from "../components/Text";

const useKeyEvent: FC<SearchInterface> = ({ e, objects, setObjects }) => {
  switch (true) {
    // Space, numbers, A-Z, numpad
    case (e.keyCode == 32):
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      setObjects([
        ...objects,
        <Text
          key={nanoid()}
          letter={e.key.toUpperCase()}
        />
      ]);
    }
      break;
    // Backspace
    case (e.keyCode == 8): {
      objects.splice(-1);
      setObjects([...objects]);
    }
      break;
    // Delete
    case (e.keyCode == 46): {
      objects.splice(-1);
      setObjects([...objects]);
    }
      break;
    default:
      return null;
  }

  return;
};

export { useKeyEvent }