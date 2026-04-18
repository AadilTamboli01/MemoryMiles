import User from "../Models/user.model.js"
export const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.json(404).json("Unauthorized access.")
        }

        res.status(200).json({ success: true, data: user });

    } catch (err) {


        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const signout = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            // secure: true, // only if you're using HTTPS
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}