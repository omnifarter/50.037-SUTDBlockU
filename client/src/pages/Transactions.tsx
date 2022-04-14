import { ethers } from "ethers";
import Header from "../components/Header/Header";
import { Context } from "../helpers/useMetaMask";

import { FunctionComponent, useContext, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import { getTransactionHistory, TransactionDetails } from "../helpers/api";
import { Button, LoadingOverlay } from "@mantine/core/";

interface TransactionProps {}

const Transactions: FunctionComponent<TransactionProps> = () => {
  const contextData = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTransactions = async () => {
    const allTransactions = await getTransactionHistory(
      contextData.uniTokenContract as ethers.Contract
    );
    console.log(allTransactions);
    setTransactions(allTransactions);
    setLoading(false);
  };
  useEffect(() => {
    contextData.uniTokenContract && getTransactions();
  }, [contextData]);
  return (
    <div className="flex flex-col h-screen w-full items-center background">
      <Header />
      <LoadingOverlay visible={loading} style={{position:'fixed',top:'0',right:'0',bottom:'0',left:'0'}} />
      <div className="flex flex-col w-full px-5 lg:px-0" style={{ maxWidth: "820px" }}>
        {transactions.map((tx: TransactionDetails) => {
          return (
            <Transaction
              key={tx.tokenId}
              seller={tx.seller}
              buyer={tx.buyer}
              price={ethers.utils.formatEther(tx.price.toString())}
              tokenId={tx.tokenId.toString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
