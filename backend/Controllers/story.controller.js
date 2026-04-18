import Story from "../Models/story.model.js";
import cloudinary from "../Lib/cloudinary.js";
import { raw } from "express";
export const addStory = async (req, res) => {
    try {
        const { title, story, visitedDate, imageURL, visitedLocation } = req.body;
        const userId = req.userId;

        // verify required field 
        if (!title || !story || !visitedDate, !imageURL || !visitedLocation) {
            return res.status(400).json({ success: false, message: "Please fill in all the required fields. " })
        }


        // convert visited date 
        const parsedVisitedDate = new Date(parseInt(visitedDate));
        const newStory = new Story({
            visitedDate: parsedVisitedDate, title, story, imageURL, visitedLocation, userId
        })
        await newStory.save();
        res.status(201).json({ success: true, message: "Story saved successfully. ", story: newStory })
    } catch (err) {
        console.error("Error in addStory:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const getAllStory = async (req, res) => {
    try {
        const userId = req.userId;

        // const allstory = (await Story.find({ userId })).sort({ isFavourite: -1 })
        const allstory = await Story.find({ userId }).sort({ isFavourite: -1 });
        res.status(200).json({ stories: allstory })
    } catch (err) {
        console.error("Error in getAll Story:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const imageUpload = async (req, res) => {
    try {
        // checking for file is uploaded or not 
        if (!req.file) {
            return res.status(400).json({ message: "No file selected. Please choose a file." });
        }

        //  upload to cloudinary
        const stream = cloudinary.uploader.upload_stream(
            { folder: "myapp" }, // 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                return res.status(200).json({
                    message: "File uploaded successfully.",
                    imageURL: result.secure_url,
                });
            }
        );

        //  send buffer to cloudinary
        stream.end(req.file.buffer);

    } catch (err) {
        console.error("Error in imageUpload:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const deleteImage = async (req, res) => {
    try {
        const { imageURL } = req.body;

        if (!imageURL) {
            return res.status(400).json({
                message: "Image URL is required"
            });
        }

        //  extract public_id from URL
        const parts = imageURL.split("/");
        const fileName = parts.pop(); // eab2wg2trwo0mxdchbte.jpg
        const folderName = parts.pop(); // myapp

        const public_id = `${folderName}/${fileName.split(".")[0]}`;

        //  delete from cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

        return res.status(200).json({
            message: "Image deleted successfully",
            result
        });

    } catch (err) {
        console.error("Error in deleteImage:", err);

        res.status(500).json({
            message: "Something went wrong while deleting image"
        });
    }
};

export const editStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, story, visitedDate, imageURL, visitedLocation } = req.body;

        const userId = req.userId;

        // verify required field 
        if (!title || !story || !visitedDate || !imageURL || !visitedLocation) {
            return res.status(400).json({ success: false, message: "Please fill in all the required fields." })
        }

        // convert visited date 
        const parsedVisitedDate = new Date(parseInt(visitedDate));

        const travelStory = await Story.findOne({ _id: id, userId: userId });

        travelStory.title = title
        travelStory.story = story
        travelStory.visitedLocation = visitedLocation
        travelStory.imageURL = imageURL;
        travelStory.visitedDate = parsedVisitedDate;

        await travelStory.save()
        res.status(200).json({ success: true, story: travelStory, message: "story updated Successfully." })
    } catch (err) {
        console.error("Error in editStory:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
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

        return res.status(200).json({ success: true, message: "Story deleted Successfully" })
    } catch (err) {
        console.error("Error in deleteStory:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
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
        await travelStory.save(); // ✅ ye missing tha
        res
            .status(200)
            .json({ story: travelStory, message: "Updated successfully!" })

    } catch (err) {
        console.error("Error in isfavourite:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const searchStory = async (req, res) => {
    try {
        const { query } = req.query;
        const userId = req.userId;

        if (!query) {
            return res.status(404).json("Query is Required");
        }

        const searchResults = await Story.find({ userId: userId, $or: [{ title: { $regex: query, $options: "i" } }, { story: { $regex: query, $options: "i" } }, { visitedLocation: { $regex: query, $options: "i" } }] }).sort({ isFavourite: -1 })
        res.status(200).json({ success: true, stories: searchResults })

    } catch (err) {
        console.error("Error in searchHistory:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}

export const filterTravelStory = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.userId;

         // Check if dates are provided
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "startDate and endDate are required"
            });
        }

        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

        const filteredStories = await Story.find({ userId: userId, visitedDate: { $gte: start, $lte: end } }).sort({ isFavourite: -1 })

        res.status(200).json({ success: true, stories: filteredStories })
    } catch (err) {
        console.error("Error in filterStory:", err); // for debugging

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}
