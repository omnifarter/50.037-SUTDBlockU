import { ethers } from "ethers";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { buyNFT, NFT, truncateAddress } from "../../helpers/api";
import Button from "../Button/Button";

interface NFTHomeCardProps {
  NFT: NFT;
}

const NFTHomeCard: FunctionComponent<NFTHomeCardProps> = (
  props: NFTHomeCardProps
) => {
  const navigate = useNavigate();

  const buyHandler = () => {
    navigate(`/${props.NFT.id}`);
  };

  return (
    <div className="card px-5 py-5 ">
      <img
        src={props.NFT.imgUrl}
        style={{
          height: "240px",
          width: "220px",
          objectFit: "cover",
          margin: "auto",
        }}
        className="rounded-md"
        alt={props.NFT.name}
      />
      <p className="text-white py-1">{props.NFT.name}</p>
      <p className="text-white">Price: {ethers.utils.formatEther(props.NFT.price?.toString() as string)} ETH</p>
      <p className="text-gray-300 text-sm">
        Creator: {truncateAddress(props.NFT.creator)}
      </p>
      <Button style={{ width: "100%", marginTop: "5px" }} onClick={buyHandler}>
        Buy now
      </Button>
    </div>
  );
};

export default NFTHomeCard;
