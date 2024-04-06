"use client"

import { Canvas, useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useStore } from "./hooks/useStore";
import { Suspense } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
// Components
import Logo from "./components/logo";
import { Form } from "./components/form";

export default function Home() {
  return (
    <main>
      <Search />
      <Canvas
      shadows
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ position: "absolute" }}
        className="z-0"
      >
        <Light />
        <Suspense>
          <Physics gravity={[0, 0, -9.81]} timeStep="vary">
            <Characters />
            <Plane />
          </Physics>
        </Suspense>
      </Canvas>
    </main>
  )
}

const Search = () => {
  return (
    <div className="absolute h-screen w-screen z-10">
      <div className="flex flex-col 
        w-[300px] sm:w-[400px] md:w-[526px] h-full 
        p-2 mx-auto mt-[-60px]
        justify-center align-center"
      >
        <Logo />
        <Form />
      </div>
    </div>
  )
}

const Characters = () => {
  const { characters, query } = useStore();
  console.log("characters : ", characters, "query : ", query);
  return <>{characters}</>;
}

const Plane = () => {
  const viewport = useThree(state => state.viewport)

  return (
    <RigidBody position={[0, 0, 0]} lockTranslations={true} lockRotations={true} name="plane">
      <Box scale={[viewport.width, viewport.height, 1]} receiveShadow />
    </RigidBody>
  )
}

const Light = () => {
  const intensity = 2.4;

  return (
    <>
      <ambientLight intensity={intensity / 2} castShadow />
      <hemisphereLight
        intensity={intensity / 2}
        position={[0, 30, 15]}
        color="#6E9BA6"
        groundColor="#f08080"
        castShadow
      />
      <directionalLight
        position={[0, 5, 15]}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        intensity={intensity}
      />
    </>
  )
}