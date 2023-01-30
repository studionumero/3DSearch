import { FC } from "react";
import { nanoid } from "nanoid";
// interfaces
import { SearchInterface } from "../interfaces/Search";
// components
import { Text } from "../components/Text";
// hooks
import { useRandomPos } from "./useRandomPos";

const useKeyEvent: FC<SearchInterface> = ({ e, objects, setObjects }) => {
  switch (true) {
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      setObjects([
        ...objects,
        <Text
          key={nanoid()}
          letter={e.key.toUpperCase()}
          // initialPosition={useRandomPos()}
          initialPosition={[1, 1, 2]}
        />
      ]);
    }
      break;
    case (e.keyCode == 8): {
      objects.splice(-1);
      setObjects([...objects]);
    }
      break;
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