import { Outlet } from "react-router";
import HeaderAgent from "../pages/A-header/HeaderAgent";
import FooterFirst from "../pages/C-footer/FooterWithLogo";

const LayoutWithBarAgent = () => {

    
    return (
        
        <>
        <HeaderAgent/>
        <Outlet/>
        <FooterFirst/>
        </>
    )
}

export default LayoutWithBarAgent;
