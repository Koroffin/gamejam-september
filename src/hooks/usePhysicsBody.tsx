import {
  Mesh,
  PhysicsAggregate,
  PhysicsShapeType,
  PhysicsAggregateParameters,
} from "@babylonjs/core";
import { useScene } from "react-babylonjs";
import { useEffect, useRef } from "react";

/**
 * Adds a physics body to a mesh
 */
export const usePhysicsBody = (
  mesh: React.MutableRefObject<Mesh | null>,
  shapeType: PhysicsShapeType,
  options: PhysicsAggregateParameters,
) => {
  const scene = useScene();
  const physicsRef = useRef<PhysicsAggregate | null>(null);
  useEffect(() => {
    //connect box to physics engine
    if (!mesh.current || !scene) return;
    const boxAggregate = new PhysicsAggregate(
      mesh.current,
      shapeType,
      options,
      scene,
    );
    physicsRef.current = boxAggregate;
    return () => {
      boxAggregate.dispose();
    };
  }, []);
  return physicsRef;
};
