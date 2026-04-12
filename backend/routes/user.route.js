import express from "express";
import { signup } from "../Controllers/auth.controller.js";
import { getUser } from "../Controllers/user.controller.js";
import { verifyUser } from "../Lib/verifyUser.js";
const router = express.Router();


router.get("/get-user", verifyUser, getUser);

export default router;