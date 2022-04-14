import { FunctionComponent, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import listen from "./helpers/listen";
import { Context } from "./helpers/useMetaMask";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Mint from "./pages/Mint";
import NFTDetails from "./pages/NFTDetails";
import Transactions from "./pages/Transactions";

const ProtectedRoute = ({ isSignedIn , children }:any) => {
  if (!isSignedIn) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

const Routing: FunctionComponent<any> = () => {
  const contractData = useContext(Context);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='landing' element={ <Landing /> } />
        <Route index element={
          <ProtectedRoute isSignedIn={contractData.metaAddress}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute isSignedIn={contractData.metaAddress}>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/mint" element={
        <ProtectedRoute isSignedIn={contractData.metaAddress}>
          <Mint />
        </ProtectedRoute>
        } />
        <Route path="/:id" element={
        <ProtectedRoute isSignedIn={contractData.metaAddress}>
          <NFTDetails />
        </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute isSignedIn={contractData.metaAddress}>
            <Transactions />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
