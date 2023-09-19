import { Vector3, Mesh, Color3, BaseTexture } from "@babylonjs/core";
import { useRef } from "react";

/*
    Render a plane using babylonjs
    Accepts position, width, height and texture
*/
export const Plane = (props: { name: string; position: Vector3; width: number; height: number; texture: BaseTexture }) => {
    const planeRef = useRef<Mesh>(null);

    return (
        <plane
            name={props.name}
            ref={planeRef}
            size={props.width}
            position={props.position}
        >
            <standardMaterial
                name={`${props.name}-mat`}
                diffuseTexture={props.texture}
                specularColor={Color3.Black()}
            />
        </plane>
    );
};