import User from "../Models/user.model.js"
export const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.json(404).json("UnAuthorized")
        }

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        console.log("Error in the get user controller ")
    }
}