import { FunctionComponent } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";

 
const Routing: FunctionComponent<any> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/account' element={< Account/>} />
            </Routes>
        </BrowserRouter>
    );
}
 
export default Routing;