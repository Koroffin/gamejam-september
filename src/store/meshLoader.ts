import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/loaders/glTF";

class MeshLoader {
  hash = new Map<string, Mesh>();
  promiseHash = new Map<string, Promise<Mesh>>();
  load(path: string, sceneFilename: string, scene: Scene) {
    if (this.hash.has(path + sceneFilename)) {
      return Promise.resolve(this.hash.get(path + sceneFilename) as Mesh);
    }
    if (this.promiseHash.has(path + sceneFilename)) {
      return this.promiseHash.get(path + sceneFilename) as Promise<Mesh>;
    }
    const promise = new Promise<Mesh>((resolve) => {
      SceneLoader.ImportMesh("", path, sceneFilename, scene, (newMeshes) => {
        const meshArr: Mesh[] = [];
        for (let i = 1; i < newMeshes.length; i++) {
          const mesh = newMeshes[i];
          meshArr.push(mesh as Mesh);
          mesh.isVisible = false;
        }
        const root = Mesh.MergeMeshes(
          meshArr,
          true,
          true,
          undefined,
          false,
          true,
        ) as Mesh;
        root.isVisible = false;
        this.hash.set(path + sceneFilename, root);
        this.promiseHash.delete(path + sceneFilename);
        resolve(root);
      });
    });
    this.promiseHash.set(path + sceneFilename, promise);

    return promise;
  }
}

export const meshLoader = new MeshLoader();
