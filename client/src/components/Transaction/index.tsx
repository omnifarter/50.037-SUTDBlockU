import { FunctionComponent } from "react";
import Text from "../Text/Text";

interface TransactionProps {
  seller: string;
  buyer: string;
  price: string;
  tokenId: string;
}

const Transaction: FunctionComponent<TransactionProps> = (
  props: TransactionProps
) => {
  return (
    <div className="card px-5 py-5 w-full">
      <Text variant="p" className="font-bold text-xs">
        Token ID
      </Text>
      <Text variant="p">{props.tokenId}</Text>
      <Text variant="p" className="font-bold text-xs">
        Seller
      </Text>
      <Text variant="p">{props.seller}</Text>
      <Text variant="p" className="font-bold text-xs">
        Buyer
      </Text>
      <Text variant="p">{props.buyer}</Text>

      <Text variant="p" className="font-bold text-xs">
        Price
      </Text>
      <Text variant="p">{`${props.price} ETH`}</Text>
    </div>
  );
};

export default Transaction;
