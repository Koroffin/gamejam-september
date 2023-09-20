import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "react-babylonjs";
import { Arc } from "models/arc";

const DemoScene = () => {
  return (
    <Scene>
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
        position={new Vector3(12.5, -5, 0)}
        scale={new Vector3(2, 2, 2)}
        name="arc1"
      />
      <Arc
        position={new Vector3(0, 0, 0)}
        scale={new Vector3(1, 1, 1)}
        name="arc2"
      />
        <ground name="ground" width={6} height={6} />

    </Scene>
  );
};

export default DemoScene;
