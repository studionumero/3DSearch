import { nanoid } from "nanoid";
// three
import * as THREE from "three";
import { Text } from "../three/Text";

export const useKeyEvent = ({ e, characters, updateCharacters, pointer, camera }) => {
  switch (true) {
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      const letter = e.key.toUpperCase();
      updateCharacters([
        ...characters,
        <Text
          key={nanoid()}
          letter={letter}
          initialPosition={randomizePosition({ pointer, camera })}
        />,
      ]);
    }
      break;
    default:
      return null;
  }
};

const randomizePosition = ({ pointer, camera }: any) => {
  const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
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
