import { Mesh, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import { useScene } from "react-babylonjs";
import { useEffect } from "react";

/**
 * Adds a physics body to a mesh
 */
export const usePhysicsBody = (
  mesh: React.MutableRefObject<Mesh | null>,
  shapeType: PhysicsShapeType,
  options: {
    mass: number;
    restitution: number;
  },
) => {
  const scene = useScene();
  useEffect(() => {
    //connect box to physics engine
    if (!mesh.current || !scene) return;
    const boxAggregate = new PhysicsAggregate(
      mesh.current,
      shapeType,
      options,
      scene,
    );
    return () => {
      boxAggregate.dispose();
    };
  }, []);
};