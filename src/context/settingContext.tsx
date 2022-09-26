// @ts-nocheck
import { createContext, useReducer, useEffect } from "react";

export const SettingContext = createContext();

const values = {
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
};

const initialState = {
  type: !JSON.parse(localStorage.getItem("type"))
    ? values.type
    : JSON.parse(localStorage.getItem("type")),
  size: !JSON.parse(localStorage.getItem("size"))
    ? values.size
    : JSON.parse(localStorage.getItem("size")),
  bevel: !JSON.parse(localStorage.getItem("bevel"))
    ? values.bevel
    : JSON.parse(localStorage.getItem("bevel")),
  engine: !JSON.parse(localStorage.getItem("engine"))
    ? values.engine
    : JSON.parse(localStorage.getItem("engine")),
  gravity: !JSON.parse(localStorage.getItem("gravity"))
    ? values.gravity
    : JSON.parse(localStorage.getItem("gravity")),
  color: !JSON.parse(localStorage.getItem("color"))
    ? values.color
    : JSON.parse(localStorage.getItem("color")),
  bg: !JSON.parse(localStorage.getItem("bg"))
    ? values.bg
    : JSON.parse(localStorage.getItem("bg")),
  thickness: !JSON.parse(localStorage.getItem("thickness"))
    ? values.thickness
    : JSON.parse(localStorage.getItem("thickness")),
  bevelSize: !JSON.parse(localStorage.getItem("bevelSize"))
    ? values.bevelSize
    : JSON.parse(localStorage.getItem("bevelSize")),
  brightness: !JSON.parse(localStorage.getItem("brightness"))
    ? values.brightness
    : JSON.parse(localStorage.getItem("brightness")),
};

export const ACTIONS = {
  SET_TYPE: "set-type",
  SET_SIZE: "set-size",
  SET_BEVEL: "set-bevel",
  SET_ENGINE: "set-engine",
  SET_GRAVITY: "set-gravity",
  SET_COLOR: "set-color",
  SET_BG: "set-bg",
  SET_THICKNESS: "set-thickness",
  SET_BEVELSIZE: "set-bevelsize",
  SET_BRIGHTNESS: "set-brightness",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TYPE:
      return { ...state, type: action.payload };
    case ACTIONS.SET_SIZE:
      return { ...state, size: action.payload };
    case ACTIONS.SET_BEVEL:
      return { ...state, bevel: action.payload };
    case ACTIONS.SET_ENGINE:
      return { ...state, engine: action.payload };
    case ACTIONS.SET_GRAVITY:
      return { ...state, gravity: action.payload };
    case ACTIONS.SET_COLOR:
      return { ...state, color: action.payload };
    case ACTIONS.SET_BG:
      return { ...state, bg: action.payload };
    case ACTIONS.SET_THICKNESS:
      return { ...state, thickness: action.payload };
    case ACTIONS.SET_BEVELSIZE:
      return { ...state, bevelSize: action.payload };
    case ACTIONS.SET_BRIGHTNESS:
      return { ...state, brightness: action.payload };
    default:
      return initialState;
  }
}

export default function SettingContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addData = (props) => {
    dispatch({
      type: props.action,
      payload: props.payload,
    });
    localStorage.setItem(props.name, JSON.stringify(props.payload));
  };

  useEffect(() => {
    if (!localStorage.getItem("type")) {
      localStorage.setItem("type", JSON.stringify(values.type));
    }
    if (!localStorage.getItem("size")) {
      localStorage.setItem("size", JSON.stringify(values.size));
    }
    if (!localStorage.getItem("bevel")) {
      localStorage.setItem("bevel", JSON.stringify(values.bevel));
    }
    if (!localStorage.getItem("engine")) {
      localStorage.setItem("engine", JSON.stringify(values.engine));
    }
    if (!localStorage.getItem("gravity")) {
      localStorage.setItem("gravity", JSON.stringify(values.gravity));
    }
    if (!localStorage.getItem("color")) {
      localStorage.setItem("color", JSON.stringify(values.color));
    }
    if (!localStorage.getItem("bg")) {
      localStorage.setItem("bg", JSON.stringify(values.bg));
    }
    if (!localStorage.getItem("thickness")) {
      localStorage.setItem("thickness", JSON.stringify(values.thickness));
    }
    if (!localStorage.getItem("bevelSize")) {
      localStorage.setItem("bevelSize", JSON.stringify(values.bevelSize));
    }
    if (!localStorage.getItem("brightness")) {
      localStorage.setItem("brightness", JSON.stringify(values.brightness));
    }
  }, []);

  return (
    <SettingContext.Provider value={{ state: state, addData: addData }}>
      {children}
    </SettingContext.Provider>
  );
}
