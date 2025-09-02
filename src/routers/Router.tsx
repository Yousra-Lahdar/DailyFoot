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
import LoginAgent from "../pages/B-body/LoginAgent";
import LoginPlayer from "../pages/B-body/LoginPlayer";
import ForgetPass from "../pages/B-body/ForgetPass.tsx";
import Register from "../pages/B-body/Register.tsx";
import ContactUs from "../pages/B-body/ContactUs.tsx";
import TheDashboard from "../pages/B-body/TheDashboard.tsx";


const Router = () => {

    return (
        <Routes>
            <Route path="/1" element={<LayoutWithBarAgent/>}>
                <Route path="/1" element={<DashboardAgent />} />
                <Route path="/1/players" element={<Players/>}/>
                <Route path="/1/agenda" element={<Agenda/>}/>
                <Route path="/1/statistic" element={<Statistic/>}/>
                <Route path="/1/setting" element={<Setting/>}/>
                <Route path="/1/pay" element={<Pay/>}/>
            </Route>
            <Route path="/2" element={<LayoutWithBarPlayer/>}>
                <Route path="/2" element={<DashboardPlayer/>}/>
                <Route path="/2/agenda" element={<Agenda/>}/>
                <Route path="/2/statistic" element={<Statistic/>}/>
            </Route>
            <Route path="/3" element={<LayoutWithoutBar/>}>
                <Route path="/3" element={<Navigate to={"/3/theDashboard"}/>}/>
                <Route path="/3/theDashboard" element={<TheDashboard/>}/>
                <Route path="/3/loginAgent" element={<LoginAgent/>}/>
                <Route path="/3/loginPlayer" element={<LoginPlayer/>}/>
                <Route path="/3/forgetPass" element={<ForgetPass/>}/>
                <Route path="/3/register" element={<Register/>}/>
                <Route path="/3/contactUs" element={<ContactUs/>}/>
            </Route>
        </Routes>

    );
};

export default Router;