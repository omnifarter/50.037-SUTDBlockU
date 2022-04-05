import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { ART_MARKETPLACE_ADDRESS, UNI_TOKEN_ADDRESS } from "./constants";
import UniToken from '../abis/UniToken.json'
import Marketplace from '../abis/ArtMarketplace.json'

type ContextData = {
  metaAddress?: string;
  uniTokenContract?: ethers.Contract;
  marketplaceContract?: ethers.Contract;

}
export const Context = React.createContext<ContextData>({})

const useMetaMask = () => {
    const [metaAddress,setMetaAddress] = useState("")
      //@ts-ignore
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))

    const [uniTokenContract, setUniTokenContract] = useState<ethers.Contract>()
    const [marketplaceContract, setMarketplaceContract] = useState<ethers.Contract>()
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const initMetaMask = async () => {
    await provider.send("eth_requestAccounts", []);
    // MetaMask requires requesting permission to connect users accounts

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...

    const signer = provider.getSigner()
    setMetaAddress(await signer.getAddress())
    await createUniTokenContract()
    await createMarketPlaceContract()
  }

  const createUniTokenContract = async () => {
    const uniTokenContract = new ethers.Contract(
      UNI_TOKEN_ADDRESS, 
      UniToken.abi, provider)
    setUniTokenContract(uniTokenContract)
  }
  const createMarketPlaceContract = async () => {
    const marketplaceToken = new ethers.Contract(
      ART_MARKETPLACE_ADDRESS, 
      Marketplace.abi, provider)
    setMarketplaceContract(marketplaceToken)
  }

  useEffect(()=>{
    initMetaMask()
  },[])


    return({metaAddress, uniTokenContract, marketplaceContract});
}
 
export default useMetaMask;