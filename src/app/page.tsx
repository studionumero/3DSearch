"use client"

import { Canvas, useThree } from "@react-three/fiber";
import { Box, Html as HTML } from "@react-three/drei";
import { useStore } from "./hooks/useStore";
import { Suspense } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
// Components
import Logo from "./components/logo";
import { Form } from "./components/form";

export default function Home() {
  return (
    <Canvas
      shadows
      dpr={[2, 1]}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <Suspense>
        <Physics>
          <Search />
          <Light />
          <Characters />
          <Plane />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

const Search = () => {
  const { pointer, camera } = useThree();

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col 
        w-[300px] sm:w-[400px] md:w-[526px] h-full 
        p-2 mx-auto mt-[-60px]
        justify-center align-center"
      >
        <Logo />
        <Form pointer={pointer} camera={camera} />
      </main>
    </HTML>
  )
}

const Characters = () => {
  const { characters } = useStore();
  return <>{characters}</>;
}

const Plane = () => {
  return (
    <RigidBody>
      <Box args={[1000, 1000, 1000]} />
    </RigidBody>
  )
}

const Light = () => {
  const { brightness, bg, color }: any = useStore();
  return (
    <>
      <ambientLight intensity={brightness / 2} />
      <hemisphereLight
        intensity={brightness / 2}
        position={[0, 30, 15]}
        color={bg}
        groundColor={color}
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
        intensity={brightness}
      />
    </>
  )
}