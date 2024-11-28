import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import useCheckWebGL from "./hooks/useCheckWebGL"
import FixWebGLInstruction from "./components/webgl/FixWebGLInstruction"
const App = () => {
  const isAvailable = useCheckWebGL()

  if(!isAvailable) return(
    <FixWebGLInstruction/>
  )
  return (
    <main className="app transition-all-ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
};

export default App;
