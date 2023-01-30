// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as CANNON from "cannon";
// context
import { useCannon } from "../context/CannonContext";

const Plane = ({ position, bg }) => {
  const { ref } = useCannon(
    { bodyProps: { mass: 0 } },
    (body: { addShape; position }) => {
      body.addShape(new CANNON.Plane());
      body.position.set(...position);
    }
  );
  return (
    <mesh ref={ref} receiveShadow position={position}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000, 1000, 1000]} />
      <meshPhongMaterial attach="material" color={bg} />
    </mesh>
  );
}

export { Plane }