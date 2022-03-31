import Routing from './Routing';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
// import ArtMarketplaceArtifact from "./abis/ArtMarketplace.json"
//@ts-ignore
import test from "./abis/test.json"

const ART_MARKETPLACE_ADDRESS = "0xaDF456Bf01C15A0625AD1cB45bE3cE80B805BE46"
const TEST_ADDRESS = "0x839432121824761f3af9A5a24aE5772dc48154fF"
export const Context = React.createContext("Sign in")
function App() {

  const [metaAddress,setMetaAddress] = useState("")
  //@ts-ignore
  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
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
  }

  const createContract = async () => {
    const testContract = new ethers.Contract(
      TEST_ADDRESS, 
    test.abi, provider)


    console.log(await testContract.getHi())
  }

  useEffect(()=>{
    initMetaMask()
    createContract()
  },[])
  
  return (
    <Context.Provider value={metaAddress}>
    <Routing />
    </Context.Provider>
    );
}

export default App;
