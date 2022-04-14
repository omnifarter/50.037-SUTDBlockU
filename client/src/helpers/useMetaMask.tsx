import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { UNI_TOKEN_ADDRESS } from "./constants";
//@ts-ignore
import UniToken from "../abis/UniToken.json";
import { Navigate, useNavigate } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';

type ContextData = {
  metaAddress?: string;
  uniTokenContract?: ethers.Contract;
};
export const Context = React.createContext<ContextData>({});

const useMetaMask = () => {
  const [metaAddress, setMetaAddress] = useState("");
  //@ts-ignore
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(
    window.ethereum ? new ethers.providers.Web3Provider(window.ethereum as any) : null
  );
  const [uniTokenContract, setUniTokenContract] = useState<ethers.Contract>();

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const initMetaMask = async () => {
        // The MetaMask plugin also allows signing transactions to
        //@ts-ignore
        await provider.send("eth_requestAccounts", []);
        // MetaMask requires requesting permission to connect users accounts
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        //@ts-ignore

        const signer = provider.getSigner();
        setMetaAddress(await signer.getAddress() || "");
        await createUniTokenContract(signer);
        //@ts-ignore
        window.ethereum.on('accountsChanged',(accounts) => {
          if(accounts.length === 0){
            localStorage.removeItem("hasMetaMask")
            
          }
        })
        localStorage.setItem("hasMetaMask","true")
  };

  const createUniTokenContract = async (signer: any) => {
    let uniTokenContract = new ethers.Contract(
      UNI_TOKEN_ADDRESS,
      UniToken.abi,
      signer
    );

    setUniTokenContract(uniTokenContract);
  };

  useEffect(() => {
    provider && initMetaMask();
  }, []);

  return { metaAddress, uniTokenContract };
};

export default useMetaMask;
