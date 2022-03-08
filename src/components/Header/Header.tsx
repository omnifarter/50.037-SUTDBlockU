import { useState } from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg'
import useCheckMobileScreen from "./useCheckMobileScreen";


interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    
    const isMobile = useCheckMobileScreen()
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    return (
        <>
        <div className={"flex justify-around items-center w-full py-4" + (isMobile ? " hidden"  : "")}>
            <Link to="/">
                <Text variant="p" className="text-white text-2xl">SUTDBlockU</Text>
            </Link>
            <input className="w-3/12 flex justify-center border-2 rounded-md h-full focus:outline-none focus:border-blue-300 p-2" placeholder="Search..." />
            <Link to="/account">
                <Button>
                    My Account
                </Button>
                </Link>
        </div>
        <div className={"flex-col flex w-full px-10"+(!isMobile ? " hidden" : "")}>  
            <div className={"flex justify-between items-center w-full py-4"+(!isMobile ? " hidden" : "")}>
                <Text variant="p" className="text-white text-2xl">SUTDBlockU</Text>
                <MenuIcon onClick={toggleExpanded} />
            </div>  
            { isExpanded && <div className="relative text-right self-end" >
                    <Link to="/">
                        <Text variant="p">Home</Text>
                    </Link>
                    <Link to="/account">
                        <Text variant="p">Account</Text>
                    </Link>
                    </div>
            }
        </div>

        </>
    );
}
 
export default Header;