import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { Canvas } from "@react-three/fiber";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas
      shadows
      // device pixel ratio [width, height]
      dpr={[2, 1]}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
