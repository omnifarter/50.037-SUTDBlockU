import { ethers } from "ethers";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import NFTHomeCard from "../components/NFTHomeCard";
import Text from "../components/Text/Text";
import { getAllNFTs, NFT } from "../helpers/api";
import {Context} from '../helpers/useMetaMask'
interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {
    const contextData = useContext(Context)
    const [NFTs, setNFTs] = useState<NFT[]>([])
    const [loading, setLoading] = useState(true)
    const onLoad = async () => {
        const allNFTs = await getAllNFTs(contextData.uniTokenContract as ethers.Contract)
        console.log(allNFTs)
        setNFTs(allNFTs)
        setLoading(false)
    }
    useEffect(()=>{
        onLoad()
    },[])
    return (
        <div className="flex flex-col h-screen w-full items-center background" >
            <Header />
            <Text variant="h1" className="p-4">This is the home page!!</Text>
            <div className="flex flex-wrap flex-row self-center justify-between" style={{width:'820px'}}>
            {loading == false && NFTs.map((NFT)=>{
                return <NFTHomeCard NFT={NFT} />
            })}
            </div>
        </div>
    );
}
 
export default Home;