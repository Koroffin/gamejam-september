import { useEffect } from "react";
import { useScene } from "react-babylonjs";
import { meshLoader } from "store/meshLoader";
import { renderer } from "store/renderer";
import { MeshProps, ModelProps } from "./types";

export const useLoader = (meshProps: MeshProps, modelProps: ModelProps) => {
  const { path, sceneFilename } = meshProps;
  const { position, scale, name, rotation } = modelProps;
  const scene = useScene();

  useEffect(() => {
    if (!scene) {
      return;
    }
    meshLoader.load(path, sceneFilename, scene).then((mesh) => {
      const instance = renderer.render({ mesh, position, scale, name, rotation });
      return () => {
        instance.dispose();
      }
    });
  }, [scene, position, scale, rotation, name, path, sceneFilename]);
};
