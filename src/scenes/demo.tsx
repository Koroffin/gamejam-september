import {
    GroundMesh,
    Mesh,
    PhysicsAggregate,
    PhysicsShapeType,
    Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { useScene } from "react-babylonjs";
import { Arc } from "models/arc";

const DemoScene = () => {
    const groundRef = useRef<GroundMesh>(null);
    usePhysicsBody(groundRef, PhysicsShapeType.BOX, {
        mass: 0,
        restitution: 0.9,
    });
  return (
    <>
      <arcRotateCamera
        name="camera1"
        alpha={Math.PI / 2}
        beta={Math.PI / 2}
        radius={9.0}
        target={Vector3.Zero()}
        minZ={0.001}
      />
      <hemisphericLight
        name="light1"
        intensity={0.7}
        direction={Vector3.Up()}
      />
        <Arc
            position={new Vector3(0, 0, 0)}
            scale={new Vector3(1, 1, 1)}
            name="arc2"
        />
        <BouncyBox />
    <ground name="ground" width={6} height={6}>
    </ground>
  </>
);
};

const BouncyBox = () => {
    const boxRef = useRef<Mesh>(null);
    usePhysicsBody(boxRef, PhysicsShapeType.BOX, {
        mass: 1,
        restitution: 0.9,
    });

    return (
        <box name="box" size={1} position={new Vector3(0, 5, 0)} ref={boxRef} />
    );
};

/**
 * usePhysicsBody hook adds a physics body to a mesh
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

export default DemoScene;
