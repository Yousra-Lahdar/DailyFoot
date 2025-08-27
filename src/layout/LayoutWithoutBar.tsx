import {Outlet} from "react-router";

const LayoutWithoutBar = () => {

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default LayoutWithoutBar;
