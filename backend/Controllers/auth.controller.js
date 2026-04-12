import bcrypt from "bcryptjs"
import User from "../Models/user.model.js"
import jwt from "jsonwebtoken"
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
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ status: false, message: "All field are required !" });
        }

        let user = User.findOne({ email }).select("-password")

        if (!user) {
            return res.status(404).json("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Wrong Credential ");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,      // JS se access nahi hoga (secure)
            secure: true,        // sirf HTTPS me chalega
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({ success: true, message: "User Loggedin SuccessFully" });
    } catch (err) {
        console.log("error occure in the signup controller ")
    }
}