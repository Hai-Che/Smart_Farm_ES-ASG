import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <img src={Logo} alt="" className="Logo" />
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">SMART FARM</span>
                </Link>
            </div>
            <hr />
            <div className="bottom">
                <ul>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>History</span>
                        </li>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Alarm</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;