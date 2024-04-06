import { nanoid } from "nanoid";
import { pullAt, range } from "lodash";
import { Character } from "../components/character";

// const addAfter = (array: any[], index: number, newItem: JSX.Element | any) => {
//   return [
//     ...array.slice(0, index),
//     newItem,
//     ...array.slice(index)
//   ];
// }

// const backspace = (state: any[], index: number) => {
//   if (index > -1) {
//     state.splice(index - 1, 1);
//   }
//   return state;
// }

// const set = (selection, query, state, updateState) => {
//   const start = range(0, selection.start, 1);
//   const end = range(selection.end, query.length, 1);
//   const arr = start.concat(end);
//   updateState([pullAt(state, arr)]);
// }

export const useKeyEvent = ({ e, characters, updateCharacters, query, updateQuery, selection }) => {
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
    // Backspace
    // case (e.keyCode == 8): {
    //   if (selection.start !== selection.end) {
    //     set(selection, query, characters, updateCharacters);
    //     set(selection, query, query, updateQuery);
    //   } else {
    //     backspace(characters, selection.end)
    //     updateCharacters([...characters])
    //     backspace(query, selection.end)
    //     updateQuery([...query])
    //   }
    // }
    //   break;
    default:
      return null;
  }
};
