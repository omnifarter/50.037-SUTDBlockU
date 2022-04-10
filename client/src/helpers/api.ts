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
  listingId: number;
  price?: number;
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
        listingId: listedItem.listingId,
        price: listedItem.price,
      });
    })
  );
  console.log("HERE");

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
  await contract.list(nftTokenId, price); //TODO: need to pass in
  await contract.on(
    "ItemListedSuccessfully",
    (listingId: number, tokenId: number, price: number) => {
      showNotification({
        title: `Token Id ${tokenId} listed successfully!`,
        message: `Price: ${price} Listing Id: ${listingId}`,
      });
    }
  );
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
  const userNFTs = await contract.getUserNFTs();

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

  console.log("Called UserNFTs");
  return userNFTsWithMetaData;
};

export const getNFTDetails = async (
  contract: ethers.Contract,
  tokenId: string
) => {
  return await contract.getTokenData(tokenId);
  // return {
  //   id: "0",
  //   name: "Apes together Stronk",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   imgUrl:
  //     "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
  //   creator: "Sgt TSK",
  //   owner: "Sgt TSK",
  //   imgHash: "HASH",
  //   createdAt: new Date().toString(),
  //   listed: true,
  //   price: 12,
  // } as NFT;
};
