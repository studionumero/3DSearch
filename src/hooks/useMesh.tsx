// three
import {
  TextGeometry,
  TextGeometryParameters
} from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
import { Mesh, MeshLambertMaterial, Vector3 } from "three";

const useMesh = (letter: string, config: TextGeometryParameters) => {
  extend({ TextGeometry });

  const geometry = new TextGeometry(letter, config);

  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  const material = new MeshLambertMaterial();
  const mesh = new Mesh(geometry, material);

  const size = mesh.geometry.boundingBox.getSize(
    new Vector3()
  );

  return { mesh, size };
}

export { useMesh }