import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { NFT } from "../../helpers/api";
import Button from "../Button/Button";
import Text from "../Text/Text";
import dayjs from "dayjs";
import { ethers } from "ethers";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

interface NFTAccountCardProps {
  NFT: NFT;
}

const NFTAccountCard: FunctionComponent<NFTAccountCardProps> = (
  props: NFTAccountCardProps
) => {
  const navigate = useNavigate();

  const onClickList = () => {
    navigate(`/${props.NFT.id}`);
  };
  return (
    <div className="card px-5 py-5 w-full">
      <div className="flex">
        <img
          src={props.NFT.imgUrl}
          style={{ height: "240px", width: "220px", objectFit: "cover" }}
          className="rounded-lg"
          alt={props.NFT.name}
        />
        <div className="ml-5">
          <Text variant="h1" className="text-gray-400 font-bold">
            Current Listing
          </Text>
          <Text variant="h1" className="font-bold text-4xl mt-2">
            {props.NFT.listed
              ? ethers.utils.formatEther(props.NFT.price?.toString() as string) + " ETH"
              : "Not Listed"}
          </Text>
          <Text variant="p" className="text-gray-400 font-bold mt-5">
            Minted on
          </Text>
          <Text variant="p" className="font-bold">
            {dayjs(props.NFT.createdAt).format("LLL")}
          </Text>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-1 mb-1">{props.NFT.creator}</p>
      <p className="text-white mb-5">{props.NFT.name}</p>
      {!props.NFT.listed && (
        <Button style={{ width: "100%" }} onClick={onClickList}>
          List now
        </Button>
      )}
    </div>
  );
};

export default NFTAccountCard;
