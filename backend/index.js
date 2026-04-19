import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectionDB from "./Lib/ConnectDB.js";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import storyRouter from "./routes/story.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}));
connectionDB()




app.use("/api/auth", authRouter);

app.use("/api/story", storyRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    res.send("request on root")
})
const PORT = process.env.PORT||3000;
app.listen(PORT, () => { 
    console.log("App is listening of port 3000")
})


// Username tamboliaadil59_db_user

// password EMLsW2vY6oODmsKu