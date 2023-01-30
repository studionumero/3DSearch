import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Scene } from "./Scene";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Scene />
  </React.StrictMode>
);
