import {Outlet} from "react-router";
import FooterFirst from "../pages/C-footer/FooterFirst.tsx";

const LayoutWithoutBar = () => {

    return (
        <div>
            <Outlet/>
            <FooterFirst/>
        </div>
    );
};

export default LayoutWithoutBar;
