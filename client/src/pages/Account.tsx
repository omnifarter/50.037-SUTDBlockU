import { FunctionComponent } from "react";
import Header from "../components/Header/Header";
import Text from "../components/Text/Text";

interface AccountProps {
    
}
 
const Account: FunctionComponent<AccountProps> = () => {
    return (
        <div className="flex flex-col h-screen w-full items-center background" >
            <Header />
            <Text variant="h1" className="p-4">This is the Account page!!</Text>
        </div>
    );
}
 
export default Account;