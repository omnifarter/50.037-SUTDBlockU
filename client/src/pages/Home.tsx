import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Text from "../components/Text/Text";

interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {
    return (
        <div className="flex flex-col h-screen w-full items-center background" >
            <Header />
            <Text variant="h1" className="p-4">This is the home page!!</Text>
        </div>
    );
}
 
export default Home;