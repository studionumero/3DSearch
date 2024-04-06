import { RigidBody } from '@react-three/rapier';
import { useDrag } from "@use-gesture/react";
import { extend, Object3DNode } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useStore } from "../hooks/useStore";
import Roboto from "../Roboto.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

extend({ TextGeometry });

export const Character = ({ initialPosition, letter }) => {
  const { size, height, bevel, bevelSize, color } = useStore();

  // @ts-ignore
  const font = new FontLoader().parse(Roboto);
  const textOptions = {
    font,
    size,
    height,
    curveSegments: 4,
    bevelEnabled: bevel,
    bevelThickness: bevel ? 0.2 : 0,
    bevelSize: bevel ? bevelSize : 0,
    bevelOffset: bevel ? -0.01 : 0,
    bevelSegments: bevel ? 6 : 0,
  };

  return (
    <RigidBody colliders="trimesh" position={initialPosition} >
      <mesh>
        <textGeometry attach="geometry" args={[letter, textOptions]} />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
    </RigidBody>
  )
}
