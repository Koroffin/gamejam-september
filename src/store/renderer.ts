import { Vector3 } from "@babylonjs/core/Maths/math";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

class Renderer {
  render({
    position,
    scale,
    mesh,
    name,
  }: {
    position: Vector3;
    scale: Vector3;
    mesh: Mesh;
    name: string;
  }) {
    const instance = mesh.createInstance(name);
    instance.position = position;
    instance.scaling = scale;
    return instance;
  }
}

export const renderer = new Renderer();
