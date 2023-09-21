import { ModelProps } from "models/types";
import { useLoader } from "models/useLoader";

export const Arc = (props: ModelProps) => {
  useLoader({ path: "./assets/interior/", sceneFilename: "arc.glb" }, props);
  return null;
};
