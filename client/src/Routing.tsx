import { FunctionComponent } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Mint from "./pages/Mint";

 
const Routing: FunctionComponent<any> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/account' element={< Account/>} />
                <Route path='/mint' element={<Mint />} />
            </Routes>
        </BrowserRouter>
    );
}
 
export default Routing;