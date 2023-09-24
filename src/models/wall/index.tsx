import { ModelProps } from "models/types";
import { useLoader } from "models/useLoader";

export const Wall = (props: ModelProps) => {
  useLoader({ path: "./assets/interior/", sceneFilename: "wall.glb" }, props);
  return null;
};
