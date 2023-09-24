import { ModelProps } from "models/types";
import { useLoader } from "models/useLoader";

export const Floor = (props: ModelProps) => {
  useLoader({ path: "./assets/interior/", sceneFilename: "floor.glb" }, props);
  return null;
};
