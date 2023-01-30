import { useState } from "react";
import { App } from "./App";
// context
import { CannonContextProvider } from "./context/CannonContext";
// three
import { Canvas } from "@react-three/fiber";
// components
import { Surface } from "./components/Surface";

const Scene = () => {
  const [objects, setObjects] = useState([]);

  return (
    <Canvas
      shadows
      dpr={[2, 1]}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <App
        objects={objects}
        setObjects={setObjects}
      />
      <ambientLight intensity={0.11} />
      <hemisphereLight
        intensity={0.11}
        position={[0, 30, 15]}
        color="#6E9BA6"
        groundColor="#f08080"
      />
      <directionalLight
        position={[0, 5, 15]}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        intensity={0.49}
      />
      <CannonContextProvider gravity={-5.59}>
        <Objects objects={objects} />
        <Surface position={[0, 0, -2.2]} bg="#6E9BA6" />
      </CannonContextProvider>
    </Canvas>
  );
}

const Objects = ({ objects }: any) => {
  return <>{objects}</>;
}

export { Scene }