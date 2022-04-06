import { ethers } from "ethers";
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { PROJECT_ID, PROJECT_SECRET } from "./constants";
import sha256 from 'crypto-js/sha256';
import Utf8 from 'crypto-js/enc-utf8'
export type NFT = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  creator: string;
  owner: string;
  imgHash: string;
  createdAt: string;
  listed?: boolean;
  //   transactions?:Transaction[]; //stretch goal
};

export type MintNFT = {
  name: string;
  description: string;
  imgUrl: string;
  imgHash: string;
  createdAt: string;
};
// export type Transaction = { //stretch goal
//     from: string;
//     to: string;
//     date?: string;
//     price: string;
// }

export const getAllNFTs = async (contract: ethers.Contract) => {
  //TODO: call marketplace contract here...
  return await contract.getAllNFTs();
};

export const mintNFT = async (contract: ethers.Contract, nft:MintNFT) => {
  //TODO: upload to IPFS and pass url to mint function in contract
  //TODO: listen on event, using provider.on()

/* Create an instance of the client */
  console.log('this is uploaded',nft)
  await contract.mint(nft.name,nft.description,nft.imgUrl,nft.imgHash,new Date().toString())
  return true;
};

export const uploadToIPFS = async (img:File, onComplete:(path:string,imageHash:string)=>void) => {
  const reader = new FileReader()
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from(PROJECT_ID + ':' + PROJECT_SECRET).toString('base64'),
    },
  })

  /* upload the file */
  reader.onloadend = async function() {
    const buf = Buffer.from(reader.result as ArrayBuffer) 
    const added = await client.add(buf)
    const hash = sha256(buf.toString()).toString() // hashing, can be clearner
    onComplete(`https://ipfs.infura.io/ipfs/${added.path}`,hash)
  }
  
  reader.readAsArrayBuffer(img)
}

export const listNFT = async (
  contract: ethers.Contract,
  nftTokenId: string,
  price: string
) => {
  //TODO: link to listNFT contract
  return true;
};
export const buyNFT = async (contract: ethers.Contract, listingId: string) => {
  //TODO: link to buyNFT contract
  return true;
};

export const getUserNFTs = async (contract: ethers.Contract) => {
  //TODO: call getUserNFTs in marketplace contract.
  return await contract.getAllNFTs();
};
