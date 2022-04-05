import { FunctionComponent } from "react";
import { NFT } from "../../helpers/api";
import Button from "../Button/Button";

interface NFTHomeCardProps {
    NFT:NFT
}
 
const NFTHomeCard: FunctionComponent<NFTHomeCardProps> = (props:NFTHomeCardProps) => {
    return (
        <div className="card px-5 py-5">
            <img src={props.NFT.imgUrl} style={{height:'240px',width:'220px',objectFit:"cover"}} />
            <p className="text-gray-400 text-sm">{props.NFT.creator}</p>
            <p className="text-white">{props.NFT.name}</p>
            <Button style={{width:'100%'}}>Buy now</Button>
        </div>
    );
}
 
export default NFTHomeCard;