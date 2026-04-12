import jwt from "jsonwebtoken"

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("Unauthorized User ")
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        next()

    } catch (error) {
        console.log("error in verifi user", error.message)
    }
}