import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/recipeRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("DB connected successfully.")
        app.listen(PORT, () =>
            console.log(`Server is running on port: ${PORT}`)
        );
    })
    .catch(
        (error) => {
            console.log(error);
        }
    )

// (Más tarde necesitas decirle al app principal que use este router)
app.use("/api", route)