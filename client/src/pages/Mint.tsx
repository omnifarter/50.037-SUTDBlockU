import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import MintForm from "../components/MintForm";
import { MintNFT, mintNFT } from "../helpers/api";
import { Context } from "../helpers/useMetaMask";
import { LoadingOverlay } from "@mantine/core";

interface MintProps {}

const Mint: FunctionComponent<MintProps> = () => {
  const [loading, setLoading] = useState(false);
  const contextData = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = async (nft: MintNFT) => {
    setLoading(true);
    await mintNFT(
      contextData.uniTokenContract as ethers.Contract,
      nft,
      callback
    );
    setLoading(false);
  };

  const callback = () => {
    return navigate("/account");
  };
  return (
    <div className="flex flex-col h-screen w-full items-center background">
      <LoadingOverlay visible={loading} />
      <Header />
      <div style={{ maxWidth: "820px" }} className="w-full mx-5 md:mx-0">
        <MintForm onSubmit={onSubmit} />
        <div className="mt-2">
          <Link to="/account">
            <Button variant="Secondary" wFull>
              Return to my NFTs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mint;
