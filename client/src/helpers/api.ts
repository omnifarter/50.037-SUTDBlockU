import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { PROJECT_ID, PROJECT_SECRET } from "./constants";
import sha256 from "crypto-js/sha256";
import Utf8 from "crypto-js/enc-utf8";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

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

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 7)}...${address.slice(address.length - 7)}`;
};

export const getListedNFTs = async (contract: ethers.Contract) => {
  //TODO: call marketplace contract here...
  const allListedNFTs = await contract.getListedNFTs();

  return allListedNFTs;
};

export const mintNFT = async (
  contract: ethers.Contract,
  nft: MintNFT,
  callback: () => void
) => {
  console.log("this is uploaded", nft);

  const date = new Date().toString();

  try {
    await contract.mint(
      nft.name,
      nft.description,
      nft.imgUrl,
      nft.imgHash,
      date
    );
    showNotification({
      title: "Mint transaction is loading!",
      message: "Please be patient.",
      loading: true,
    });

    contract.on(
      "Minted",
      (tokenId: number, name: string, createdAt: string) => {
        showNotification({
          title: `${name} minted successfully!`,
          message: `Created at: ${dayjs(createdAt).format(
            "LLL"
          )}. Token Id: ${tokenId}`,
          color: "green",
        });
        callback();
      }
    );
  } catch (err) {
    showNotification({
      title: "Minting unsuccessful!",
      message: "Image might already be uploaded.",
      color: "red",
    });
    callback();
  }
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
  price: string,
  callback: () => void
) => {
  //TODO: link to listNFT contract
  try {
    await contract.list(nftTokenId, ethers.utils.parseEther(price));
    showNotification({
      title: "List transaction is loading!",
      message: "Please be patient.",
      loading: true,
    });
    contract.on(
      "ItemListedSuccessfully",
      (listingId: number, tokenId: number, price: number) => {
        showNotification({
          title: `Token Id ${tokenId} listed successfully!`,
          message: `Price: ${ethers.utils.parseEther(
            price.toString()
          )} Listing Id: ${listingId}`,
          color: "green",
        });
        callback();
      }
    );
  } catch {
    showNotification({
      title: "Token failed to list!",
      message: "Token might already be listed!",
      color: "red",
    });
    callback();
  }
};

export const buyNFT = async (
  contract: ethers.Contract,
  tokenId: number,
  price: ethers.BigNumber,
  callback: () => void
) => {
  //TODO: link to buyNFT contract
  const options = { value: price };
  try {
    await contract.buyItem(tokenId, options);
    showNotification({
      title: "Buy transaction is loading!",
      message: "Please be patient.",
      loading: true,
    });
    contract.on("ItemBought", (seller: string, name: string, price: number) => {
      showNotification({
        title: `${name} bought successfully!`,
        message: `Price: ${ethers.utils.parseEther(
          price.toString()
        )} Seller: ${seller}`,
        color: "green",
      });
      callback();
    });
  } catch {
    showNotification({
      title: "Failed to buy!",
      message: "Item might have already been bought.",
      color: "red",
    });
  }
};

export const getUserNFTs = async (contract: ethers.Contract) => {
  const userNFTs = await contract.getUserNFTs();
  return userNFTs;
};

export const getNFTDetails = async (
  contract: ethers.Contract,
  tokenId: string
) => {
  return await contract.getTokenData(tokenId);
};
