import "./dashboard.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import axios from 'axios'
import { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';


const Dashboard = () => {
    const URL = 'https://io.adafruit.com/api/v2/HaiChe/feeds/'
    const [temp, setTemp] = useState(`Loading`);
    const [humiAir, setHumiAir] = useState(`Loading`);
    const [humiSoil, setHumiSoil] = useState(`Loading`);
    const [pump, setPump] = useState(0);
    // const [tempDiagram, setTempDiagram] = useState([])
    // const [humiAirDiagram, setHumiAirDiagram] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`${URL}`)
        setTemp(res.data[0].last_value)
        setHumiAir(res.data[1].last_value)
        setHumiSoil(res.data[2].last_value)
        setPump(parseInt(res.data[3].last_value))
    }

    const handleClick = async () => {
        try {
            await axios.post(`/sensor/pump`, {
                data: !pump
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        let timer;
        timer = setInterval(() => {
            const sec = new Date().getSeconds();
            if (sec % 5) return;
            fetchData();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <>
            <div className="wrapper">
                <div className="sensor" style={{ backgroundColor: "#d9534f" }}>
                    <div className="top">
                        <WbSunnyIcon className="tempIcon" />
                        <MoreVertIcon fontSize="small" />
                    </div>
                    <div className="bottom">
                        <div className="sensorChart">
                            <CircularProgressbar styles={buildStyles({ pathColor: "white", textColor: "white" })} value={temp} text={`${temp}°C`} strokeWidth={5} />
                        </div>
                        <p className="title">Nhiệt độ</p>
                    </div>
                </div>
                <div className="sensor" style={{ backgroundColor: "#5cb85c" }}>
                    <div className="top">
                        <WaterDropIcon className="humiSoil" />
                        <MoreVertIcon fontSize="small" />
                    </div>
                    <div className="bottom">
                        <div className="sensorChart">
                            <CircularProgressbar styles={buildStyles({ pathColor: "white", textColor: "white" })} value={humiSoil} text={`${humiSoil}%`} strokeWidth={5} />
                        </div>
                        <p className="title">Độ ẩm đất</p>
                    </div>
                </div>
                <div className="sensor" style={{ backgroundColor: "#337ab7" }}>
                    <div className="top">
                        <WaterDropIcon className="humiAir" />
                        <MoreVertIcon fontSize="small" />
                    </div>
                    <div className="bottom">
                        <div className="sensorChart">
                            <CircularProgressbar styles={buildStyles({ pathColor: "white", textColor: "white" })} value={humiAir} text={`${humiAir}%`} strokeWidth={5} />
                        </div>
                        <p className="title">Độ ẩm không khí</p>
                    </div>
                </div>
            </div>
            <div className="mid">
                <div className="diagram">
                </div>
                <div className="pumpControl">
                    <p className="title">Pump Control</p>
                    <label className="switch">
                        <input type="checkbox" checked={pump} onClick={handleClick} onChange={() => { setPump(!pump) }} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Dashboard;