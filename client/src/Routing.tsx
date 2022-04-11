import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import NFTDetails from "./pages/NFTDetails";

const Routing: FunctionComponent<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/:id" element={<NFTDetails />} />
        <Route path="/:id/:listingId" element={<NFTDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
