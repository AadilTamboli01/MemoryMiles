import express from "express";

import { verifyUser } from "../Lib/verifyUser.js";

import { addStory, deleteStory, editStory, filterTravelStory, getAllStory, imageUpload, isFavouriteStory, searchStory } from "../Controllers/story.controller.js";
import upload from "../Lib/multer.js";
const router = express.Router();


router.post("/story", verifyUser, addStory);
router.put("/story/:id", verifyUser, editStory);
// router.delete("/image", verifyUser, deleteImage);
router.post("/image", upload.single("image"), imageUpload);
router.get("/allstory", verifyUser, getAllStory);
router.delete("/story/:id", verifyUser, deleteStory);
router.patch("/likeStory/:id", verifyUser, isFavouriteStory);
router.get("/search", verifyUser, searchStory);
router.get("/filer", verifyUser, filterTravelStory);

export default router;