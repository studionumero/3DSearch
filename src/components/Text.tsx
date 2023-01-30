
import { useState } from "react";
// three
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// cannon
import { Box, Vec3 } from "cannon";
// context
import { useCannon } from "../context/CannonContext";
// fonts
import Roboto from "../fonts/Roboto.json";
// hooks
import { useRandomPos } from "../hooks/useRandomPos";
import { useMesh } from "../hooks/useMesh";
import { useGeometry } from "../hooks/useGeometry";

type Position = [x: number, y: number, z: number];
type Quaternion = [x: number, y: number, z: number, w: number];

const Text = ({ letter }: string | any) => {
  const [position, setPosition] = useState(useRandomPos());
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);

  const config = {
    font: new FontLoader().parse(Roboto),
    size: 1.8,
    height: 0.52,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.22,
    bevelOffset: -0.01,
    bevelSegments: 6,
  };

  const mesh = useMesh(letter, config);

  const box = new Box(
    new Vec3().copy(mesh.size as any as Vec3).scale(0.5)
  );

  const { center } = mesh.mesh.geometry.boundingSphere;

  const { ref, body } = useCannon(
    { bodyProps: { mass: 100 } },
    body => {
      body.addShape(box, new Vec3(center.x, center.y, center.z));
      body.position.set(...position);
    },
  );

  useGeometry(body, position, setPosition, quaternion, setQuaternion);

  return (
    <mesh
      ref={ref}
      castShadow
      position={position as Position}
      quaternion={quaternion as Quaternion}
    >
      {/* @ts-ignore */}
      <textGeometry attach="geometry" args={[letter, config]} />
      <meshLambertMaterial attach="material" color="#f08080" />
    </mesh>
  );
}

export { Text }