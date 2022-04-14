import { LoadingOverlay, TextInput } from "@mantine/core";
import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Text from "../components/Text/Text";
import { buyNFT, getNFTDetails, listNFT, NFT } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

interface NFTDetailsProps {}

const NFTDetails: FunctionComponent<NFTDetailsProps> = (props) => {
  const { id } = useParams();
  const contextData = useContext(Context);
  const [NFT, setNFT] = useState<NFT>();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const getNFT = async () => {
    const nft = await getNFTDetails(
      contextData.uniTokenContract as ethers.Contract,
      id as string
    );
    setNFT(nft);
    setLoading(false);
  };

  useEffect(() => {
    contextData.uniTokenContract && getNFT();
  }, [contextData]);

  useEffect(() => {
    console.log(price.toString());
  }, [price]);

  const onClickList = async () => {
    console.log(price.toString());
    await listNFT(
      contextData.uniTokenContract as ethers.Contract,
      id as string,
      price.toString(),
      callback
    );
  };

  const onClickBuy = async () => {
    console.log(NFT?.price);
    await buyNFT(
      contextData.uniTokenContract as ethers.Contract,
      parseInt(NFT?.id as string),
      //@ts-ignore
      NFT?.price as ethers.BigNumber,
      callback
    );
    //TODO: notify user that buying is successful
  };

  const callback = () => {
    return navigate("/account");
  };

  return (
    <div className="flex flex-col items-center w-full background">
      <LoadingOverlay visible={loading} style={{position:'fixed',top:'0',right:'0',bottom:'0',left:'0'}} />
      <Header />
      <div style={{ maxWidth: "820px" }} className="mx-5 lg:mx-0" >
        <Text variant="h1" className="py-4">
          {NFT?.name}
        </Text>
        <div className="flex">
          <img
            src={NFT?.imgUrl || ""}
            style={{ height: "240px", width: "220px", objectFit: "cover" }}
            className="rounded-lg mr-5"
            alt={NFT?.name}
          />
          <div>
            <Text variant="p" className="text-xs text-gray-400 font-bold mt-1">
              Description
            </Text>
            <Text variant="p">{NFT?.description}</Text>
          </div>
        </div>
        <div className="mt-3">
          <Text variant="p" className="text-xs text-gray-400 font-bold">
            Current Listing
          </Text>
          <Text variant="p" className="font-bold ">
            {NFT?.listed
              ? ethers.utils.formatEther(NFT?.price?.toString() as string) +
                " ETH"
              : "Not Listed"}
          </Text>
          <Text variant="p" className="text-xs text-gray-400 font-bold mt-1">
            Minted on
          </Text>
          <Text variant="p" className="font-bold">
            {dayjs(NFT?.createdAt).format("LLL")}
          </Text>
        </div>
        {!NFT?.listed ? (
          <div className="mt-5 flex items-end">
            <TextInput
              label="List Price"
              type="number"
              styles={{ label: { color: "white" }, input: { width: "320px" } }}
              className="mr-5"
              rightSection={
                <Text
                  variant="p"
                  style={{ color: "grey", marginRight: "24px" }}
                >
                  ETH
                </Text>
              }
              onChange={(evt) => {
                setPrice(parseFloat(evt.target.value));
              }}
              defaultValue={0}
            />
            <Button onClick={onClickList}>List now</Button>
          </div>
        ) : (
          <div className="flex">
            <Button wFull onClick={onClickBuy} className="mt-5">
              Buy now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetails;
