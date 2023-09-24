import { Vector3 } from "@babylonjs/core/Maths/math";

type ModelProps = {
  scale?: Vector3;
  rotation?: Vector3;
  position: Vector3;
  name: string;
};

type MeshProps = {
  path: string;
  sceneFilename: string;
};
