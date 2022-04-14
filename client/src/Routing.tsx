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

const ProtectedRoute = ({ children }:any) => {
  const isSignedIn = localStorage.getItem("hasMetaMask")
  if (isSignedIn!=='true') {
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
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/mint" element={
        <ProtectedRoute>
          <Mint />
        </ProtectedRoute>
        } />
        <Route path="/:id" element={
        <ProtectedRoute>
          <NFTDetails />
        </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
