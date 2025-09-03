import {Outlet} from "react-router";
import FooterWithLogo from "../pages/C-footer/FooterWithLogo.tsx";

const LayoutWithoutBar = () => {

    return (
        <div>
            <Outlet/>
            <FooterWithLogo/>
        </div>
    );
};

export default LayoutWithoutBar;
