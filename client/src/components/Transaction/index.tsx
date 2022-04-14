import { FunctionComponent } from "react";
import { truncateAddress } from "../../helpers/api";
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
    <div className="card flex px-5 py-5 w-full justify-between">
      <div className="flex flex-col">
      <Text variant="p" className="text-xs">
        Token ID
      </Text>
      <Text variant="p">{props.tokenId}</Text>
      </div>
      <div className="flex flex-col">
      <Text variant="p" className="text-xs">
        Seller
      </Text>
      <Text variant="p">{truncateAddress(props.seller)}</Text>
      </div>
      <div className="flex flex-col">
      <Text variant="p" className="text-xs">
        Buyer
      </Text>
      <Text variant="p">{truncateAddress(props.buyer)}</Text>
      </div>
      <div className="flex flex-col">
      <Text variant="p" className="text-xs">
        Price
      </Text>
      <Text variant="p">{`${props.price} ETH`}</Text>
      </div>
    </div>
  );
};

export default Transaction;
