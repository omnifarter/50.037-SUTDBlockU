import { FunctionComponent } from "react";
import { NFT } from "../../helpers/api";
import Button from "../Button/Button";
import Text from "../Text/Text";

interface NFTAccountCardProps {
    NFT:NFT
}
 
const NFTAccountCard: FunctionComponent<NFTAccountCardProps> = (props:NFTAccountCardProps) => {
    return (
        <div className="card px-5 py-5 w-full">
            <div className="flex">
                <img src={props.NFT.imgUrl} style={{height:'240px',width:'220px',objectFit:"cover"}} className='rounded-lg' />
                <div className='ml-5'>
                    <Text variant='h1' className="text-gray-400 font-bold">Current Listing</Text>
                    <Text variant='h1' className="font-bold text-4xl mt-2">{props.NFT.listed ? "0.010ETH hardcoded" : "Not Listed" }</Text>
                    <Text variant='p' className="text-gray-400 font-bold mt-5">Minted on</Text>
                    <Text variant='p' className="font-bold">{props.NFT.createdAt}</Text>

                </div>
            </div>
            <p className="text-gray-400 text-sm">{props.NFT.creator}</p>
            <p className="text-white">{props.NFT.name}</p>
            {!props.NFT.listed && <Button style={{width:'100%'}}>List now</Button>}
        </div>
    );
}
 
export default NFTAccountCard;