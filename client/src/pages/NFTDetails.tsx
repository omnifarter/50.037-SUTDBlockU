import { LoadingOverlay, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Text from "../components/Text/Text";
import { buyNFT, getNFTDetails, listNFT, NFT } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";

interface NFTDetailsProps {}

const NFTDetails: FunctionComponent<NFTDetailsProps> = (props) => {
  const { id } = useParams();
  const contextData = useContext(Context);
  const [NFT, setNFT] = useState<NFT>();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  const getNFT = async () => {
    const nft = await getNFTDetails(
      contextData.uniTokenContract as ethers.Contract,
      id as string
    );
    setNFT(nft);
    setLoading(false);
  };

  useEffect(() => {
    getNFT();
  }, []);

  const onClickList = async () => {
    await listNFT(
      contextData.marketplaceContract as ethers.Contract,
      id as string,
      price.toString()
    );
    //TODO: notify user that listing is successful
  };

  const onClickBuy = async () => {
    await buyNFT(
      contextData.marketplaceContract as ethers.Contract,
      id as string // TODO: Should pass in listingId here instead!
    );
    //TODO: notify user that buying is successful
  };
  return (
    <div className="flex flex-col items-center h-screen w-full background">
      <Header />
      <LoadingOverlay visible={loading} />
      <div style={{ width: "820px" }}>
        <Text variant="h1" className="p-4">
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
            {NFT?.listed ? NFT.price + " ETH" : "Not Listed"}
          </Text>
          <Text variant="p" className="text-xs text-gray-400 font-bold mt-1">
            Minted on
          </Text>
          <Text variant="p" className="font-bold">
            {NFT?.createdAt}
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
                setPrice(parseInt(evt.target.value));
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
