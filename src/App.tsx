import { AssetManagerContextProvider } from "react-babylonjs";
import { Scene } from "./Scene";

function App() {
  return (
    <AssetManagerContextProvider>
      <Scene />
    </AssetManagerContextProvider>
  );
}

export default App;
