import React from "react";
import ReactDOM from "react-dom/client";
// app
import App from "./App";
// three
import { Canvas } from "@react-three/fiber";
// context
import SettingContextProvider from "./context/settingContext";
// style
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <SettingContextProvider>
        <App />
      </SettingContextProvider>
    </Canvas>
  </React.StrictMode>
);
