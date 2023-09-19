import { Engine, Scene } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core";

export const SceneWithSpinningBoxes = () => (
  <div>
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
        <freeCamera
          name="camera1"
          position={new Vector3(0, 5, -10)}
          setTarget={[Vector3.Zero()]}
        />

        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={new Vector3(0, 1, 0)}
        />

        <ground name="ground" width={6} height={6} />
      </Scene>
    </Engine>
  </div>
);

export default SceneWithSpinningBoxes;
