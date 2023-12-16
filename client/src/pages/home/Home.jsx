import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Dashboard from "../../components/dashboard/Dashboard";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="dashboard" style={{ borderLeft: "0.5px solid rgb(230, 227, 227)" }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;