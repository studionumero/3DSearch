// @ts-nocheck
// cannon
import { Provider } from './context/useCannon';
// pages
import Home from "./pages/Home";
// components
import { Dodecahedron, Font } from "./components/Objects";
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
    // <Font position={[0, 0, 0]} key={Math.random()} />
  ]);

  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([])
  };

  function handleKeyDown(event) {
    console.log('User pressed: ', event.key);

    // console.log(message);

    if (event.key === 'Backspace') {
      console.log('Backspace key pressed ✅');
      return true;

    }
  };

  const key = (e) => {

    // create map for keycodes 48 through 90
    //     if (e.keyCode === 65 ) {
    //       console.log('a')
    //     }
    // }

    for (let i = 48; i <= 90; i++) {
      if (e.keyCode === i) {
        console.log(e.key);
        return true;
      }
    }
  }

  // only uppercase characters and numbers 0-9
  const regex = /^[A-Z0-9]+$/;

  const handleChange = (e) => {
    // get last character of string, convert to uppercase, test against regex
    // if (key == true) {
    //   return null;
    // } else
    if (regex.test(e.target.value.toUpperCase().slice(-1)) === true) {
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      const position = [pos.x / 4, pos.y / 8, 2];
      // const randomPosition = [Math.random(), Math.random(), 2];

      setObjects([
        ...objects,
        <Font
          position={position}
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
        change={handleChange}
        handleKeyDown={handleKeyDown}
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
          position={[0, 0, -2]}
        />
      </Provider>
    </>
  )
}

function Objects({ objects, addObject }) {
  return <>{objects}</>;
}