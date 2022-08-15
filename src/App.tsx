// @ts-nocheck
// cannon
import { Provider } from './context/useCannon';
// pages
import Home from "./pages/Home";
// components
import { Font } from "./components/Objects";
import Plane from "./components/Plane";
// three
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
// react
import { useState } from "react"
// styles
import './index.css';

export default function App() {
  const [objects, setObjects] = useState([]);
  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([])
  };

  const key = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 90) {
      var str = '';
      for (const [p, val] of Object.entries(e.key)) {
        str += `${p}:${val}\n`;
      }
      console.log(str.split(":").pop());
      var keyVal = str.split(":").pop().toUpperCase();
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      const position = [pos.x / 4, pos.y / 8, 2];
      const randomPosition = [Math.random(), Math.random(), 2];

      // working: A, X, Y, Z, M, N, H, L, I, T, F, V, W, E, K
      // working: 7, 4, 1

      // not working: B, R, Q, U, O, P, S, D, G, J, C, B
      // not working: 2, 3, 5, 6, 8, 9, 0

      setObjects([
        ...objects,
        <Font
          position={randomPosition}
          letter={keyVal}
          key={Math.random()}
        />
      ]);
    } else {
      return null
    }
  }
  return (
    <>
      <Home
        reset={onReset}
        myKey={key}
      />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[0, 5, 15]}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Provider>
        <Objects
          objects={objects}
          addObject={undefined}
        />
        <Plane
          position={[0, 0, -2.2]}
        />
      </Provider>
    </>
  )
}

function Objects({ objects, addObject }) {
  return <>{objects}</>;
}