// @ts-nocheck
// cannon
import { Provider } from "./context/useCannon";
// pages
import Home from "./pages/Home";
// components
import { Font } from "./three/Text";
import Plane from "./three/Plane";
// three
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
// react
import { useState, useContext } from "react";
// context
import { SettingContext } from "./context/settingContext";
// styles
import "./index.css";

export default function App() {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState("");
  const { state, addData } = useContext(SettingContext);
  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([]);
    setSearch("");
  };

  const key = (e) => {
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
      var keyVal = str.split(":").pop().toUpperCase();
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
      const position = [XcoordVal / 4, YcoordVal / 8, 2];

      setObjects([
        ...objects,
        <Font
          position={position}
          letter={keyVal}
          key={Math.random()}
          bevelSize={state.bevelSize}
          bevel={state.bevel}
          thickness={state.thickness}
          fontSize={state.size}
          type={state.type}
          color={state.color}
        />,
      ]);
    } else {
      return null;
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
        bevelSize={state.bevelSize}
        bevel={state.bevel}
        thickness={state.thickness}
        size={state.size}
        brightness={state.brightness}
        gravity={state.gravity}
        type={state.type}
        color={state.color}
        engine={state.engine}
        bg={state.bg}
        addData={addData}
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
      <Provider gravity={state.gravity}>
        <Objects objects={objects} />
        <Plane position={[0, 0, -2.2]} bgColor={state.bg} />
      </Provider>
    </>
  );
}

function Objects({ objects }) {
  return <>{objects}</>;
}
