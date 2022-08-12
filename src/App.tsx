// @ts-nocheck
// cannon
import { Provider } from './context/useCannon';
// pages
import Home from "./pages/Home";
// components
import { Dodecahedron, Text } from "./components/Objects";
import Plane from "./components/Plane";
// three
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
// react
import { useState } from "react"
// styles
import './index.css';

export default function App() {
  const [objects, setObjects] = useState([
    // <DraggableDodecahedron position={[0, 0, 0]} key={Math.random()} />
  ]);

  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([])
  };

  // only uppercase characters and numbers 0-9
  const regex = /^[A-Z0-9]+$/;

  const handleChange = (e) => {
    // get last character of string, convert to uppercase, test against regex
    if (regex.test(e.target.value.toUpperCase().slice(-1)) === true) {
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      const position = [pos.x, pos.y, 2];
      const randomPosition = [Math.random(), Math.random(), 2];

      setObjects([
        ...objects,
        <Dodecahedron
          position={position}
          key={Math.random()}
        />,
        <Text
          key={Math.random()}
          position={randomPosition}
        />
      ]);
    } else {
      return null
    }
  }

  return (
    <>
      <Home
        change={handleChange}
        reset={onReset}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Provider>
        <Objects
          objects={objects}
          addObject={undefined}
        />
        <Plane
          position={[0, 0, -2]}
        />
      </Provider>
    </>
  )
}

function Objects({ objects, addObject }) {
  return <>{objects}</>;
}