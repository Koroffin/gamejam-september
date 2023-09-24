import {
  GroundMesh,
  Mesh,
  PhysicsMotionType,
  PhysicsShapeType,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { Arc } from "models/arc";
import { Player } from "Player";

const DemoScene = () => {
  const groundRef = useRef<GroundMesh>(null);
  const groundBody = usePhysicsBody(groundRef, PhysicsShapeType.BOX, {
    mass: 1000,
    restitution: 0,
  });
  useEffect(() => {
    if (!groundBody.current?.body) return;
    groundBody.current?.body.setMotionType(PhysicsMotionType.STATIC);
  }, []);
  return (
    <>
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
      <Player />
      <ground name="ground" width={6} height={6} ref={groundRef} />
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
