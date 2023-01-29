import { FC } from "react";
import { nanoid } from "nanoid";
// three
import * as THREE from "three";
// interfaces
import { SearchInterface } from "../interfaces/Search";
// components
import Text from "../three/Text";

type Props = SearchInterface & { mouse: any, camera: any };

const useKeyEvent: FC<Props> = ({ e, objects, setObjects, mouse, camera }) => {
  switch (true) {
    case (e.keyCode >= 48 && e.keyCode <= 90):
    case (e.keyCode >= 96 && e.keyCode <= 105): {
      const letter = e.key.toUpperCase();
      setObjects([
        ...objects,
        <Text
          key={nanoid()}
          letter={letter}
          initialPosition={randomizePosition({ mouse, camera })}
          bevelSize={0.22}
          bevel={true}
          thickness={0.52}
          fontSize={1.8}
          type="Roboto"
          color="#f08080"
        />,
      ]);
    }
      break;
    default:
      return null;
  }
};

const randomizePosition = ({ mouse, camera }: any) => {
  const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
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

export { useKeyEvent }