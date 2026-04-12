import express from "express"
import dotenv from "dotenv"
import connectionDB from "./Lib/ConnectDB.js";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
connectionDB()


const app = express();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    res.send("request on root")
})
app.listen(3000, () => {
    console.log("App is listening of port 3000")
})


// Username tamboliaadil59_db_user

// password EMLsW2vY6oODmsKu