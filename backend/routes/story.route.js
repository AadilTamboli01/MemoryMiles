import express from "express";

import { verifyUser } from "../Lib/verifyUser.js";
import { addStory, getAllStory } from "../Controllers/story.controller.js";
const router = express.Router();


router.post("/story", verifyUser, addStory);
router.get("/allstory", verifyUser, getAllStory);

export default router;