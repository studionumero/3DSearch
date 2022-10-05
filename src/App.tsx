// pages
import Home from "./pages/Home";
// components
import Text from "./three/Text";
import Plane from "./three/Plane";
// three
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
// react
import { useState, useContext, FC } from "react";
// interfaces
import { SearchInterface } from "./interfaces/Search";
// context
import { SettingContext } from "./context/SettingContext";
import { CannonContextProvider } from "./context/CannonContext";
// nanoid
import { nanoid } from "nanoid";
// styles
import "./index.css";

const App = () => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState("");
  const { state, setData, increment, decrement } = useContext(SettingContext);
  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([]);
    setSearch("");
  };

  const key = (e: { keyCode: number; key: { [s: string]: unknown; } | ArrayLike<unknown>; }) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 90) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      var str = "";
      // Parses event object and returns string
      for (const [p, val] of Object.entries(e.key)) {
        str += `${p}:${val}\n`;
      }
      // Returns letter in array
      var letter = str.split(":").pop().toUpperCase();
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      var Xmax = pos.x * 4;
      var Xmin = pos.x * -4;
      var Ymax = pos.y * 2;
      var Ymin = pos.y * -2;
      var XcoordVal = Math.floor(Math.random() * (Xmax - Xmin + 1)) + Xmin;
      var YcoordVal = Math.floor(Math.random() * (Ymax - Ymin + 1)) + Ymin;
      const initialPosition = [XcoordVal / 4, YcoordVal / 8, 2];

      setObjects([
        ...objects,
        <Text
          letter={letter}
          key={nanoid()}
          bevelSize={state.bevelSize}
          bevel={state.bevel}
          thickness={state.thickness}
          fontSize={state.fontSize}
          type={state.type}
          color={state.color}
          initialPosition={initialPosition}
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
        increment={increment}
        decrement={decrement}
        setData={setData}
        panel={state.panel}
        bevelSize={state.bevelSize}
        bevel={state.bevel}
        thickness={state.thickness}
        fontSize={state.fontSize}
        brightness={state.brightness}
        gravity={state.gravity}
        type={state.type}
        engine={state.engine}
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

const Objects : FC<SearchInterface> = ({ objects }) => {
  return <>{objects}</>;
}

export default App