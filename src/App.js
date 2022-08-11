import { useState, useEffect } from "react"
import { useDrag } from "@use-gesture/react";
import { useForm } from 'react-hook-form';

// cannon
import * as CANNON from "cannon";
import { useCannon, Provider } from './useCannon';

// react-three
import * as THREE from 'three';
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber"
import { Html as HTML } from "@react-three/drei";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// styles
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

extend({ TextGeometry })

function Text({ position: initialPosition }) {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const { ref, body } = useCannon({ bodyProps: { mass: 100000 } }, body => {
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

  const font = new FontLoader().parse('/fonts/Roboto.json');

  return (
    <mesh ref={ref} castShadow position={position} quaternion={quaternion} {...bind()}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <textGeometry attach="geometry" args={['text', { font, size: 1, height: 1 }]} />
      <meshPhysicalMaterial attach='material' color={'hotpink'} />
    </mesh>
  )
}

function DraggableDodecahedron({ position: initialPosition }) {
  const { size, viewport } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const aspect = size.width / viewport.width;

  const { ref, body } = useCannon({ bodyProps: { mass: 100000 } }, body => {
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

function Plane({ position, onPlaneClick }) {
  const { ref } = useCannon({ bodyProps: { mass: 0 } }, body => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow position={position}
      onClick={onPlaneClick}>
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

function Scene() {
  const [objects, setObjects] = useState([
    // <DraggableDodecahedron position={[0, 0, 0]} key={Math.random()} />
  ]);

  const { mouse, camera } = useThree();
  const onPlaneClick = (e) => {
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    const position = [pos.x, pos.y, 2];
    setObjects([
      ...objects,
      <DraggableDodecahedron
        position={position}
        key={Math.random()}
      />,
      <Text
        position={position}
        key={Math.random()}
      />
    ]);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      <Provider>
        <Objects 
          objects={objects} 
        />
        <Plane 
          position={[0, 0, -2]} 
          onPlaneClick={onPlaneClick} 
        />
      </Provider>
    </>
  )

};

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
      <CameraController />
      <Page />
      <Scene />
    </Canvas>
  )
}

const Page = () => {
  const [state, setState] = useState('');

  const handleChange = (e) => {
    setState({ value: e.target.value });
  }
  console.log(state.value);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <HTML center style={{ width: "500px" }}>
      <div className='logo'>
        3d Search
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3 align-items-center"
      >
        <Form.Control {
          ...register('search',
            { required: true })
        }
          type="search"
          placeholder="Search"
          className="me-2"
          style={{ padding: "8px 16px" }}
          aria-label="Search"
          value={state.value}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button
          variant="flat"
          type="submit"
          style={{ width: "100px" }}
        >
          Search
        </Button>
      </Form>
    </HTML>
  )
}