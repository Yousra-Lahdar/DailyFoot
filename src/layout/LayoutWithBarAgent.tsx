import { Outlet } from "react-router";
import HeaderAgent from "../pages/A-header/HeaderAgent.tsx";
import FooterSecond from "../pages/C-footer/FooterSecond.tsx";

const LayoutWithBarAgent = () => {

    return (
        <div>
            <HeaderAgent/>
            <Outlet/>
            <FooterSecond/>

        </div>
    );
};

export default LayoutWithBarAgent;
