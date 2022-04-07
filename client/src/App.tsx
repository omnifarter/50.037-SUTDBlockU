import Routing from "./Routing";
import "./App.css";
//@ts-ignore
import test from "./abis/test.json";
import useMetaMask, { Context } from "./helpers/useMetaMask";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
function App() {
  const contractData = useMetaMask();
  return (
    <Context.Provider value={contractData}>
      <MantineProvider>
        <NotificationsProvider>
          <Routing />
        </NotificationsProvider>
      </MantineProvider>
    </Context.Provider>
  );
}

export default App;
