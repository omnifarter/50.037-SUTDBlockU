import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import NFTHomeCard from "../components/NFTHomeCard";
import Text from "../components/Text/Text";
import { getAllNFTs, NFT } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const contextData = useContext(Context);
  const [NFTs, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const onLoad = async () => {
    // setNFTs([
    //   {
    //     id: "0",
    //     name: "Apes together Stronk",
    //     description:
    //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     imgUrl:
    //       "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
    //     creator: "Sgt TSK",
    //     owner: "Sgt TSK",
    //     imgHash: "HASH",
    //     createdAt: new Date().toString(),
    //     listed: true,
    //     price: 12,
    //   } as NFT,
    // ]);
    const allNFTs = await getAllNFTs(
      contextData.marketplaceContract as ethers.Contract,
      contextData.uniTokenContract as ethers.Contract
    );
    console.log(allNFTs);
    setNFTs(allNFTs);
    setLoading(false);
  };
  useEffect(() => {
    contextData.marketplaceContract && onLoad();
  }, [contextData]);
  return (
    <div className="flex flex-col h-screen w-full items-center background">
      <Header />
      <Text variant="h1" className="p-4">
        NFTs for everyone!
      </Text>
      <div
        className="flex flex-wrap flex-row self-center justify-between"
        style={{ width: "820px" }}
      >
        {loading == false &&
          NFTs.map((NFT) => {
            return <NFTHomeCard NFT={NFT} key={NFT.id} />;
          })}
      </div>
    </div>
  );
};

export default Home;
