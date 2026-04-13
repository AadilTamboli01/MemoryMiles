import Story from "../Models/story.model.js";
import cloudinary from "../Lib/cloudinary.js";
import { raw } from "express";
export const addStory = async (req, res) => {
    try {
        const { title, story, visitedDate, imageURL, visitedLocation } = req.body;
        userId = req.userId;

        // verify required field 
        if (!title || !story || !visitedDate || !imageURL || !visitedLocation) {
            return res.status(400).json({ success: false, message: "All Fields are required  " })
        }

        // convert visited date 
        const parsedVisitedDate = new Date(parseInt(visitedDate));
        const newStory = new Story({
            visitedDate: parsedVisitedDate, title, story, imageURL, visitedLocation, userId
        })
        await newStory.save();
        res.status(201).json({ success: true, message: " New story created " })
    } catch (error) {
        console.log("error occure in the addstory")
    }
}

export const getAllStory = async (req, res) => {
    try {
        const userId = req.userId;

        const allstory = (await Story.find({ userId })).sort({ isFavourite: -1 })
        res.status(200).json({ stories: allstory })
    } catch (error) {
        console.log("Error Occure in the get all story controller ")
    }
}

export const imageUpload = async (req, res) => {
    try {
        // checking for file is uploaded or not 
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //  upload to cloudinary
        const stream = cloudinary.uploader.upload_stream(
            { folder: "myapp" }, // 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                return res.status(200).json({
                    message: "Uploaded successfully",
                    ImageURL: result.secure_url,
                });
            }
        );

        //  send buffer to cloudinary
        stream.end(req.file.buffer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const editStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, story, visitedDate, imageURL, visitedLocation } = req.body;

        const userId = req.userId;

        // verify required field 
        if (!title || !story || !visitedDate || !imageURL || !visitedLocation) {
            return res.status(400).json({ success: false, message: "All Fields are required  " })
        }

        // convert visited date 
        const parsedVisitedDate = new Date(parseInt(visitedDate));

        const travelStory = await Story.findOne({ _id: id, userId: userId });

        travelStory.title = title
        travelStory.story = stroy
        travelStory.visitedLocation = visitedLocation
        travelStory.imageURL = imageURL;
        travelStory.visitedDate = parsedVisitedDate;

        await travelStory.save()
        res.status(200).json({ success: true, story: travelStory, message: "story updated Successfully !" })
    } catch (error) {
        console.log("Error occure in the edit story controller ")
    }
}

export const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const travelStory = await Story.findOne({ _id: id, userId: userId })

        if (!travelStory) {
            return res.status(404).json({ success: false, message: "TravelStory not found" })
        }
        const url = travelStory.imageURL;


        const parts = url.split("/");
        const fileName = parts[parts.length - 1]; // image_name.jpg
        const publicId = fileName.split(".")[0]; // image_name

        await cloudinary.uploader.destroy(publicId);

        await Story.deleteOne({ _id: id, userId: userId });

        return res.status(200).json({ success: true, message: "stroy deleted" })
    } catch (error) {
        console.log("Error occure in the dleted story controller ")
    }
}

export const isFavouriteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { isFavourite } = req.body;
        const userId = req.userId;

        const travelStory = await Story.findOne({ _id: id, userId: userId })
        if (!travelStory) {
            return res.status(404).json({ success: false, message: "TravelStory not found" })
        }

        travelStory.isFavourite = isFavourite;
        return res.status(200).json({ success: false, message: "TravelStory Updated" })


    } catch (error) {

    }
}

export const searchStory = async (req, res) => {
    try {
        const { query } = req.query;
        const userId = req.userId;

        if (!query) {
            return res.status(404).json("Query is Required");
        }

        const searchResults = Story.find({ userId: userId, $or: [{ title: { $regex: query, $options: "i" } }, { story: { $regex: query, $options: "i" } }, { visitedLocation: { $regex: query, $options: "i" } }] }).sort({ isFavourite: -1 })
        res.status(200).json({ success: true, stories: searchResults })

    } catch (error) {
        console.log("Error in the searchStory controller");
    }
}

export const filterTravelStory = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.userId;

        const start = new Date(parsInt(startDate))
        const end = new Date(parsInt(endDate))

        const filteredStories = await Story({ userId: userId, visitedDate: { $gte: start, $lte: end } }).sort({isFavourite:-1})

        res.status(200).json({success:true , stories : filteredStories})
    } catch (error) {
        console.log("Error in the filet story conterolle")
    }
}
