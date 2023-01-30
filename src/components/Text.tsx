// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, FC } from "react";
// three
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// cannon
import * as CANNON from "cannon";
import { useDrag } from "@use-gesture/react";
// context
import { useCannon } from "../context/CannonContext";
// fonts
import Roboto from "../fonts/Roboto.json";
// hooks
import { useRandomPos } from "../hooks/useRandomPos";

type Props = { 
  letter: string 
}

const Text: FC<Props> = ({ letter }: string) => {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(useRandomPos());
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const font = new FontLoader().parse(Roboto);

  const textOptions = {
    font,
    size: 1.8,
    height: 0.52,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.22,
    bevelOffset: -0.01,
    bevelSegments: 6,
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
      <meshLambertMaterial attach="material" color="#f08080" />
    </mesh>
  );
}

export { Text }