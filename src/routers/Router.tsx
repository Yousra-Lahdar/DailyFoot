import DashboardAgent from "../pages/B-body/DashboardAgent"
import LayoutWithBarAgent from "../layout/LayoutWithBarAgent"
import {Navigate, Route, Routes} from "react-router";
import Players from "../pages/B-body/Players";
import Agenda from "../pages/B-body/Agenda";
import Statistic from "../pages/B-body/Statistic";
import Setting from "../pages/B-body/Setting";
import Pay from "../pages/B-body/Pay";
import LayoutWithBarPlayer from "../layout/LayoutWithBarPlayer";
import DashboardPlayer from "../pages/B-body/DashboardPlayer";
import LayoutWithoutBar from "../layout/LayoutWithoutBar";
import Login from "../pages/B-body/Login.tsx";
import LoginPlayer from "../pages/B-body/LoginPlayer";
import ForgetPass from "../pages/B-body/ForgetPass.tsx";
import Register from "../pages/B-body/Register.tsx";
import ContactUs from "../pages/B-body/ContactUs.tsx";
import Home from "../pages/B-body/Home.tsx";
import PrivateRoute from "./PrivateRoute.tsx";


const Router = () => {

    return (
        <Routes>
            <Route element={<PrivateRoute allowedRoles={["AGENT"]} />}>
            <Route path="/1" element={<LayoutWithBarAgent/>}>
                <Route path="/1" element={<DashboardAgent />} />
                <Route path="/1/players" element={<Players/>}/>
                <Route path="/1/agenda" element={<Agenda/>}/>
                <Route path="/1/statistic" element={<Statistic/>}/>
                <Route path="/1/setting" element={<Setting/>}/>
                <Route path="/1/pay" element={<Pay/>}/>
            </Route>
            </Route>
            <Route element={<PrivateRoute allowedRoles={["PLAYER"]} />}>
            <Route path="/2" element={<LayoutWithBarPlayer/>}>
                <Route path="/2" element={<DashboardPlayer/>}/>
                <Route path="/2/agenda" element={<Agenda/>}/>
                <Route path="/2/statistic" element={<Statistic/>}/>
            </Route>
            </Route>
            <Route path="/" element={<LayoutWithoutBar/>}>
                <Route path="/" element={<Navigate to={"/Home"}/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/loginPlayer" element={<LoginPlayer/>}/>
                <Route path="/forgetPass" element={<ForgetPass/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/contactUs" element={<ContactUs/>}/>
            </Route>
        </Routes>

    );
};

export default Router;