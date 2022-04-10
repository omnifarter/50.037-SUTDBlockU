import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { UNI_MARKETPLACE_ADDRESS, UNI_TOKEN_ADDRESS } from "./constants";
//@ts-ignore
import UniToken from "../abis/UniToken.json";
//@ts-ignore
import Marketplace from "../abis/UniMarketplace.json";

type ContextData = {
  metaAddress?: string;
  uniTokenContract?: ethers.Contract;
  marketplaceContract?: ethers.Contract;
};
export const Context = React.createContext<ContextData>({});

const useMetaMask = () => {
  const [metaAddress, setMetaAddress] = useState("");
  //@ts-ignore
  const [provider, _setProvider] = useState(
    //@ts-ignore
    new ethers.providers.Web3Provider(window.ethereum)
  );

  const [uniTokenContract, setUniTokenContract] = useState<ethers.Contract>();
  const [marketplaceContract, setMarketplaceContract] =
    useState<ethers.Contract>();
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const initMetaMask = async () => {
    await provider.send("eth_requestAccounts", []);
    // MetaMask requires requesting permission to connect users accounts

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...

    const signer = provider.getSigner();
    setMetaAddress(await signer.getAddress());
    await createUniTokenContract(signer);
    await createMarketPlaceContract(signer);
  };

  const createUniTokenContract = async (signer: any) => {
    let uniTokenContract = new ethers.Contract(
      UNI_TOKEN_ADDRESS,
      UniToken.abi,
      signer
    );

    setUniTokenContract(uniTokenContract);
  };
  const createMarketPlaceContract = async (signer: any) => {
    let marketplaceToken = new ethers.Contract(
      UNI_MARKETPLACE_ADDRESS,
      Marketplace.abi,
      signer
    );
    setMarketplaceContract(marketplaceToken);
  };

  useEffect(() => {
    initMetaMask();
  }, []);

  return { metaAddress, uniTokenContract, marketplaceContract };
};

export default useMetaMask;
