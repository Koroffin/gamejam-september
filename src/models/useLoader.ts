import { useEffect } from "react";
import { useScene } from "react-babylonjs";
import { meshLoader } from "store/meshLoader";
import { renderer } from "store/renderer";
import { MeshProps, ModelProps } from "./types";
import {
  PhysicsAggregate,
  PhysicsMotionType,
  PhysicsShapeType,
} from "@babylonjs/core";

export const useLoader = (
  meshProps: MeshProps,
  modelProps: ModelProps,
  usePhysics = false,
) => {
  const { path, sceneFilename } = meshProps;
  const { position, scale, name, rotation } = modelProps;
  const scene = useScene();

  useEffect(() => {
    if (!scene) {
      return;
    }
    meshLoader.load(path, sceneFilename, scene).then((mesh) => {
      const instance = renderer.render({
        mesh,
        position,
        scale,
        name,
        rotation,
      });
      let dispose = () => {};
      if (usePhysics) {
        const physicsBody = new PhysicsAggregate(
          instance,
          PhysicsShapeType.BOX,
          { restitution: 0, mass: 1000 },
          scene,
        );
        physicsBody.body.setMotionType(PhysicsMotionType.STATIC);
        dispose = () => {
          physicsBody.dispose();
        };
      }
      return () => {
        instance.dispose();
        dispose();
      };
    });
  }, [scene, position, scale, rotation, name, path, sceneFilename]);
};
