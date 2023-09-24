import {
  GroundMesh,
  Mesh,
  PhysicsMotionType,
  PhysicsShapeType,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useMemo, useRef } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { Arc } from "models/arc";
import { Room as RoomClass } from "store/room";
import { Player } from "Player";
import { Room } from "./components/room";

const DemoScene = () => {
  const groundRef = useRef<GroundMesh>(null);
  const groundBody = usePhysicsBody(groundRef, PhysicsShapeType.BOX, {
    mass: 1000,
    restitution: 0,
  });

  const room = useMemo(() => {
    return new RoomClass(new Vector3(0, 0, 0), Vector3.Up());
  }, []);
  const neighbors = useMemo(() => {
    return room.getNeighboringRooms();
  }, [room]);

  useEffect(() => {
    if (!groundBody.current?.body) return;
    groundBody.current?.body.setMotionType(PhysicsMotionType.STATIC);
  }, []);
  return (
    <>
      <hemisphericLight
        name="light1"
        intensity={0.7}
        direction={Vector3.Down()}
      />
      <hemisphericLight
        name="light2"
        intensity={0.7}
        direction={Vector3.Up()}
      />

      <Room room={room} />
      {neighbors.map((room, index) => (
        <Room key={index} room={room} />
      ))}

      <ground name="ground" width={6} height={6} ref={groundRef}></ground>
      <Player />
      <ground name="ground" width={6} height={6} ref={groundRef} />
    </>
  );
};
export default DemoScene;
