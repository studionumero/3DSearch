import { FC } from "react";
import { nanoid } from "nanoid";
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

function removeItem<T>(arr: Array<T>, index: number): Array<T> {
  // const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index - 1, 1);
  }
  return arr;
}

const useKeyEvent: FC<SearchInterface> = ({ startCaret, endCaret, search, setSearch, e, objects, setObjects }) => {
  const id = nanoid();

  switch (true) {
    // Space, numbers, A-Z, numpad
    case (e.keyCode == 32):
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      // Convert to array push
      // Index at caret
      setObjects(
        addAfter(objects, startCaret, <Text
          key={id}
          letter={e.key.toUpperCase()}
        />)
      );
      // Convert to array push
      // Index at caret
      setSearch(
        addAfter(search, startCaret, {
          key: id,
          letter: e.key.toUpperCase()
        })
      )
    }
      break;
    // Backspace
    case (e.keyCode == 8): {
      // objects.splice(-1);
      removeItem(objects, endCaret)
      setObjects([...objects]);
      removeItem(search, endCaret)
      setSearch([...search]);
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