import express from "express";

import { verifyUser } from "../Lib/verifyUser.js";

import { addStory, getAllStory, imageUpload } from "../Controllers/story.controller.js";
import upload from "../Lib/multer.js";
const router = express.Router();


router.post("/story", verifyUser, addStory);
router.post("/image", upload.single("image"), imageUpload);
router.get("/allstory", verifyUser, getAllStory);

export default router;