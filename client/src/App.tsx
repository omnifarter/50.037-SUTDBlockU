import Routing from "./Routing";
import "./App.css";
//@ts-ignore
import test from "./abis/test.json";
import useMetaMask, { Context } from "./helpers/useMetaMask";
function App() {
  const contractData = useMetaMask();
  return (
    <Context.Provider value={contractData}>
      <Routing />
    </Context.Provider>
  );
}

export default App;
