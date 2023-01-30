// three
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

const useRandomPos = () => {
  const { mouse, camera } = useThree();

  const vector = new Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  const coord = vector.sub(camera.position).normalize();
  const distance = -camera.position.z / coord.z;
  const position = camera.position.clone().add(coord.multiplyScalar(distance));

  const base = 4;

  const Xmax = position.x * base;
  const Xmin = position.x * base * -1;
  const Ymax = position.y * base;
  const Ymin = position.y * base * -1;
  const X = Math.floor(Math.random() * (Xmax - Xmin + 1)) + Xmin;
  const Y = Math.floor(Math.random() * (Ymax - Ymin + 1)) + Ymin;

  return [X / base, Y / base, 2];
}

export { useRandomPos }