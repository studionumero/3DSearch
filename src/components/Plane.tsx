// @ts-nocheck
// cannon
import * as CANNON from "cannon";
import { useCannon } from '../context/useCannon';

export default function Plane({ position }) {
  const { ref } = useCannon({ bodyProps: { mass: 0 } }, (body: { addShape; position; }) => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow position={position}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#6E9BA6" />
    </mesh>
  )
}
