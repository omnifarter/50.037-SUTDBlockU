import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import NFTAccountCard from "../components/NFTAccountCard";
import Text from "../components/Text/Text";
import { getUserNFTs, NFT, truncateAddress } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";
import {ReactComponent as EthereumLogo} from "../assets/ethereum-eth-logo.svg"
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
            <img className="rounded-full w-14 h-14 border-gray-200 border-solid border-2 mr-2" src='https://storage.googleapis.com/opensea-static/opensea-profile/14.png' />
            <div className="rounded-3xl flex border-gray-500 border-solid border-0.5 py-2 px-4 bg-white">
              <EthereumLogo style={{height:'24px',marginRight:"8px"}} />
              <Text variant="p" black className="m-0 p-0">{truncateAddress(contextData.metaAddress || "")}</Text>
            </div>
        </div>
        <Link to="/mint">
          <Button style={{ width: "100%" }}>Mint NFT</Button>
        </Link>
      </div>
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
