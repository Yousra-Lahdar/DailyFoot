import { Outlet } from "react-router";
import HeaderPlayer from "../pages/A-header/HeaderPlayer";
import FooterFirst from "../pages/C-footer/FooterFirst";

const LayoutWithBarPlayer = () => {

    return (
        <>
        <HeaderPlayer/>
        <Outlet/>
        <FooterFirst/>
        </>
    )
}

export default LayoutWithBarPlayer;
