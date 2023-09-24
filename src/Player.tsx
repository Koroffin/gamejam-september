import {
  ArcRotateCamera,
  Mesh,
  MeshBuilder,
  Physics6DoFConstraint,
  PhysicsAggregate,
  PhysicsConstraintAxis,
  PhysicsShapeType,
  Ray,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { useScene } from "react-babylonjs";

export const Player = () => {
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
    const keysPressed = new Set<string>();
    const keyDown = (event: KeyboardEvent) => {
      keysPressed.add(event.key.toLowerCase());
    };
    const keyUp = (event: KeyboardEvent) => {
      keysPressed.delete(event.key.toLowerCase());
    };
    const dispose2 = scene.onBeforeRenderObservable.add((kbInfo) => {
      if (!onGround()) return;
      const movementVector = new Vector3(0, 0, 0);
      if (keysPressed.has("w")) {
        movementVector.addInPlace(directionVector);
      }
      if (keysPressed.has("s")) {
        movementVector.subtractInPlace(directionVector);
      }
      if (keysPressed.has("a")) {
        movementVector.subtractInPlace(rightVector);
      }
      if (keysPressed.has("d")) {
        movementVector.addInPlace(rightVector);
      }
      movementVector.normalize();
      if (keysPressed.has("shift")) {
        movementVector.scaleInPlace(2);
      }
      if (keysPressed.has(" ")) {
        movementVector.scaleInPlace(2);
        movementVector.addInPlace(new Vector3(0, 3, 0));
      }
      if (movementVector.length() === 0) {
        body.setLinearVelocity(new Vector3(0, 0, 0));
        return;
      }
      // movementVector.normalize();

      body.setLinearVelocity(movementVector);
    });
    let isLocked = false;
    const canvas = scene.getEngine().getRenderingCanvas()!;
    scene.onPointerDown = (e, pickResult) => {
      if (!isLocked) {
        canvas.requestPointerLock();
        isLocked = true;
      }
    };

    cameraRef.current?.setTarget(mesh);
    cameraRef.current?.inputs.attached.mousewheel.detachControl();
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
    window.addEventListener("keyup", keyUp);
    // window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      dispose?.remove();
      dispose2?.remove();
      // window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <capsule
        name="player"
        position={new Vector3(0, 2, 0)}
        ref={playerRef}
        visibility={0}
      />
      <arcRotateCamera
        name="camera1"
        alpha={Math.PI / 2}
        beta={Math.PI / 2}
        radius={9.0}
        target={Vector3.Zero()}
        minZ={0.001}
        ref={cameraRef}
        position={new Vector3(0, 0.5, 0)}
        zoomToMouseLocation={false}
      />
    </>
  );
};
