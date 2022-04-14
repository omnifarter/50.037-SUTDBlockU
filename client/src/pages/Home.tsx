import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import NFTHomeCard from "../components/NFTHomeCard";
import Text from "../components/Text/Text";
import { getListedNFTs, NFT } from "../helpers/api";
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
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-4"
        style={{ maxWidth: "820px" }}
      >
        {loading === false &&
          NFTs.filter((NFT: NFT) => NFT.name.toLowerCase().includes(filter)).map((NFT) => {
            return <NFTHomeCard NFT={NFT} key={NFT.id} />;
          })}
      </div>
    </div>
  );
};

export default Home;
