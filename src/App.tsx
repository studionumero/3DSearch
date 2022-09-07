// @ts-nocheck
// cannon
import { Provider } from "./context/useCannon";
// pages
import Home from "./pages/Home";
// components
import { Font } from "./components/Text";
import Plane from "./components/Plane";
// three
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
// react
import { useState, useEffect } from "react";
// styles
import "./index.css";

export default function App() {
  const [objects, setObjects] = useState([]);

  const [config, setConfig] = useState([
    {
      textColor: JSON.parse(localStorage.getItem("textColor")), // default #f08080
      bgColor: "#ffffff",
      gravity: JSON.parse(localStorage.getItem("gravity")), // default -9.87
      fontType: JSON.parse(localStorage.getItem("fontType")), // default Roboto
      fontSize: JSON.parse(localStorage.getItem("fontSize")), // default 1
      fontBevel: JSON.parse(localStorage.getItem("fontBevel")), // default true
      fontThickness: JSON.parse(localStorage.getItem("fontThickness")), // default 0.5
      fontBevelSize: JSON.parse(localStorage.getItem("fontBevelSize")), // default 0.1
      searchEngine: JSON.parse(localStorage.getItem("searchEngine")), // default Google
    },
  ]);

  const fontType = JSON.parse(localStorage.getItem("fontType"));
  const fontSize = JSON.parse(localStorage.getItem("fontSize"));
  const fontBevel = JSON.parse(localStorage.getItem("fontBevel"));
  const fontThickness = JSON.parse(localStorage.getItem("fontThickness"));
  const fontBevelSize = JSON.parse(localStorage.getItem("fontBevelSize"));
  const searchEngine = JSON.parse(localStorage.getItem("searchEngine"));
  const gravity = JSON.parse(localStorage.getItem("gravity"));
  const textColor = JSON.parse(localStorage.getItem("textColor"));

  useEffect(() => {
    localStorage.setItem("fontType", JSON.stringify(config[0].fontType));
    localStorage.setItem("fontSize", JSON.stringify(config[0].fontSize));
    localStorage.setItem("fontBevel", JSON.stringify(config[0].fontBevel));
    localStorage.setItem("gravity", JSON.stringify(config[0].gravity));
    localStorage.setItem("textColor", JSON.stringify(config[0].textColor));
    localStorage.setItem(
      "fontThickness",
      JSON.stringify(config[0].fontThickness)
    );
    localStorage.setItem(
      "fontBevelSize",
      JSON.stringify(config[0].fontBevelSize)
    );
    localStorage.setItem(
      "searchEngine",
      JSON.stringify(config[0].searchEngine)
    );
  }, [config]);

  const setTextColor = (value) => {
    if (textColor === null) {
      setConfig([{ ...config[0], textColor: "lightCoral" }]);
      localStorage.setItem("textColor", JSON.stringify("lightCoral"));
    } else {
      setConfig([{ ...config[0], textColor: value }]);
      localStorage.setItem("textColor", JSON.stringify(value));
    }
  };

  const setGravity = (value) => {
    if (gravity === null) {
      setConfig([{ ...config[0], gravity: -0.17 }]);
      localStorage.setItem("gravity", JSON.stringify(0.17));
    } else {
      setConfig([{ ...config[0], gravity: value }]);
      localStorage.setItem("gravity", JSON.stringify(value));
    }
  };

  const setFontBevelSize = (value) => {
    if (fontBevelSize === null) {
      setConfig([{ ...config[0], fontBevelSize: 0.1 }]);
      localStorage.setItem("fontBevelSize", JSON.stringify(0.1));
    } else {
      setConfig([{ ...config[0], fontBevelSize: value }]);
      localStorage.setItem("fontBevelSize", JSON.stringify(value));
    }
  };

  const setFontThickness = (value) => {
    if (fontThickness === null) {
      setConfig([{ ...config[0], fontThickness: 1 }]);
      localStorage.setItem("fontThickness", JSON.stringify(1));
    } else {
      setConfig([{ ...config[0], fontThickness: value }]);
      localStorage.setItem("fontThickness", JSON.stringify(value));
    }
  };

  const setFontBevel = () => {
    if (fontBevel === null) {
      setConfig([{ ...config[0], fontBevel: true }]);
      localStorage.setItem("fontBevel", JSON.stringify(true));
    } else {
      setConfig([{ ...config[0], fontBevel: !fontBevel }]);
      localStorage.setItem("fontBevel", JSON.stringify(!fontBevel));
    }
  };

  const setFontSize = (value) => {
    if (fontSize === null) {
      setConfig([{ ...config[0], fontSize: 1 }]);
      localStorage.setItem("fontSize", JSON.stringify(1));
    } else {
      setConfig([{ ...config[0], fontSize: value }]);
      localStorage.setItem("fontSize", JSON.stringify(value));
    }
  };

  function setFontValue(value) {
    if (localStorage.getItem("fontType") === null || undefined) {
      setConfig([{ ...config[0], fontType: "Roboto" }]);
      localStorage.setItem("fontType", JSON.stringify(Roboto));
    } else {
      setConfig([{ ...config[0], fontType: value }]);
      localStorage.setItem("fontType", JSON.stringify(value));
    }
  }

  const setSEValue = (value) => {
    if (searchEngine === null) {
      setConfig([{ ...config[0], searchEngine: "Google" }]);
      localStorage.setItem("searchEngine", JSON.stringify(Google));
    } else {
      setConfig([{ ...config[0], searchEngine: value }]);
      localStorage.setItem("searchEngine", JSON.stringify(value));
    }
  };

  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([]);
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
          fontBevelSize={fontBevelSize}
          fontBevel={fontBevel}
          fontThickness={fontThickness}
          fontSize={fontSize}
          fontType={fontType}
          textColor={textColor}
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
        setFontValue={setFontValue}
        setSEValue={setSEValue}
        setFontSize={setFontSize}
        setFontBevel={setFontBevel}
        setFontBevelSize={setFontBevelSize}
        setFontThickness={setFontThickness}
        setGravity={setGravity}
        setTextColor={setTextColor}
        fontBevelSize={fontBevelSize}
        fontBevel={fontBevel}
        fontSize={fontSize}
        fontThickness={fontThickness}
        fontType={fontType}
        searchEngine={searchEngine}
        gravity={gravity}
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
      <Provider gravity={gravity}>
        <Objects objects={objects} addObject={undefined} />
        <Plane position={[0, 0, -2.2]} />
      </Provider>
    </>
  );
}

function Objects({ objects, addObject }) {
  return <>{objects}</>;
}
