import {Outlet} from "react-router";
import HeaderPlayer from "../pages/A-header/HeaderPlayer.tsx";
import FooterSecond from "../pages/C-footer/FooterSecond.tsx";

const LayoutWithBarPlayer = () => {

    return (
        <>
            <HeaderPlayer/>
            <Outlet/>
            <FooterSecond/>
        </>
    );
};

export default LayoutWithBarPlayer;
