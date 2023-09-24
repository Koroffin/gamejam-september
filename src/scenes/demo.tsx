import {
  ArcRotateCamera,
  GroundMesh,
  Mesh,
  MeshBuilder,
  Physics6DoFConstraint,
  PhysicsAggregate,
  PhysicsConstraintAxis,
  PhysicsMotionType,
  PhysicsShapeType,
  Ray,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { Arc } from "models/arc";
import { useScene } from "react-babylonjs";

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
  const cameraRef = useRef<ArcRotateCamera>(null);
  const physicsBody = usePhysicsBody(playerRef, PhysicsShapeType.CAPSULE, {
    mass: 100,
    restitution: 0,
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
      { mass: 0, restitution: 0 },
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
    const mesh = playerRef.current;
    const body = physicsBody.current?.body;
    // player controls
    if (!scene || !mesh || !body) return;
    const directionVector = new Vector3(1, 0, 0);
    const rightVector = new Vector3(0, 0, -1);
    const onGround = () => {
      // check using raycast
      const ray = new Ray(mesh!.position, new Vector3(0, -1, 0), 0.6);
      const raycast = scene!.pickWithRay(ray, (m) => m !== mesh);
      return raycast?.hit ?? false;
    };
    const keyDown = (event: KeyboardEvent) => {
      // movement uses current rotation to move relative to it
      const speed = 1;
      if (!onGround()) return;
      if (event.key === "w") {
        body.setLinearVelocity(directionVector.scale(speed));
      }
      if (event.key === "s") {
        body.setLinearVelocity(directionVector.scale(-speed));
      }
      if (event.key === "a") {
        body.setLinearVelocity(rightVector.scale(-speed));
      }
      if (event.key === "d") {
        body.setLinearVelocity(rightVector.scale(speed));
      }
      if (event.key === " ") {
        body.setLinearVelocity(mesh.up.scale(speed * 3));
      }
    };

    cameraRef.current?.setTarget(mesh);
    const dispose = cameraRef.current?.onViewMatrixChangedObservable.add(() => {
      const forwardRay = cameraRef.current?.getForwardRay();
      if (!forwardRay) return;
      const forwardDirection = forwardRay.direction;
      const forwardDirectionVector = new Vector3(
        forwardDirection.x,
        0,
        forwardDirection.z,
      );
      forwardDirectionVector.normalize();
      directionVector.x = forwardDirectionVector.x;
      directionVector.z = forwardDirectionVector.z;
      const rightDirectionVector = forwardDirection.cross(Vector3.Up());
      rightVector.x = -rightDirectionVector.x;
      rightVector.z = -rightDirectionVector.z;
    });

    window.addEventListener("keydown", keyDown);
    // window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("keydown", keyDown);
      dispose?.remove();
      // window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <capsule
        name="player"
        position={new Vector3(0, 0.5, 0)}
        ref={playerRef}
      />{" "}
      <arcRotateCamera
        name="camera1"
        alpha={Math.PI / 2}
        beta={Math.PI / 2}
        radius={9.0}
        target={Vector3.Zero()}
        minZ={0.001}
        ref={cameraRef}
        position={new Vector3(0, 0.5, 0)}
      />
    </>
  );
};

export default DemoScene;
