// @ts-nocheck
import { createContext, useReducer, useEffect } from "react";

export const SettingContext = createContext();

const defaultValues = {
  type: "Roboto",
  size: 2.4,
  bevel: true,
  engine: "https://www.google.com/search",
  gravity: -5.59,
  color: "#D2B48C",
  bg: "#6E9BA6",
  thickness: 0.52,
  bevelSize: 0.22,
  brightness: 0.49,
  typeCount: 0,
  engineCount: 0,
  panel: false,
};

// if no key exists in localStorage, set value to defaultValue, else set value to localStorage value
const initialState = {
  type: !JSON.parse(localStorage.getItem("type"))
    ? defaultValues.type
    : JSON.parse(localStorage.getItem("type")),
  size: !JSON.parse(localStorage.getItem("size"))
    ? defaultValues.size
    : JSON.parse(localStorage.getItem("size")),
  bevel: !JSON.parse(localStorage.getItem("bevel"))
    ? defaultValues.bevel
    : JSON.parse(localStorage.getItem("bevel")),
  engine: !JSON.parse(localStorage.getItem("engine"))
    ? defaultValues.engine
    : JSON.parse(localStorage.getItem("engine")),
  gravity: !JSON.parse(localStorage.getItem("gravity"))
    ? defaultValues.gravity
    : JSON.parse(localStorage.getItem("gravity")),
  color: !JSON.parse(localStorage.getItem("color"))
    ? defaultValues.color
    : JSON.parse(localStorage.getItem("color")),
  bg: !JSON.parse(localStorage.getItem("bg"))
    ? defaultValues.bg
    : JSON.parse(localStorage.getItem("bg")),
  thickness: !JSON.parse(localStorage.getItem("thickness"))
    ? defaultValues.thickness
    : JSON.parse(localStorage.getItem("thickness")),
  bevelSize: !JSON.parse(localStorage.getItem("bevelSize"))
    ? defaultValues.bevelSize
    : JSON.parse(localStorage.getItem("bevelSize")),
  brightness: !JSON.parse(localStorage.getItem("brightness"))
    ? defaultValues.brightness
    : JSON.parse(localStorage.getItem("brightness")),
  typeCount: !JSON.parse(localStorage.getItem("typeCount"))
    ? defaultValues.typeCount
    : JSON.parse(localStorage.getItem("typeCount")),
  engineCount: !JSON.parse(localStorage.getItem("engineCount"))
    ? defaultValues.engineCount
    : JSON.parse(localStorage.getItem("engineCount")),
};

const typeOptions = [
  { id: 0, value: "Roboto" },
  { id: 1, value: "Press Start" },
  { id: 2, value: "Audiowide" },
  { id: 3, value: "ComicNeue" },
  { id: 4, value: "Newsreader" },
];

const engineOptions = [
  { id: 0, value: "https://www.google.com/search" },
  { id: 1, value: "https://www.bing.com/search" },
  { id: 2, value: "https://search.yahoo.com/search" },
  { id: 3, value: "https://duckduckgo.com/" },
];

export const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  SET: "set",
};

function reducer(state, action) {
  // Verify which value we need to update along with its count
  const isType = action.name.includes("type");
  // Select the proper option in context
  const options = isType ? typeOptions : engineOptions;

  switch (action.type) {
    case ACTIONS.INCREMENT:
      // Increment the count for use in the value and type setting
      const incrementedCount = (state[action.name] + 1) % options.length;
      return {
        ...state,
        // Set the new count
        [action.name]: incrementedCount,
        // Set the new color or shape type
        [isType ? "type" : "engine"]: options[incrementedCount].value,
      };
    case ACTIONS.DECREMENT:
      // Decrement the count for use in the value and type setting
      const decrementedCount =
        (state[action.name] - 1 + options.length) % options.length;
      return {
        ...state,
        // Set the new count
        [action.name]: decrementedCount,
        // Set the new color or shape type
        [isType ? "type" : "engine"]: options[decrementedCount].value,
      };
    case ACTIONS.SET:
      return { ...state, [action.name]: action.payload };
    default:
      return initialState;
  }
}

export default function SettingContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Payload only contains name of the value
  const decrement = props => {
    dispatch({
      type: ACTIONS.DECREMENT,
      name: props.name,
    });
  };
  const increment = props => {
    dispatch({
      type: ACTIONS.INCREMENT,
      name: props.name,
    });
  };

  const setData = props => {
    dispatch({
      type: ACTIONS.SET,
      payload: props.payload,
      name: props.name,
    });
  };

  useEffect(() => {
    localStorage.setItem("type", JSON.stringify(state.type));
    localStorage.setItem("size", JSON.stringify(state.size));
    localStorage.setItem("bevel", JSON.stringify(state.bevel));
    localStorage.setItem("engine", JSON.stringify(state.engine));
    localStorage.setItem("gravity", JSON.stringify(state.gravity));
    localStorage.setItem("color", JSON.stringify(state.color));
    localStorage.setItem("bg", JSON.stringify(state.bg));
    localStorage.setItem("thickness", JSON.stringify(state.thickness));
    localStorage.setItem("bevelSize", JSON.stringify(state.bevelSize));
    localStorage.setItem("brightness", JSON.stringify(state.brightness));
    localStorage.setItem("typeCount", JSON.stringify(state.typeCount));
    localStorage.setItem("engineCount", JSON.stringify(state.engineCount));
  }, [
    state.type,
    state.size,
    state.bevel,
    state.engine,
    state.gravity,
    state.color,
    state.bg,
    state.thickness,
    state.bevelSize,
    state.brightness,
    state.typeCount,
    state.engineCount,
  ]);

  return (
    <SettingContext.Provider value={{ state, setData, increment, decrement }}>
      {children}
    </SettingContext.Provider>
  );
}
