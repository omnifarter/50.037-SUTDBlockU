import Routing from "./Routing";
import "./App.css";
import useMetaMask, { Context } from "./helpers/useMetaMask";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const contractData = useMetaMask();
  return (
    <Context.Provider value={contractData}>
      <MantineProvider>
        <NotificationsProvider limit={1}>
          <Routing />
        </NotificationsProvider>
      </MantineProvider>
    </Context.Provider>
  );
}

export default App;
