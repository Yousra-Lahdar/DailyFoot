import { Outlet } from "react-router";
import HeaderAgent from "../pages/A-header/HeaderAgent.tsx";
import FooterWithoutLogo from "../pages/C-footer/FooterWithoutLogo.tsx";

const LayoutWithBarAgent = () => {

    return (
        <div>
            <HeaderAgent/>
            <Outlet/>
            <FooterWithoutLogo/>

        </div>
    );
};

export default LayoutWithBarAgent;
