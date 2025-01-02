import { Outlet } from "react-router-dom";
import SideBar from "../Components/Dashboard/SideBar";


const DashboardLayout = () => {
    return (
        <div>
            <SideBar></SideBar>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;