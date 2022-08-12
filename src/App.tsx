// @ts-nocheck

import { useState, useEffect, ChangeEventHandler } from "react"
import { useDrag } from "@use-gesture/react";
import { useForm } from 'react-hook-form';

// cannon
import * as CANNON from "cannon";
import { useCannon, Provider } from './useCannon';

// react-three
import * as THREE from 'three';
import { Html as HTML } from "@react-three/drei";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";

// styles
import './index.css';

// extend({ TextGeometry })

// function Text({ position: initialPosition }) {
//   // const { size, viewport } = useThree();
//   // const [position, setPosition] = useState(initialPosition);
//   // const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
//   // const aspect = size.width / viewport.width;

//   // const { ref, body } = useCannon({ bodyProps: { mass: 100000 } }, body => {
//   //   body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
//   //   body.position.set(...position);
//   // }, []);

//   // const bind = useDrag(({ offset: [,], xy: [x, y], first, last }) => {
//   //   if (first) {
//   //     body.mass = 0;
//   //     body.updateMassProperties();
//   //   } else if (last) {
//   //     body.mass = 10000;
//   //     body.updateMassProperties();
//   //   }
//   //   body.position.set((x - size.width / 2) / aspect, -(y - size.height / 2) / aspect, -0.7);
//   // }, { pointerEvents: true });

//   // useFrame(() => {
//   //   // Sync cannon body position with three js
//   //   const deltaX = Math.abs(body.position.x - position[0]);
//   //   const deltaY = Math.abs(body.position.y - position[1]);
//   //   const deltaZ = Math.abs(body.position.z - position[2]);
//   //   if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
//   //     setPosition(body.position.clone().toArray());
//   //   }
//   //   const bodyQuaternion = body.quaternion.toArray();
//   //   const quaternionDelta = bodyQuaternion.map((n, idx) => Math.abs(n - quaternion[idx]))
//   //     .reduce((acc, curr) => acc + curr);
//   //   if (quaternionDelta > 0.01) {
//   //     setQuaternion(body.quaternion.toArray());
//   //   }
//   // });

//   const font = new FontLoader().parse('/fonts/Roboto.json');

//   return (
//     <mesh
//     >
//       {/* <mesh ref={ref} castShadow position={position} quaternion={quaternion} {...bind()}
//       onClick={e => {
//         e.stopPropagation();
//       }}
//     ></mesh> */}
//       <textGeometry attach="geometry" args={['text', { font, size: 1, height: 1 }]} />
//       <meshPhysicalMaterial attach='material' color={'hotpink'} />
//     </mesh>
//   )
// }

function Box({ position: initialPosition }) {
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
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

function DraggableDodecahedron({ position: initialPosition }) {
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

function Plane({ position }) {
  const { ref } = useCannon({ bodyProps: { mass: 0 } }, (body: { addShape: (arg0: CANNON.Plane) => void; position: { set: (arg0: any) => void; }; }) => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow position={position}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#add8e6" />
    </mesh>
  )
}

function Objects({ objects, addObject }) {
  return <>{objects}</>;
}

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableRotate = false;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;
      controls.update();
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const Scene = () => {
  const [objects, setObjects] = useState([
    // <DraggableDodecahedron position={[0, 0, 0]} key={Math.random()} />
  ]);

  const { mouse, camera } = useThree();

  const onReset = () => {
    setObjects([])
  };

  const onChange = (e: any) => {
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    const position = [pos.x, pos.y, 2];
    const randomPosition = [Math.random(), Math.random(), 2];

    setObjects([
      ...objects,
      <DraggableDodecahedron
        position={position}
        key={Math.random()}
      />,
      <Box
        key={Math.random()}
        position={randomPosition}
      />
    ]);
  };

  return (
    <>
      <CameraController />
      <Page
        change={onChange}
        reset={onReset}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Provider>
        <Objects
          objects={objects} addObject={undefined} />
        <Plane
          position={[0, 0, -2]}
        />
      </Provider>
    </>
  )
}

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{
        position: [-1, -1, 10],
        fov: 45
      }}
    >
      <Scene />
    </Canvas>
  )
}

const Page = (props) => {
  const [state, setState] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <HTML center style={{ width: "500px" }}>
      <div className='text-5xl text-white text-center font-sans uppercase font-bold mb-2 select-none'>
        3d Search
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
      >
        <div className="flex flex-row rounded-3xl w-full h-10 bg-white px-3 py-1 items-center">
          <span class="material-symbols-outlined" style={{ color: "#505050", fontSize: "22px" }}>search</span>
          <input {
            ...register('search',
              { required: true })
          }
            type="search"
            className="form-control
              block
              w-full
              px-3 py-1.5
              text-base
              font-normal
              text-gray-700
              m-0
              outline-none"
            id="search"
            placeholder="Search..."
            aria-label="Search"
            value={state.value}
            onChange={props.change}
            autoComplete="off"
            spellCheck="false"
          />
          <button onClick={props.reset} type="reset" value='reset' aria-label="clear">
            <span class="material-symbols-outlined" style={{ color: "#505050", fontSize: "26px" }}>close</span>
          </button>
        </div>
        <div class="flex space-x-2 justify-center">
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Search
          </button>
        </div>
      </form>
    </HTML>
  )
}