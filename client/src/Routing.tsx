import { FunctionComponent, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import listen from "./helpers/listen";
import { Context } from "./helpers/useMetaMask";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import NFTDetails from "./pages/NFTDetails";

const Routing: FunctionComponent<any> = () => {
  // const navigate = useNavigate();
  // const contractData = useContext(Context);
  // useEffect(() => {
  //   contractData.uniTokenContract &&
  //     listen(contractData.uniTokenContract, navigate);
  // }, [contractData, navigate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/:id" element={<NFTDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
