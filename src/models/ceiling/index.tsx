import { ModelProps } from "models/types";
import { useLoader } from "models/useLoader";

export const Ceiling = (props: ModelProps) => {
  useLoader({ path: "./assets/interior/", sceneFilename: "ceiling.glb" }, props);
  return null;
};