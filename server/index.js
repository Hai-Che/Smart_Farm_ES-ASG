import express from "express"
import dotenv from 'dotenv';
import sensorRoute from "./routes/sensor.js"
import mqtt from "mqtt";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/sensor", sensorRoute)

const username = process.env.ADA_USERNAME
const topics = [
    `${username}/feeds/temp`,
    `${username}/feeds/pump`,
    `${username}/feeds/humi-air`,
    `${username}/feeds/humi-soil`,
];
const client = mqtt.connect(`mqtt://io.adafruit.com`, {
    host: 'io.adafruit.com',
    port: 1883,
    username: username,
    password: process.env.ADA_KEY,
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!")
})

client.on("connect", () => {
    console.log('Connected to Adafruit IO');
    for (let topic of topics) {
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`);
        });
    }
});

client.on("message", (topic, message) => {
    console.log("Received Message:", topic, message.toString());
});

const publish = (topic, data) => {
    client.publish(topic, data, { qos: 0, retain: false }, (error) => {
        console.log("Published to topic " + topic + " data: " + data);
        if (error) {
            console.error(error);
        }
    });
}

export default { publish }