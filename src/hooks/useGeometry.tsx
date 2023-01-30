import { SetStateAction } from "react";
// three
import { useFrame } from "@react-three/fiber";
// cannon
import { Body } from "cannon";

const useGeometry = (body: Body, position: number[], setPosition: { (value: SetStateAction<number[]>): void; (arg0: any): void; }, quaternion: any, setQuaternion: { (value: SetStateAction<number[]>): void; (arg0: any): void; }) => {
  useFrame(() => {
    const deltaX = Math.abs(body.position.x - position[0]);
    const deltaY = Math.abs(body.position.y - position[1]);
    const deltaZ = Math.abs(body.position.z - position[2]);

    if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
      setPosition(body.position.clone().toArray());
    }

    const bodyQuaternion = body.quaternion.toArray();
    const quaternionDelta = bodyQuaternion.map((n: number, idx: string | number) => Math.abs(n - quaternion[idx])).reduce((acc: any, curr: any) => acc + curr);

    if (quaternionDelta > 0.01) {
      setQuaternion(body.quaternion.toArray());
    }
  });
}

export { useGeometry }