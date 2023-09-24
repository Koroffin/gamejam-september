import { Vector3 } from "@babylonjs/core";
import { Fragment } from "react";
import { Floor } from "models/floor";
import { Wall } from "models/wall";
import { Ceiling } from "models/ceiling";
import { Torch } from "models/torch";
import { Room as RoomClass } from "store/room";

export const Room = ({ room }: { room: RoomClass }) => {
  console.log(room);
  return (
    <>
      {room.floorPositions.map((position, index) => (
        <Fragment key={index}>
          <Floor position={position} name={`floor-${index}`} />
          <Ceiling
            position={new Vector3(position.x, position.y + 3, position.z)}
            name={`ceiling-${index}`}
          />
        </Fragment>
      ))}
      {room.wallsPositions.map(({ position, rotation }, index) => (
        <Fragment key={index}>
          <Wall
            position={position}
            rotation={rotation}
            name={`wall-${index}`}
          />
        </Fragment>
      ))}

      {room.torchPositions.map(({ position, rotation }, index) => (
        <Torch
          key={index}
          position={position}
          rotation={rotation}
          name={`torch-${index}`}
          scale={new Vector3(0.2, 0.2, 0.2)}
        />
      ))}
    </>
  );
};
