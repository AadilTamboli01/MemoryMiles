import express from "express"
import dotenv from "dotenv"
import connectionDB from "./Lib/ConnectDB.js";
import cors from "cors"
dotenv.config();
connectionDB()
const app = express();
app.get("/", (req, res) => {
    res.send("request on root")
})
app.listen(3000, () => {
    console.log("App is listening of port 3000")
})


// Username tamboliaadil59_db_user

// password EMLsW2vY6oODmsKu