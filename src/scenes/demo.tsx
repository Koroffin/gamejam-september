import { GroundMesh, Mesh, PhysicsShapeType, Vector3 } from "@babylonjs/core";
import { useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
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

export default DemoScene;
