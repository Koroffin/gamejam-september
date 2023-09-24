import { GroundMesh, PhysicsShapeType, UniversalCamera, Vector3 } from "@babylonjs/core";
import { useRef, useMemo } from "react";
import { usePhysicsBody } from "hooks/usePhysicsBody";
import { Room as RoomClass } from "store/room";
import { useCamera } from "react-babylonjs";
import { Room } from "./components/room";

const DemoScene = () => {
  const groundRef = useRef<GroundMesh>(null);
  usePhysicsBody(groundRef, PhysicsShapeType.BOX, {
    mass: 0,
    restitution: 0.9,
  });

  const room = useMemo(() => {
    return new RoomClass(new Vector3(0, 0, 0), Vector3.Up());
  }, []);
  const neighbors = useMemo(() => {
    return room.getNeighboringRooms();
  }, [room]);

  const camera = useCamera((scene) => {
    return new UniversalCamera("UniversalCamera", new Vector3(-1, 1.5, -3), scene);
  });

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
    </>
  );
};
export default DemoScene;
