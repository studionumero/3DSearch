import { RigidBody, useFixedJoint } from '@react-three/rapier';
import { extend, Object3DNode } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useRandomPosition } from '../hooks/useRandomPosition';
import Roboto from "../Roboto.json";
import { useRef, useState } from 'react';
import * as THREE from "three";
import { PivotControls } from '@react-three/drei';

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

extend({ TextGeometry });

const options = {
  // @ts-ignore
  font: new FontLoader().parse(Roboto),
  color: "#f08080",
  size: 1.0,
  depth: 0.25,
  curveSegments: 2,
  bevelEnabled: true,
  bevelSize: 0.15,
  bevelThickness: 0.2,
  bevelOffset: 0.0,
  bevelSegments: 4,
}

export const Character = ({ letter }) => {
  const position = useRandomPosition();

  return (
    <RigidBody colliders="trimesh" position={position}>
      <mesh castShadow receiveShadow>
        <textGeometry attach="geometry" args={[letter, options]} />
        <meshLambertMaterial attach="material" color={options.color} />
      </mesh>
    </RigidBody>
  )
}


function Movable({ children, ...props }) {
  const position = useRandomPosition();
  const obj = useRef()
  const pointer = useRef()
  const [matrix] = useState(() => new THREE.Matrix4())
  const vec = new THREE.Vector3()
  // A fixed constraint chaining the empty rigid body to the object rigid body
  // @ts-ignore
  useFixedJoint(pointer, obj, [
    [0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0],
    [0, 0, 0, 1]
  ])
  return (
    <group {...props}>
      {/** Pivot controls a matrix, and steers the empty rigid body below */}
      <PivotControls
        matrix={matrix}
        scale={1.75}
        disableRotations
        activeAxes={[true, false, true]}
        depthTest={false}
        // When drag is over snap matrix back to the object
        // @ts-ignore
        onDragEnd={() => matrix.setPosition(vec.copy(obj.current?.translation()))}
        // Get pivot matrix, apply it to the empty RB
        // @ts-ignore
        onDrag={(local) => pointer.current?.setNextKinematicTranslation(vec.setFromMatrixPosition(local))}
      />
      {/** Empty RB is tied to cursor via pivot control above */}
      {/* @ts-ignore */}
      <RigidBody canSleep={false} type="kinematicPosition" ref={pointer} />
      {/** Actual RB is tied to the empty via fixed constraint with CCD */}
      {/* @ts-ignore */}
      <RigidBody ccd canSleep={false} colliders="trimesh" position={position} enabledRotations={[false, false, false]} ref={obj}>
        {children}
      </RigidBody>
    </group>
  )
}