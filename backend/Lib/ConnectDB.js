import mongoose from "mongoose";
function connectionDB() {
    mongoose.connect(process.env.MongoURL)
        .then(() => {
            console.log("Db Connection Done")
        })
        .catch(() => {
            console.log("Db connection Error occure")
        })
}

export default connectionDB;