import bcrypt from "bcryptjs"
import User from "../Models/user.model.js"
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ status: false, message: "Please complete all fields to continue." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ status: false, message: "A user with this email already exists.  !" });
        }

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,      // JS se access nahi hoga (secure)
            secure: true,        // sirf HTTPS me chalega
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({ success: true, message: "Account created successfully. You can now log in." });
    } catch (err) {
      

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ status: false, message: "Please complete all fields to continue." });
        }

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json("No user found with this email.");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid credentials. Please try again.");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,      // JS se access nahi hoga (secure)
            secure: true,        // sirf HTTPS me chalega
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        const { password: pass, ...rest } = user._doc
        res.status(200).json(rest);
    } catch (err) {
      

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}