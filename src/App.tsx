// @ts-nocheck
// cannon
import { Provider } from './context/useCannon';
// pages
import Home from "./pages/Home";
// components
import { Font } from "./components/Text";
import Plane from "./components/Plane";
// three
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
// react
import { useState, useEffect } from "react"
// styles
import './index.css';

export default function App() {
  const [objects, setObjects] = useState([]);

  const [config, setConfig] = useState([{
    textColor: "rgb(100, 200, 30)",
    fontSize: JSON.parse(localStorage.getItem('fontSize')), // default 1
    bgColor: "#ffffff",
    gravity: "-9.87",
    fontType: JSON.parse(localStorage.getItem('fontType')), // default Roboto
    searchEngine: JSON.parse(localStorage.getItem('searchEngine')) // default Google
  }]);

  useEffect(() => {
    localStorage.setItem('fontType', JSON.stringify(config[0].fontType));
    localStorage.setItem('fontSize', JSON.stringify(config[0].fontSize));
    localStorage.setItem('searchEngine', JSON.stringify(config[0].searchEngine));
  }, [config[0]]);

  const setFontSize = (e) => {
    setConfig([{...config[0], fontSize: e.target.value}])
    localStorage.setItem('fontSize', JSON.stringify(e.target.value));
  };

  const setFontValue = (e) => {
    setConfig([{...config[0], fontType: e.target.value}])
    localStorage.setItem('fontType', JSON.stringify(e.target.value));
  };

  const setSEValue = (e) => {
    setConfig([{...config[0], searchEngine: e.target.value}])
    localStorage.setItem('searchEngine', JSON.stringify(e.target.value));
  };

  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([])
  };

  const key = (e) => {
    if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      var str = '';
      // Parses event object and returns string
      for (const [p, val] of Object.entries(e.key)) {
        str += `${p}:${val}\n`;
      }
      // Returns letter in array
      var keyVal = str.split(":").pop().toUpperCase();
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = - camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      var Xmax = pos.x * 4;
      var Xmin = pos.x * -4;
      var Ymax = pos.y * 2;
      var Ymin = pos.y * -2;
      var XcoordVal = Math.floor(Math.random() * (Xmax - Xmin + 1) ) + Xmin;
      var YcoordVal = Math.floor(Math.random() * (Ymax - Ymin + 1) ) + Ymin;
      const position = [XcoordVal / 4, YcoordVal / 8, 2];

      setObjects([
        ...objects,
        <Font
          position={position}
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
        setFontValue={setFontValue}
        setSEValue={setSEValue}
        setFontSize={setFontSize}
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
      <Provider gravity={config.gravity}>
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