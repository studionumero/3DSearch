// @ts-nocheck
// cannon
import * as CANNON from "cannon";
import { useCannon } from '../context/useCannon';
import { useDrag } from "@use-gesture/react";
// three
import { useThree, useFrame, extend } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// react
import { useState } from "react"
// font
import Roboto from './Roboto.json'

export function Font({ position: initialPosition }) {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const { ref, body } = useCannon({ bodyProps: { mass: 100000 } }, (body: { addShape: (arg0: CANNON.Box) => void; position: { set: (arg0: any) => void; }; }) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position);
  }, []);

  const bind = useDrag(({ offset: [,], xy: [x, y], first, last }) => {
    if (first) {
      body.mass = 0;
      body.updateMassProperties();
    } else if (last) {
      body.mass = 10000;
      body.updateMassProperties();
    }
    body.position.set((x - size.width / 2) / aspect, -(y - size.height / 2) / aspect, -0.7);
  }, { pointerEvents: true });

  useFrame(() => {
    const deltaX = Math.abs(body.position.x - position[0]);
    const deltaY = Math.abs(body.position.y - position[1]);
    const deltaZ = Math.abs(body.position.z - position[2]);
    if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
      setPosition(body.position.clone().toArray());
    }
    const bodyQuaternion = body.quaternion.toArray();
    const quaternionDelta = bodyQuaternion.map((n, idx) => Math.abs(n - quaternion[idx]))
      .reduce((acc, curr) => acc + curr);
    if (quaternionDelta > 0.01) {
      setQuaternion(body.quaternion.toArray());
    }
  });

  const font = new FontLoader().parse(Roboto);
  // configure font geometry
  const textOptions = {
    font,
    size: 1,
    height: 0,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.2,
    bevelOffset: 0,
    bevelSegments: 5
  };
  // extend TextGeometry to THREE
  extend({ TextGeometry })

  return (
    <mesh ref={ref} castShadow position={position} quaternion={quaternion} {...bind()}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <textGeometry attach='geometry' args={['A', textOptions]} />
      <meshLambertMaterial attach='material' color="hotpink" />
    </mesh>
  );
}

export function Dodecahedron({ position: initialPosition }) {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const { ref, body } = useCannon({ bodyProps: { mass: 100000 } }, (body: { addShape: (arg0: CANNON.Box) => void; position: { set: (arg0: any) => void; }; }) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position);
  }, []);

  const bind = useDrag(({ offset: [,], xy: [x, y], first, last }) => {
    if (first) {
      body.mass = 0;
      body.updateMassProperties();
    } else if (last) {
      body.mass = 10000;
      body.updateMassProperties();
    }
    body.position.set((x - size.width / 2) / aspect, -(y - size.height / 2) / aspect, -0.7);
  }, { pointerEvents: true });

  useFrame(() => {
    // Sync cannon body position with three js
    const deltaX = Math.abs(body.position.x - position[0]);
    const deltaY = Math.abs(body.position.y - position[1]);
    const deltaZ = Math.abs(body.position.z - position[2]);
    if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
      setPosition(body.position.clone().toArray());
    }
    const bodyQuaternion = body.quaternion.toArray();
    const quaternionDelta = bodyQuaternion.map((n, idx) => Math.abs(n - quaternion[idx]))
      .reduce((acc, curr) => acc + curr);
    if (quaternionDelta > 0.01) {
      setQuaternion(body.quaternion.toArray());
    }
  });
  return (
    <mesh ref={ref} castShadow position={position} quaternion={quaternion} {...bind()}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <dodecahedronBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}