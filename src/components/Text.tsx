// @ts-nocheck
// cannon
import * as CANNON from "cannon";
import * as THREE from "three";
import { useCannon } from "../context/useCannon";
import { useDrag } from "@use-gesture/react";
// three
import { useThree, useFrame, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// react
import { useState } from "react";
// font
import Roboto from "./fonts/Roboto.json";
import ComicNeue from "./fonts/ComicNeue.json";
import Newsreader from "./fonts/Newsreader.json";

export function Font({
  fontType,
  fontBevel,
  fontBevelSize,
  fontThickness,
  fontSize,
  letter,
  textColor,
  position: initialPosition,
}) {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  function fontCheck() {
    if (fontType === "Roboto") {
      return Roboto;
    } else if (fontType === "ComicNeue") {
      return ComicNeue;
    } else if (fontType === "Newsreader") {
      return Newsreader;
    }
  }

  function bevelThickness() {
    if (fontBevel === true) {
      return 0.2;
    } else return 0;
  }

  function bevelSize() {
    if (fontBevel === true) {
      return fontBevelSize;
    } else return 0;
  }

  function bevelOffset() {
    if (fontBevel === true) {
      return -0.01;
    } else return 0;
  }

  function bevelSegments() {
    if (fontBevel === true) {
      return 6;
    } else return 0;
  }

  const font = new FontLoader().parse(fontCheck());

  const textOptions = {
    font,
    size: fontSize,
    height: fontThickness,
    curveSegments: 4,
    bevelEnabled: fontBevel,
    bevelThickness: bevelThickness(),
    bevelSize: bevelSize(),
    bevelOffset: bevelOffset(),
    bevelSegments: bevelSegments(),
  };

  const letterGeometry = new TextGeometry(letter, textOptions);

  letterGeometry.computeBoundingSphere();
  letterGeometry.computeBoundingBox();

  const letterMaterial = new THREE.MeshLambertMaterial();
  const letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
  letterMesh.size = letterMesh.geometry.boundingBox.getSize(
    new THREE.Vector3()
  );

  const box = new CANNON.Box(
    new CANNON.Vec3().copy(letterMesh.size).scale(0.5)
  );

  const { center } = letterMesh.geometry.boundingSphere;

  const { ref, body } = useCannon(
    { bodyProps: { mass: 100 } },
    (body) => {
      body.addShape(box, new CANNON.Vec3(center.x, center.y, center.z));
      body.position.set(...position);
    },
    []
  );

  const bind = useDrag(
    ({ offset: [,], xy: [x, y], first, last }) => {
      if (first) {
        body.mass = 0;
        body.updateMassProperties();
      } else if (last) {
        body.mass = 10000;
        body.updateMassProperties();
      }
      body.position.set(
        (x - size.width / 2) / aspect,
        -(y - size.height / 2) / aspect,
        -0.7
      );
    },
    { pointerEvents: true }
  );

  useFrame(() => {
    const deltaX = Math.abs(body.position.x - position[0]);
    const deltaY = Math.abs(body.position.y - position[1]);
    const deltaZ = Math.abs(body.position.z - position[2]);
    if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
      setPosition(body.position.clone().toArray());
    }
    const bodyQuaternion = body.quaternion.toArray();
    const quaternionDelta = bodyQuaternion
      .map((n, idx) => Math.abs(n - quaternion[idx]))
      .reduce((acc, curr) => acc + curr);
    if (quaternionDelta > 0.01) {
      setQuaternion(body.quaternion.toArray());
    }
  });

  // extend TextGeometry to THREE
  extend({ TextGeometry });

  return (
    <mesh
      ref={ref}
      castShadow
      position={position}
      quaternion={quaternion}
      {...bind()}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <textGeometry attach="geometry" args={[letter, textOptions]} />
      <meshLambertMaterial attach="material" color={textColor} />
    </mesh>
  );
}
