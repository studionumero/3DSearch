import { createContext, useReducer, useEffect } from "react";

const SettingContext = createContext(null);

const defaultValues = {
  type: "Roboto",
  fontSize: 1.8,
  bevel: true,
  engine: "https://www.google.com/search",
  gravity: -5.59,
  color: "#f08080",
  bg: "#6E9BA6",
  thickness: 0.52,
  bevelSize: 0.22,
  brightness: 0.49,
  typeCount: 0, // Default type counter value
  engineCount: 0, // Default engine counter value
  panel: false,
};

// Set localstorage value to defaultValue if no key exists, else set value to localStorage value
const initialState = {
  type: !JSON.parse(localStorage.getItem("type"))
    ? defaultValues.type
    : JSON.parse(localStorage.getItem("type")),
  fontSize: !JSON.parse(localStorage.getItem("size"))
    ? defaultValues.fontSize
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

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  SET: "set",
};

const reducer = (state: { [x: string]: number; }, action: { name: string; type: any; payload?: boolean | number | string; }) => {
  // Verify which value we need to update along with its count
  const isType = action.name.includes("type");
  // Select the proper option in context
  const options = isType ? typeOptions : engineOptions;

  // Increment the count for use in the value and type setting
  const incrementedCount = (state[action.name] + 1) % options.length;

  // Decrement the count for use in the value and type setting
  const decrementedCount = (state[action.name] - 1 + options.length) % options.length;

  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        // Set the new count
        [action.name]: incrementedCount,
        // Set the new color or shape type
        [isType ? "type" : "engine"]: options[incrementedCount].value,
      };
    case ACTIONS.DECREMENT:
      return {
        ...state,
        // Set the new count
        [action.name]: decrementedCount,
        // Set the new color or shape type
        [isType ? "type" : "engine"]: options[decrementedCount].value,
      };
    case ACTIONS.SET:
      return {
        ...state,
        // Set the new count
        [action.name]: action.payload
      };
    default:
      return initialState;
  }
}

const SettingContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const decrement = (props: { name: string; }) => {
    dispatch({
      type: ACTIONS.DECREMENT,
      name: props.name,
    });
  };

  const increment = (props: { name: string; }) => {
    dispatch({
      type: ACTIONS.INCREMENT,
      name: props.name,
    });
  };

  const setData = (props: { payload: boolean | number | string; name: string; }) => {
    dispatch({
      type: ACTIONS.SET,
      payload: props.payload,
      name: props.name,
    });
  };

  // Update localStorage on state change
  useEffect(() => {
    localStorage.setItem("type", JSON.stringify(state.type));
    localStorage.setItem("size", JSON.stringify(state.fontSize));
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
  }, [state]);

  return (
    <SettingContext.Provider value={{ state, setData, increment, decrement }}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContextProvider

export { SettingContext, ACTIONS }