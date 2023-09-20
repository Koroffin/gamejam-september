import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Engine } from "react-babylonjs";
import { game } from "store/game";

export const Scene = observer(() => {
  const { scene } = game;
  const [Component, setComponent] = useState<React.FC>();

  useEffect(() => {
    if (scene) {
      import(`./scenes/${scene}`).then(({ default: Scene }) => {
        setComponent(() => Scene);
      });
    }
  }, [scene]);

  if (!Component) {
    return null;
  }

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Component />
    </Engine>
  );
});
