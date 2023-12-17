import express from "express";
import cors from "cors";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors('*'));
app.use(express.json());

const port = process.env.PORT || 4000;
const apiUrl = process.env.LONGSHOT_AI_API_URL;
const token = process.env.LONGSHOT_AI_TOKEN;

app.post("/", async (req, res) => {
    const { input } = req.body;
    const requestData = { text: input };

    const response = await axios.post(apiUrl, requestData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("API Response:", response.data);
    res.status(200).send({bot: response.data});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
