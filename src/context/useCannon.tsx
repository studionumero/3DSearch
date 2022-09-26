// @ts-nocheck
import { useState, useEffect, useContext, useRef, createContext } from "react";
// cannon
import * as CANNON from "cannon";
// three
import { useFrame } from "@react-three/fiber";

const context = createContext();
export function Provider({ children, gravity }) {
  const [world] = useState(() => new CANNON.World());
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 20;
    world.gravity.set(0, 0, gravity);
  }, [world, gravity]);

  // Run world stepper every frame
  useFrame(() => world.step(1 / 30));
  return <context.Provider value={world} children={children} />;
}

export function useCannon({ bodyProps: { ...props } }, fn) {
  const ref = useRef();
  const world = useContext(context);
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
