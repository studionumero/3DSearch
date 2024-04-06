import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export const useRandomPosition = () => {
  const { camera } = useThree();

  const vector = new THREE.Vector3(
    Math.random() * 2 - 1,  // Random x coordinate in range [-1, 1]
    Math.random() * 2 - 1,  // Random y coordinate in range [-1, 1]
    0.5
  ).unproject(camera);

  const coord = vector.clone().sub(camera.position).normalize();
  const distance = -camera.position.z / coord.z;
  const position = camera.position.clone().add(coord.multiplyScalar(distance));

  const base = 4;
  const factor = base * 2;

  const X = Math.floor(Math.random() * factor) - base + position.x * base;
  const Y = Math.floor(Math.random() * factor) - base + position.y * base;

  return new THREE.Vector3(X / base, Y / base, 2);
}