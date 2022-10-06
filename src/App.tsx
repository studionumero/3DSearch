import * as THREE from "three";
import { useState, useContext, FC } from "react";
import { useThree } from "@react-three/fiber";
import { nanoid } from "nanoid";
// components
import Nav from "./components/Nav";
// context
import { SettingContext } from "./context/SettingContext";
import { CannonContextProvider } from "./context/CannonContext";
// interfaces
import { SearchInterface } from "./interfaces/Search";
// pages
import Home from "./pages/Home";
// three
import Plane from "./three/Plane";
import Text from "./three/Text";
// styles
import "./index.css";

const App = () => {
  // Letter state
  const [objects, setObjects] = useState([]);
  // Search input state
  const [search, setSearch] = useState("");
  const { state, setData, increment, decrement } = useContext(SettingContext);
  const { mouse, camera } = useThree();

  const onReset = () => {
    // Remove objects 
    setObjects([]);
    // Set search empty
    setSearch("");
  };

  const key = (e: { keyCode: number; key: string }) => {
    if (
      // 0 through 9 and a through z
      (e.keyCode >= 48 && e.keyCode <= 90) ||
      // numpad 0 through numpad 9
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      const letter = e.key.toUpperCase();
      // Randomize letter position
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      const Xmax = pos.x * 4;
      const Xmin = pos.x * -4;
      const Ymax = pos.y * 2;
      const Ymin = pos.y * -2;
      const XcoordVal = Math.floor(Math.random() * (Xmax - Xmin + 1)) + Xmin;
      const YcoordVal = Math.floor(Math.random() * (Ymax - Ymin + 1)) + Ymin;
      const initialPosition = [XcoordVal / 4, YcoordVal / 8, 2];

      setObjects([
        ...objects,
        <Text
          key={nanoid()}
          letter={letter}
          initialPosition={initialPosition}
          bevelSize={state.bevelSize}
          bevel={state.bevel}
          thickness={state.thickness}
          fontSize={state.fontSize}
          type={state.type}
          color={state.color}
        />,
      ]);
    } else {
      return;
    }
  };
  return (
    <>
      <Home
        reset={onReset}
        myKey={key}
        search={search}
        setSearch={setSearch}
        objects={objects}
        engine={state.engine}
      >
        <Nav
          increment={increment}
          decrement={decrement}
          setData={setData}
          bevelSize={state.bevelSize}
          bevel={state.bevel}
          thickness={state.thickness}
          fontSize={state.fontSize}
          brightness={state.brightness}
          gravity={state.gravity}
          type={state.type}
          engine={state.engine}
          panel={state.panel}
        />
      </Home>
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

const Objects : FC<SearchInterface> = ({ objects }) => {
  return <>{objects}</>;
}

export default App