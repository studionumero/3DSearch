import { useState, useContext, FC } from "react";
// context
import { SettingContext } from "./context/SettingContext";
import { CannonContextProvider } from "./context/CannonContext";
// interfaces
import { SearchInterface } from "./interfaces/Search";
// pages
import Home from "./pages/Home";
// three
import Plane from "./three/Plane";
import { useThree } from "@react-three/fiber";
// hooks
import { useKeyEvent } from "./hooks/useKeyEvent";

const App = () => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState("");
  const { state } = useContext(SettingContext);
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
      <ambientLight intensity={state.brightness / 2} />
      <hemisphereLight
        intensity={state.brightness / 2}
        position={[0, 30, 15]}
        color={state.bg}
        groundColor={state.color}
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
        intensity={state.brightness}
      />
      <CannonContextProvider gravity={state.gravity}>
        <Objects objects={objects} />
        <Plane position={[0, 0, -2.2]} bg={state.bg} />
      </CannonContextProvider>
    </>
  );
}

const Objects: FC<SearchInterface> = ({ objects }) => {
  return <>{objects}</>;
}

export default App