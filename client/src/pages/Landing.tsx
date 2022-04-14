import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text/Text";
import { Context } from "../helpers/useMetaMask";

interface LandingProps {
    
}
 
const Landing: FunctionComponent<LandingProps> = () => {
    const contextData = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
        contextData.metaAddress && navigate('/')
    },[contextData])
    return (
        <div className="flex flex-col h-screen w-full items-center background">
            <img
            src="https://cdn-icons-png.flaticon.com/512/2592/2592201.png"
            alt="logo"
            className="mt-16"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "cover",
            }}
          />
            <Text variant="h1">Welcome to UniBlock! </Text>
            <Text variant="p" className="mt-4">To get started, please connect your MetaMask account.</Text>
            <a className="underline text-white text-xs mt-2" href="https://metamask.io/">Don't have MetaMask? Get it now.</a>
        </div>
    );
}
 
export default Landing;