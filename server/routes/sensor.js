import { Router } from "express";
import mqtt from "../index.js"

const router = Router();

router.post('/pump', async (req, res) => {
    try {
        await mqtt.publish(`HaiChe/feeds/pump`,
            req.body.data ? "1" : "0"
        );
        res.status(200).json("Successfully")
    } catch (error) {
        res.status(500).json(error)
    }

})

export default router;
