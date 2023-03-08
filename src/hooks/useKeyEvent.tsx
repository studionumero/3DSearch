import { FC } from "react";
import { nanoid } from "nanoid";
import { pullAt, range } from "lodash";
// interfaces
import { SearchInterface } from "../interfaces/Search";
// components
import { Text } from "../components/Text";

const addAfter = (array: any[], index: number, newItem: JSX.Element | any) => {
  return [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index)
  ];
}

const backspace = (arr: any[], index: number) => {
  if (index > -1) {
    arr.splice(index - 1, 1);
  }
  return arr;
}

const set = (startCaret: number, endCaret: number, search: string | any[], state: unknown[], setState: (arg0: any) => void) => {
  const start = range(0, startCaret, 1);
  const end = range(endCaret, search.length, 1);
  const arr = start.concat(end); 
  setState(pullAt(state, arr));
}

const useKeyEvent: FC<SearchInterface> = ({ startCaret, endCaret, search, setSearch, e, objects, setObjects }) => {
  const id = nanoid();

  switch (true) {
    // Space, numbers, A-Z, numpad
    case (e.keyCode == 32):
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      setObjects(
        addAfter(objects, startCaret, <Text
          key={id}
          letter={e.key.toUpperCase()}
        />)
      );
      setSearch(
        addAfter(search, startCaret, {
          key: id,
          letter: e.key
        })
      )
    }
      break;
    // Backspace
    case (e.keyCode == 8): {
      if (startCaret !== endCaret) {
        set(startCaret, endCaret, search, objects, setObjects);
        set(startCaret, endCaret, search, search, setSearch);
      } else {
        backspace(objects, endCaret)
        setObjects([...objects]);
        backspace(search, endCaret)
        setSearch([...search]);
      }
    }

      break;
    // // Delete
    // case (e.keyCode == 46): {
    //   objects.splice(-1);
    //   setObjects([...objects]);
    // }
    //   break;
    default:
      return null;
  }

  return;
};

export { useKeyEvent }