import { Vector3 } from "@babylonjs/core/Maths/math";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

class Renderer {
  render({
    position,
    scale,
    mesh,
    name,
    rotation,
  }: {
    position: Vector3;
    scale?: Vector3;
    mesh: Mesh;
    name: string;
    rotation?: Vector3;
  }) {
    const instance = mesh.createInstance(name);
    instance.position = position;
    instance.scaling = scale ?? new Vector3(1, 1, 1);
    instance.rotation = rotation ?? new Vector3(0, 0, 0);
    return instance;
  }
}

export const renderer = new Renderer();
