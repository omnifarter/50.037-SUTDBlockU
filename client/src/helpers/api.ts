import { ethers } from "ethers";

export type NFT = {
    id: string;
    name:string;
    description:string;
    imgUrl: string,
    creator: string,
    imgHash: string,
    createdAt: string
}

export const getAllNFTs = async (contract: ethers.Contract) => {
    //TODO: call marketplace contract here...
    await new Promise(r => setTimeout(r, 1000));
    return [
        {
            description:"a fake NFT",
            name:"a duck",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
            creator:"TSK"
        },
        {
            description:"a fake NFT",
            name:"a duck",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
            creator:"TSK"
        },
        {
            description:"a fake NFT",
            name:"a duck",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
            creator:"TSK"
        },
        {
            description:"a fake NFT",
            name:"a duck",
            imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/440px-Mallard2.jpg",
            creator:"TSK"
        }
    ] as NFT[]
}

export const mintNFT = async (contract: ethers.Contract, image:string) => {
//TODO: verify image and call UniToken contract here...
    return true
}