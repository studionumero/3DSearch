// @ts-nocheck
import { useState, FC } from "react";
// cannon
import * as CANNON from "cannon";
import { useDrag } from "@use-gesture/react";
// three
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// interfaces
import { DefaultValuesInterface } from "../interfaces/Settings";
// context
import { useCannon } from "../context/CannonContext";
// font
import Roboto from "../fonts/Roboto.json";
import ComicNeue from "../fonts/ComicNeue.json";
import Newsreader from "../fonts/Newsreader.json";
import PressStart2P from "../fonts/PressStart2P.json";
import Audiowide from "../fonts/Audiowide.json";

type Props = DefaultValuesInterface & { initialPosition: number[], letter: string }

const Text : FC<Props> = ({ initialPosition, type, fontSize, thickness, bevel, bevelSize, letter, color }) => {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const fontCheck = () => {
    if (type === "Roboto") {
      return Roboto;
    } else if (type === "Press Start") {
      return PressStart2P;
    } else if (type === "Audiowide") {
      return Audiowide;
    } else if (type === "ComicNeue") {
      return ComicNeue;
    } else if (type === "Newsreader") {
      return Newsreader;
    }
  }

  const font = new FontLoader().parse(fontCheck());
  const textOptions = {
    font,
    size: fontSize,
    height: thickness,
    curveSegments: 4,
    bevelEnabled: bevel,
    bevelThickness: bevel ? 0.2 : 0,
    bevelSize: bevel ? bevelSize : 0,
    bevelOffset: bevel ? -0.01 : 0,
    bevelSegments: bevel ? 6 : 0,
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
    body => {
      body.addShape(box, new CANNON.Vec3(center.x, center.y, center.z));
      body.position.set(...position);
    },
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
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <textGeometry attach="geometry" args={[letter, textOptions]} />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}

export default Text