import * as CANNON from "cannon";
import { useState, useEffect, useContext, useRef, createContext, ReactFragment, FC } from "react";
import { useFrame } from "@react-three/fiber";
// interfaces
import { DefaultValuesInterface } from "../interfaces/Settings";

const CannonContext = createContext(null);

type Props = DefaultValuesInterface & { children: ReactFragment }

const CannonContextProvider: FC<Props> = ({ children, gravity }) => {
  const [world] = useState(() => new CANNON.World());
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    // Determines quality and accuracy of simulation
    // Stronger gravity requires more iterations
    world.solver.iterations = 25;
    world.gravity.set(0, 0, gravity);
  }, [world, gravity]);

  // Run world stepper every frame
  useFrame(() => world.step(1 / 25));
  return <CannonContext.Provider value={world} children={children} />;
}

const useCannon = ({ bodyProps: { ...props } }: { bodyProps: { mass: number; } | { mass: number; }; }, fn: { (body: any): void; (body: { addShape: () => void; position: any; }): void; (arg0: CANNON.Body): void; }) => {
  const ref = useRef();
  const world = useContext(CannonContext);
  const [body] = useState(() => new CANNON.Body(props));
  useEffect(() => {
    fn(body);
    world.addBody(body);
    // Remove body on unmount
    return () => world.removeBody(body);
  }, [body]);

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      // ref.current.position.copy(body.position)
      // ref.current.quaternion.copy(body.quaternion)
    }
  });

  return {
    ref,
    body,
  };
}

export { CannonContextProvider, useCannon }