import { FC } from "react";
// cannon
import { Plane } from "cannon";
// context
import { useCannon } from "../context/CannonContext";

type Props = {
  position: [
    x: number,
    y: number,
    z: number
  ],
  bg: string,
}

const Surface: FC<Props> = ({ position, bg }) => {
  const { ref } = useCannon(
    { bodyProps: { mass: 0 } },
    (body: { addShape: (arg0: Plane) => void, position: any }) => {
      body.addShape(new Plane());
      body.position.set(...position);
    }
  );

  return (
    <mesh ref={ref} receiveShadow position={position}>
      <planeGeometry attach="geometry" args={[1000, 1000, 1000, 1000]} />
      <meshPhongMaterial attach="material" color={bg} />
    </mesh>
  );
}

export { Surface }