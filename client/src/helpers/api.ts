import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { PROJECT_ID, PROJECT_SECRET } from "./constants";
import sha256 from "crypto-js/sha256";
import Utf8 from "crypto-js/enc-utf8";
import { showNotification } from "@mantine/notifications";

export type NFT = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  creator: string;
  owner: string;
  imgHash: string;
  createdAt: string;
  price: number;
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

export const getAllNFTs = async (
  contract: ethers.Contract,
  tokenContract: ethers.Contract
) => {
  var allListedNFTWithMetadata: NFT[] = [];

  //TODO: call marketplace contract here...
  const allListedNFTs = await contract.getAllNFTs();

  await Promise.all(
    allListedNFTs.map(async (listedItem: any) => {
      // Grab token metadata from uni token contract
      const tokenData = await tokenContract.getTokenData(listedItem.tokenId);
      allListedNFTWithMetadata.push({
        id: listedItem.tokenId,
        name: tokenData.name,
        description: tokenData.description,
        imgUrl: tokenData.imgUrl,
        creator: tokenData.creator,
        owner: tokenData.owner,
        imgHash: tokenData.imgHash,
        createdAt: tokenData.createdAt,
        price: listedItem.price,
      });
    })
  );

  return allListedNFTWithMetadata;
};

export const mintNFT = async (contract: ethers.Contract, nft: MintNFT) => {
  //TODO: upload to IPFS and pass url to mint function in contract
  //TODO: listen on event, using provider.on()

  /* Create an instance of the client */
  console.log("this is uploaded", nft);
  await contract.mint(
    nft.name,
    nft.description,
    nft.imgUrl,
    nft.imgHash,
    new Date().toString()
  );

  // Listen to Minted event
  await contract.on(
    "Minted",
    (tokenId: number, name: string, createdAt: string) => {
      // Call function to display toast
      showNotification({
        title: `${name} minted successfully!`,
        message: `Token ID: ${tokenId}. Created at: ${createdAt}.`,
      });
    }
  );
  return true;
};

export const uploadToIPFS = async (
  img: File,
  onComplete: (path: string, imageHash: string) => void
) => {
  const reader = new FileReader();
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization:
        "Basic " +
        Buffer.from(PROJECT_ID + ":" + PROJECT_SECRET).toString("base64"),
    },
  });

  /* upload the file */
  reader.onloadend = async function () {
    const buf = Buffer.from(reader.result as ArrayBuffer);
    const added = await client.add(buf);
    const hash = sha256(buf.toString()).toString(); // hashing, can be clearner
    onComplete(`https://ipfs.infura.io/ipfs/${added.path}`, hash);
  };

  reader.readAsArrayBuffer(img);
};

export const listNFT = async (
  contract: ethers.Contract,
  nftTokenId: string,
  price: string
) => {
  //TODO: link to listNFT contract
  await contract.list(nftTokenId, price);
  return true;
};

export const buyNFT = async (contract: ethers.Contract, listingId: string) => {
  //TODO: link to buyNFT contract
  return true;
};

export const getUserNFTs = async (
  contract: ethers.Contract,
  tokenContract: ethers.Contract
) => {
  //TODO: call getUserNFTs in marketplace contract.
  const userNFTs = await contract.getUserNFTs();

  // TODO: Fix anys
  var userNFTsWithMetaData: any = [];

  await Promise.all(
    userNFTs.map(async ({ tokenId, listed }: any) => {
      // Grab token metadata from uni token contract
      const tokenData = await tokenContract.getTokenData(tokenId);
      userNFTsWithMetaData.push({
        id: tokenId,
        name: tokenData.name,
        description: tokenData.description,
        imgUrl: tokenData.imgUrl,
        creator: tokenData.creator,
        owner: tokenData.owner,
        imgHash: tokenData.imgHash,
        createdAt: tokenData.createdAt,
        listed,
      });
    })
  );
  console.log(userNFTs);
  return userNFTsWithMetaData;
};
