import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Engine } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core";
import { Scene as AScene } from "react-babylonjs";
import "@babylonjs/core/Physics/v2/physicsEngineComponent";
import { game } from "store/game";
import HavokPhysics from "@babylonjs/havok";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

export const Scene = observer(() => {
  const { scene } = game;
  const [Component, setComponent] = useState<React.FC>();
  const [physicsEngine, setPhysicsEngine] =
    useState<InstanceType<typeof HavokPlugin>>();
  const enablePhysics = useMemo(
    () => [new Vector3(0, -9.81, 0), physicsEngine],
    [physicsEngine],
  );

  useEffect(() => {
    HavokPhysics().then((physicsEngine) => {
      console.log("set engine");
      setPhysicsEngine(new HavokPlugin(true, physicsEngine));
    });
  }, []);

  useEffect(() => {
    if (scene) {
      import(`./scenes/${scene}`).then(({ default: Scene }) => {
        setComponent(() => Scene);
      });
    }
  }, [scene]);

  if (!Component || !physicsEngine) {
    return null;
  }

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <AScene enablePhysics={enablePhysics}>
        <Component />
      </AScene>
    </Engine>
  );
});
