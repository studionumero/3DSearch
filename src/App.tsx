import { useState, FC } from "react";
// context
import { CannonContextProvider } from "./context/CannonContext";
// interfaces
import { SearchInterface } from "./interfaces/Search";
// pages
import Home from "./pages/Home";
// three
import Plane from "./components/Plane";
import { useThree } from "@react-three/fiber";
// hooks
import { useKeyEvent } from "./hooks/useKeyEvent";

const App = () => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState("");

  const { mouse, camera } = useThree();
  
  const onReset = () => {
    setObjects([]);
    setSearch("");
  };

  return (
    <>
      <Home
        reset={onReset}
        useKey={(e) => useKeyEvent({ e, objects, setObjects, mouse, camera })}
        search={search}
        setSearch={setSearch}
        objects={objects}
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
        <Plane position={[0, 0, -2.2]} bg="#6E9BA6" />
      </CannonContextProvider>
    </>
  );
}

const Objects: FC<SearchInterface> = ({ objects }) => {
  return <>{objects}</>;
}

export { App }