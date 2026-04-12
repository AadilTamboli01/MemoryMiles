import bcrypt from "bcryptjs"
import User from "../Models/user.model.js"
export const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ status: false, message: "All field are required !" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User Created SuccessFully" });
    } catch (err) {
        console.log("error occure in the signup controller ")
    }
}