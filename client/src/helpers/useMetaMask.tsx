import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { UNI_TOKEN_ADDRESS } from "./constants";
//@ts-ignore
import UniToken from "../abis/UniToken.json";
import { useNavigate } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';

type ContextData = {
  metaAddress?: string;
  uniTokenContract?: ethers.Contract;
};
export const Context = React.createContext<ContextData>({});

const useMetaMask = () => {
  const [metaAddress, setMetaAddress] = useState("");
  //@ts-ignore
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>(
  );

  const [uniTokenContract, setUniTokenContract] = useState<ethers.Contract>();

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const initMetaMask = async () => {
    const providerDetected = await detectEthereumProvider({mustBeMetaMask:true}) as ethers.providers.Web3Provider
    if (providerDetected){
      //@ts-ignore
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
      // The MetaMask plugin also allows signing transactions to
      await provider?.send("eth_requestAccounts", []);
      // MetaMask requires requesting permission to connect users accounts
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
  
      const signer = provider?.getSigner();
      setMetaAddress(await signer?.getAddress() || "");
      await createUniTokenContract(signer);
      }
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
    initMetaMask();
  }, [provider]);

  return { metaAddress, uniTokenContract };
};

export default useMetaMask;
