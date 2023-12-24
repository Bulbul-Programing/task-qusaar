import { Outlet } from "react-router-dom";
import Navbar from "./SharePage/Navbar/Navbar";

const Rote = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Rote;