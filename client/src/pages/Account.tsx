import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import NFTAccountCard from "../components/NFTAccountCard";
import Text from "../components/Text/Text";
import { getUserNFTs, NFT } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";

interface AccountProps {}

const Account: FunctionComponent<AccountProps> = () => {
  const contextData = useContext(Context);
  const [NFTs, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const onLoad = async () => {
    const allNFTs = await getUserNFTs(
      contextData.uniTokenContract as ethers.Contract
    );
    setNFTs(allNFTs);
    setLoading(false);
  };
  useEffect(() => {
    contextData.uniTokenContract && onLoad();
  }, [contextData]);

  return (
    <div className="flex flex-col h-screen w-full items-center background">
      <Header />
      <div style={{ width: "820px" }}>
        <Link to="/mint">
          <Button style={{ width: "100%" }}>Mint NFT</Button>
        </Link>
        <div className="mt-10">
          <Text variant="h1">My NFTs</Text>
          {loading == false &&
            NFTs.map((NFT) => {
              return <NFTAccountCard NFT={NFT} key={NFT.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Account;
