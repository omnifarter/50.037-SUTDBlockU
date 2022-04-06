import { ethers } from "ethers";

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
  //   return [
  //     {
  //       description: "a fake NFT",
  //       name: "a duck",
  //       imgUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
  //       creator: "TSK",
  //     },
  //     {
  //       description: "a fake NFT",
  //       name: "a duck",
  //       imgUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
  //       creator: "TSK",
  //     },
  //     {
  //       description: "a fake NFT",
  //       name: "a duck",
  //       imgUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
  //       creator: "TSK",
  //     },
  //     {
  //       description: "a fake NFT",
  //       name: "a duck",
  //       imgUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
  //       creator: "TSK",
  //     },
  //   ] as NFT[];
};

export const mintNFT = async (contract: ethers.Contract, image: string) => {
  //TODO: upload to IPFS and pass url to mint function in contract
  //TODO: listen on event, using provider.on()
  return true;
};

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

export const getUserNFTs = (contract: ethers.Contract) => {
  //TODO: call getUserNFTs in marketplace contract.
  return [
    {
      description: "a fake NFT",
      name: "a duck",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
      creator: "TSK",
    },
    {
      description: "a fake NFT",
      name: "a duck",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
      creator: "TSK",
    },
  ] as NFT[];
};
