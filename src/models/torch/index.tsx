import { ModelProps } from "models/types";
import { useLoader } from "models/useLoader";

export const Torch = (props: ModelProps) => {
  useLoader({ path: "./assets/interior/", sceneFilename: "torch.glb" }, props);
  return null;
};
