import {
  GroundMesh,
  Mesh,
  MeshBuilder,
  Physics6DoFConstraint,
  PhysicsAggregate,
  PhysicsConstraintAxis,
  PhysicsShapeType,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { Arc } from "models/arc";
import { useScene } from "react-babylonjs";

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
      <Player />
      <ground name="ground" width={6} height={6} ref={groundRef}></ground>
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

const Player = () => {
  const playerRef = useRef<Mesh>(null);
  const physicsBody = usePhysicsBody(playerRef, PhysicsShapeType.CAPSULE, {
    mass: 1,
    restitution: 0.9,
  });
  const scene = useScene();
  useEffect(() => {
    if (!scene) return;
    let parentGround = MeshBuilder.CreateGround(
      "parentGround",
      { width: 1, height: 1 },
      scene,
    );

    let parentGroundAggregate = new PhysicsAggregate(
      parentGround,
      PhysicsShapeType.BOX,
      { mass: 0 },
      scene,
    );

    // lock rotation so player doesn't fall over
    const sixDofJoint = new Physics6DoFConstraint(
      {
        pivotA: new Vector3(0, 0, 0),
        pivotB: new Vector3(0, 0, 0),
        perpAxisA: new Vector3(0, 0, 0),
        perpAxisB: new Vector3(0, 0, 0),
      },
      [
        {
          axis: PhysicsConstraintAxis.ANGULAR_X,
          minLimit: 0,
          maxLimit: 0,
        },
        {
          axis: PhysicsConstraintAxis.ANGULAR_Z,
          minLimit: 0,
          maxLimit: 0,
        },
        {
          axis: PhysicsConstraintAxis.ANGULAR_Y,
          minLimit: 0,
          maxLimit: 0,
        },
      ],
      scene!,
    );
    parentGroundAggregate.body.addConstraint(
      physicsBody.current?.body!,
      sixDofJoint,
    );
  }, []);

  useEffect(() => {
    const body = physicsBody.current;
    const mesh = playerRef.current;
    // player controls
    if (!scene || !body || !mesh) return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "w") {
        physicsBody.current?.body.applyImpulse(
          new Vector3(0, 0, -0.1),
          mesh.position,
        );
      }
      if (event.key === "s") {
        physicsBody.current?.body.applyImpulse(
          new Vector3(0, 0, 0.1),
          mesh.position,
        );
      }
      if (event.key === "a") {
        physicsBody.current?.body.applyImpulse(
          new Vector3(-0.1, 0, 0),
          mesh.position,
        );
      }
      if (event.key === "d") {
        physicsBody.current?.body.applyImpulse(
          new Vector3(0.1, 0, 0),
          mesh.position,
        );
      }
    };
    window.addEventListener("keydown", keyDown);
  }, []);

  return (
    <capsule name="player" position={new Vector3(0, 5, 0)} ref={playerRef} />
  );
};

export default DemoScene;
