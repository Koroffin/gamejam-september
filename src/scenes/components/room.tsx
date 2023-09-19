import { Vector3, BaseTexture } from "@babylonjs/core";
import { Plane } from "./plane";

type RoomProps = {
    name: string;
    position: Vector3;
    width: number;
    height: number;
    depth: number;
    textures: {
        floor: BaseTexture;
        ceiling: BaseTexture;
        wall: BaseTexture;
    }
};

/* render four walls, a floor, and a ceiling using <Plate> component */
export const Room = (props: RoomProps) => {
    const { name, position, width, height, depth, textures } = props;

    return (
        <>
            <Plane
                name={`${name}-floor`}
                position={position}
                width={width}
                height={depth}
                texture={textures.floor}
            />
            <Plane
                name={`${name}-ceiling`}
                position={position.add(new Vector3(0, height, 0))}
                width={width}
                height={depth}
                texture={textures.ceiling}
            />
            <Plane
                name={`${name}-wall-1`}
                position={position.add(new Vector3(0, height / 2, depth / 2))}
                width={width}
                height={height}
                texture={textures.wall}
            />
            <Plane
                name={`${name}-wall-2`}
                position={position.add(new Vector3(0, height / 2, -depth / 2))}
                width={width}
                height={height}
                texture={textures.wall}
            />
            <Plane
                name={`${name}-wall-3`}
                position={position.add(new Vector3(width / 2, height / 2, 0))}
                width={depth}
                height={height}
                texture={textures.wall}
            />
            <Plane
                name={`${name}-wall-4`}
                position={position.add(new Vector3(-width / 2, height / 2, 0))}
                width={depth}
                height={height}
                texture={textures.wall}
            />
        </>
    );
}