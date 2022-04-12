import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import NFTHomeCard from "../components/NFTHomeCard";
import Text from "../components/Text/Text";
import { getListedNFTs, NFT } from "../helpers/api";
import listen from "../helpers/listen";
import { Context } from "../helpers/useMetaMask";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const contextData = useContext(Context);
  const [NFTs, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const onLoad = async () => {
    const allNFTs = await getListedNFTs(
      contextData.uniTokenContract as ethers.Contract
    );
    console.log(allNFTs);
    setNFTs(allNFTs);
    setLoading(false);
  };

  useEffect(() => {
    contextData.uniTokenContract && onLoad();
  }, [contextData]);

  useEffect(() => {}, [filter]);
  return (
    <div className="flex flex-col h-screen w-full items-center background">
      <Header setFilter={setFilter} />
      <Text variant="h1" className="p-4">
        NFTs for everyone!
      </Text>
      <div
        className="flex flex-wrap flex-row self-center justify-between"
        style={{ width: "820px" }}
      >
        {loading === false &&
          NFTs.filter((NFT: NFT) => NFT.name.includes(filter)).map((NFT) => {
            return <NFTHomeCard NFT={NFT} key={NFT.id} />;
          })}
      </div>
    </div>
  );
};

export default Home;
